"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, ButtonLink, Card, ProgressBar } from "@/components/ui";
import { useProgress } from "@/lib/progress-context";
import { badge } from "@/lib/badges";
import type { Exercise, Lesson, Track } from "@/lib/types";
import {
  ChoosePane,
  MatchPane,
  OrderPane,
  isChooseCorrect,
  isMatchCorrect,
  isOrderCorrect,
} from "@/components/lesson/exercises";

type Phase = "concept" | "exercise" | "result";
type AnswerValue = number | null | string[] | Record<string, string>;

function initialValue(ex: Exercise): AnswerValue {
  if (ex.kind === "choose") return null;
  if (ex.kind === "order") return [];
  return {};
}

function evaluate(ex: Exercise, value: AnswerValue): boolean {
  if (ex.kind === "choose") return isChooseCorrect(ex, value as number | null);
  if (ex.kind === "order") return isOrderCorrect(ex, value as string[]);
  return isMatchCorrect(ex, value as Record<string, string>);
}

function hasAnswer(ex: Exercise, value: AnswerValue): boolean {
  if (ex.kind === "choose") return value !== null;
  if (ex.kind === "order") return (value as string[]).length === ex.tokens.length;
  return Object.keys(value as Record<string, string>).length === ex.pairs.length;
}

export function LessonPlayer({
  track,
  lesson,
  next,
}: {
  track: Track;
  lesson: Lesson;
  next?: Lesson;
}) {
  const { completeLesson } = useProgress();

  const [phase, setPhase] = useState<Phase>(lesson.concept ? "concept" : "exercise");
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState<AnswerValue>(() => initialValue(lesson.exercises[0]));
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  const ex = lesson.exercises[idx];
  const total = lesson.exercises.length;
  const isCorrect = checked && evaluate(ex, value);

  const accuracy = useMemo(
    () => (total ? correctCount / total : 1),
    [correctCount, total],
  );

  function check() {
    if (!hasAnswer(ex, value)) return;
    const ok = evaluate(ex, value);
    setChecked(true);
    if (ok) setCorrectCount((c) => c + 1);
  }

  function advance() {
    if (idx + 1 < total) {
      const nextEx = lesson.exercises[idx + 1];
      setIdx(idx + 1);
      setValue(initialValue(nextEx));
      setChecked(false);
      return;
    }
    // finished exercises -> record result
    const finalCorrect = correctCount;
    const acc = total ? finalCorrect / total : 1;
    const newly = completeLesson({
      trackSlug: track.slug,
      lessonId: lesson.id,
      xp: lesson.xp,
      skill: lesson.skill,
      accuracy: acc,
    });
    setEarnedBadges(newly);
    setPhase("result");
  }

  /* ---------- Concept ---------- */
  if (phase === "concept" && lesson.concept) {
    const c = lesson.concept;
    return (
      <div className="space-y-5">
        <PlayerHeader track={track} lesson={lesson} progress={0} />
        <Card className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-flame-600">Conceito</p>
            <h2 className="mt-1 text-xl font-black text-ink-950">{c.term}</h2>
          </div>
          <p className="text-sm leading-relaxed text-ink-500">{c.explain}</p>
          <div className="rounded-xl bg-cloud p-3">
            <p className="text-xs font-semibold text-ink-300">Exemplo tecnico</p>
            <p className="mt-1 font-mono text-sm text-ink-950">{c.techExample}</p>
          </div>
          <div className="rounded-xl border border-flame-200 bg-flame-50 p-3">
            <p className="text-xs font-semibold text-flame-700">Frase profissional</p>
            <p className="mt-1 text-sm font-medium text-ink-950">{c.proExample}</p>
          </div>
        </Card>
        <Button size="lg" className="w-full" onClick={() => setPhase("exercise")}>
          Praticar
        </Button>
      </div>
    );
  }

  /* ---------- Result ---------- */
  if (phase === "result") {
    const pct = Math.round(accuracy * 100);
    return (
      <div className="space-y-5">
        <Card className="tf-gradient-ink border-0 text-center text-white">
          <p className="text-5xl">🎉</p>
          <h2 className="mt-2 text-xl font-black">Licao concluida</h2>
          <p className="mt-1 text-sm text-white/70">{lesson.title}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-2xl font-black">+{lesson.xp}</p>
              <p className="text-xs text-white/60">XP</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-2xl font-black">{pct}%</p>
              <p className="text-xs text-white/60">acertos</p>
            </div>
          </div>
        </Card>

        {earnedBadges.length > 0 && (
          <Card>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-300">Nova conquista</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {earnedBadges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-flame-50 px-3 py-1.5 text-sm font-semibold text-flame-700"
                >
                  <span>{badge(b).icon}</span>
                  {badge(b).name}
                </span>
              ))}
            </div>
          </Card>
        )}

        {lesson.challenge && (
          <Card>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-300">Micro desafio</p>
            <p className="mt-2 text-sm text-ink-500">{lesson.challenge}</p>
            <p className="mt-2 text-xs text-ink-300">
              Escreva mentalmente ou no seu caderno. A avaliacao automatica de escrita chega numa
              versao futura.
            </p>
          </Card>
        )}

        <div className="flex flex-col gap-2">
          {next ? (
            <ButtonLink href={`/licao/${track.slug}/${next.id}`} size="lg">
              Proxima licao
            </ButtonLink>
          ) : (
            <ButtonLink href="/trilhas" size="lg">
              Ver trilhas
            </ButtonLink>
          )}
          <ButtonLink href={`/trilha/${track.slug}`} variant="ghost">
            Voltar para a trilha
          </ButtonLink>
        </div>
      </div>
    );
  }

  /* ---------- Exercise ---------- */
  return (
    <div className="flex min-h-[70vh] flex-col">
      <PlayerHeader track={track} lesson={lesson} progress={((idx) / total) * 100} />

      <div className="mt-5 flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-flame-600">{ex.label}</p>
        <h2 className="mt-1 text-lg font-bold text-ink-950">{ex.prompt}</h2>
        {"help" in ex && ex.help && <p className="mt-1 text-sm text-ink-300">{ex.help}</p>}

        <div className="mt-5">
          {ex.kind === "choose" && (
            <ChoosePane
              exercise={ex}
              value={value as number | null}
              onChange={(v) => setValue(v)}
              checked={checked}
            />
          )}
          {ex.kind === "order" && (
            <OrderPane
              exercise={ex}
              value={value as string[]}
              onChange={(v) => setValue(v)}
              checked={checked}
            />
          )}
          {ex.kind === "match" && (
            <MatchPane
              exercise={ex}
              value={value as Record<string, string>}
              onChange={(v) => setValue(v)}
              checked={checked}
            />
          )}
        </div>
      </div>

      <div
        className={cnFooter(checked, isCorrect)}
      >
        {checked && (
          <p className={`mb-2 text-sm font-bold ${isCorrect ? "text-grass-500" : "text-berry-500"}`}>
            {isCorrect ? "Certo! ✓" : "Quase — revise a resposta destacada."}
          </p>
        )}
        {checked && ex.explain && (
          <p className="mb-3 text-sm text-ink-500">{ex.explain}</p>
        )}
        {!checked ? (
          <Button
            size="lg"
            className="w-full"
            disabled={!hasAnswer(ex, value)}
            onClick={check}
          >
            Verificar
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={advance}>
            {idx + 1 < total ? "Continuar" : "Finalizar"}
          </Button>
        )}
      </div>
    </div>
  );
}

function cnFooter(checked: boolean, correct: boolean) {
  const base =
    "sticky bottom-16 md:bottom-0 -mx-4 mt-6 border-t px-4 pb-4 pt-3 md:-mx-10 md:px-10";
  if (!checked) return `${base} border-line bg-paper`;
  return correct
    ? `${base} border-grass-500/40 bg-grass-50`
    : `${base} border-berry-500/40 bg-berry-50`;
}

function PlayerHeader({
  track,
  lesson,
  progress,
}: {
  track: Track;
  lesson: Lesson;
  progress: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/trilha/${track.slug}`}
        className="text-sm font-semibold text-ink-300 hover:text-ink-950"
        aria-label="Sair da licao"
      >
        ✕
      </Link>
      <ProgressBar value={progress} className="flex-1" />
      <span className="shrink-0 text-xs font-bold text-ink-300">{lesson.title}</span>
    </div>
  );
}
