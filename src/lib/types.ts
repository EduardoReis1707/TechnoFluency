// Shared domain types for TechnoFluency.

export type Skill = "reading" | "writing" | "speaking" | "vocabulary";

export type ExerciseKind = "choose" | "order" | "match";

export interface ChooseExercise {
  kind: "choose";
  /** Human label of the underlying PRD exercise type, e.g. "Escolha a traducao". */
  label: string;
  prompt: string;
  help?: string;
  options: string[];
  answer: number;
  explain?: string;
}

export interface OrderExercise {
  kind: "order";
  label: string;
  prompt: string;
  tokens: string[];
  answer: string[];
  explain?: string;
}

export interface MatchExercise {
  kind: "match";
  label: string;
  prompt: string;
  pairs: { left: string; right: string }[];
  explain?: string;
}

export type Exercise = ChooseExercise | OrderExercise | MatchExercise;

export interface Concept {
  term: string;
  explain: string;
  techExample: string;
  proExample: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  skill: Skill;
  xp: number;
  concept?: Concept;
  exercises: Exercise[];
  /** Optional closing micro challenge shown on the result screen. */
  challenge?: string;
}

export interface Track {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  /** short id used for the recommendation engine */
  kind: "fundamentos" | "setor" | "comunicacao";
  lessons: Lesson[];
}

export interface Sector {
  slug: string;
  name: string;
  icon: string;
  terms: { term: string; pt: string; example: string }[];
}

export interface Phrase {
  en: string;
  pt: string;
  context: string;
}

export interface SimulationStep {
  speaker: "system" | "lead" | "you";
  text: string;
}

export interface Simulation {
  slug: string;
  title: string;
  scenario: string;
  icon: string;
  /** conversation lead-in shown before the prompt */
  thread: SimulationStep[];
  task: string;
  /** the user picks the strongest reply */
  options: string[];
  answer: number;
  feedback: { good: string; why: string };
  badge?: string;
}

export interface OnboardingProfile {
  goal?: string;
  area?: string;
  level?: string;
}

export interface ProgressState {
  onboarded: boolean;
  profile: OnboardingProfile;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  completedLessons: string[];
  completedSimulations: string[];
  skillXp: Record<Skill, number>;
  badges: string[];
}
