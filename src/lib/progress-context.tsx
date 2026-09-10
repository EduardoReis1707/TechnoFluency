"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { OnboardingProfile, ProgressState, Skill } from "@/lib/types";
import { daysBetween, todayISO } from "@/lib/utils";

const STORAGE_KEY = "technofluency:v1";

const EMPTY: ProgressState = {
  onboarded: false,
  profile: {},
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  completedLessons: [],
  completedSimulations: [],
  skillXp: { reading: 0, writing: 0, speaking: 0, vocabulary: 0 },
  badges: [],
};

/* ------------------------------------------------------------------ *
 * External store (localStorage-backed).
 * Using useSyncExternalStore keeps hydration out of component effects
 * and gives us free cross-tab sync via the `storage` event.
 * ------------------------------------------------------------------ */

type Listener = () => void;

const SERVER_SNAPSHOT: { state: ProgressState; ready: boolean } = {
  state: EMPTY,
  ready: false,
};

let current: ProgressState = EMPTY;
let hydrated = false;
let snapshot = SERVER_SNAPSHOT;
const listeners = new Set<Listener>();

function emit() {
  snapshot = { state: current, ready: hydrated };
  for (const l of listeners) l();
}

function parse(raw: string | null): ProgressState | null {
  if (!raw) return null;
  try {
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<ProgressState>) };
  } catch {
    return null;
  }
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  if (typeof window !== "undefined") {
    current = parse(window.localStorage.getItem(STORAGE_KEY)) ?? EMPTY;
  }
  emit();
}

function commit(next: ProgressState) {
  current = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable (private mode) — keep in-memory only
    }
  }
  emit();
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  hydrate();

  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      current = parse(e.newValue) ?? EMPTY;
      emit();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  return snapshot;
}
function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

/* ------------------------------------------------------------------ *
 * Domain logic
 * ------------------------------------------------------------------ */

interface LessonResult {
  trackSlug: string;
  lessonId: string;
  xp: number;
  skill: Skill;
  accuracy: number;
}

function bumpStreak(state: ProgressState): Pick<ProgressState, "streak" | "lastActiveDate"> {
  const today = todayISO();
  if (state.lastActiveDate === today) return { streak: state.streak, lastActiveDate: today };
  if (state.lastActiveDate && daysBetween(state.lastActiveDate, today) === 1) {
    return { streak: state.streak + 1, lastActiveDate: today };
  }
  return { streak: 1, lastActiveDate: today };
}

function awardBadges(state: ProgressState): string[] {
  const earned = new Set(state.badges);
  const before = earned.size;
  const give = (b: string) => earned.add(b);

  if (state.completedLessons.length >= 1) give("first-steps");
  if (state.completedLessons.length >= 5) give("warming-up");
  if (state.completedLessons.length >= 12) give("in-the-zone");
  if (state.streak >= 3) give("consistent");
  if (state.streak >= 7) give("week-strong");
  if (state.xp >= 300) give("xp-300");

  const fundamentos = state.completedLessons.filter((id) =>
    id.startsWith("fundamentos-tech/"),
  ).length;
  if (fundamentos >= 6) give("tech-basics");

  const lead = state.completedLessons.filter((id) =>
    id.startsWith("comunicacao-com-lead/"),
  ).length;
  if (lead >= 3) give("lead-ready");

  if (state.completedSimulations.includes("bug-report")) give("bug-reporter");
  if (state.completedSimulations.includes("daily-update")) give("daily-ready");

  return earned.size === before ? state.badges : [...earned];
}

function applyLesson(state: ProgressState, result: LessonResult) {
  const key = `${result.trackSlug}/${result.lessonId}`;
  const alreadyDone = state.completedLessons.includes(key);
  const gained = alreadyDone ? Math.round(result.xp * 0.3) : result.xp;
  const next: ProgressState = {
    ...state,
    ...bumpStreak(state),
    xp: state.xp + gained,
    completedLessons: alreadyDone ? state.completedLessons : [...state.completedLessons, key],
    skillXp: {
      ...state.skillXp,
      [result.skill]: state.skillXp[result.skill] + gained,
    },
  };
  const badges = awardBadges(next);
  return { next: { ...next, badges }, newBadges: badges.filter((b) => !state.badges.includes(b)) };
}

function applySimulation(state: ProgressState, slug: string, xp: number) {
  const alreadyDone = state.completedSimulations.includes(slug);
  const gained = alreadyDone ? Math.round(xp * 0.3) : xp;
  const next: ProgressState = {
    ...state,
    ...bumpStreak(state),
    xp: state.xp + gained,
    completedSimulations: alreadyDone
      ? state.completedSimulations
      : [...state.completedSimulations, slug],
    skillXp: { ...state.skillXp, writing: state.skillXp.writing + gained },
  };
  const badges = awardBadges(next);
  return { next: { ...next, badges }, newBadges: badges.filter((b) => !state.badges.includes(b)) };
}

/* ------------------------------------------------------------------ *
 * React surface
 * ------------------------------------------------------------------ */

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  // No context needed — the store is module-level. Kept as a stable wrapper so
  // the root layout has an obvious place to opt future providers in.
  return <>{children}</>;
}

export interface ProgressApi {
  state: ProgressState;
  ready: boolean;
  completeOnboarding: (profile: OnboardingProfile) => void;
  completeLesson: (result: LessonResult) => string[];
  completeSimulation: (slug: string, xp: number) => string[];
  resetProgress: () => void;
}

export function useProgress(): ProgressApi {
  const { state, ready } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const completeOnboarding = useCallback((profile: OnboardingProfile) => {
    commit({ ...current, onboarded: true, profile });
  }, []);

  const completeLesson = useCallback((result: LessonResult) => {
    const { next, newBadges } = applyLesson(current, result);
    commit(next);
    return newBadges;
  }, []);

  const completeSimulation = useCallback((slug: string, xp: number) => {
    const { next, newBadges } = applySimulation(current, slug, xp);
    commit(next);
    return newBadges;
  }, []);

  const resetProgress = useCallback(() => commit(EMPTY), []);

  return useMemo(
    () => ({ state, ready, completeOnboarding, completeLesson, completeSimulation, resetProgress }),
    [state, ready, completeOnboarding, completeLesson, completeSimulation, resetProgress],
  );
}
