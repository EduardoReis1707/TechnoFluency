"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ProgressBar } from "@/components/ui";
import { useProgress } from "@/lib/progress-context";
import { AREAS, GOALS, LEVELS, labelFor, primaryRecommendation } from "@/lib/recommend";
import { getTrack } from "@/content/tracks";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "goal" as const, title: "Qual e o seu objetivo?", options: GOALS },
  { key: "area" as const, title: "Qual e a sua area?", options: AREAS },
  { key: "level" as const, title: "Qual e o seu nivel de ingles?", options: LEVELS },
];

export default function Onboarding() {
  const router = useRouter();
  const { completeOnboarding } = useProgress();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ goal?: string; area?: string; level?: string }>({});

  const current = STEPS[step];
  const selected = answers[current.key];
  const isLast = step === STEPS.length - 1;

  function choose(id: string) {
    setAnswers((prev) => ({ ...prev, [current.key]: id }));
  }

  function next() {
    if (!selected) return;
    if (isLast) {
      completeOnboarding(answers);
      router.push("/home");
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    if (step === 0) {
      router.push("/");
      return;
    }
    setStep((s) => s - 1);
  }

  const recTrack = getTrack(primaryRecommendation(answers));

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col px-5 py-8">
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={back}
          className="text-sm font-semibold text-ink-300 hover:text-ink-950"
          aria-label="Voltar"
        >
          ← Voltar
        </button>
        <ProgressBar value={((step + 1) / STEPS.length) * 100} className="flex-1" tone="ink" />
        <span className="text-xs font-bold text-ink-300">
          {step + 1}/{STEPS.length}
        </span>
      </div>

      <h1 className="text-2xl font-black tracking-tight text-ink-950">{current.title}</h1>
      <p className="mt-1 text-sm text-ink-300">
        Isso ajusta a trilha inicial recomendada para voce.
      </p>

      <div className="mt-6 flex-1 space-y-2.5">
        {current.options.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => choose(opt.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left text-sm font-semibold transition-colors",
                active
                  ? "border-flame-500 bg-flame-50 text-ink-950"
                  : "border-line bg-white text-ink-400 hover:border-ink-200",
              )}
            >
              {opt.label}
              <span
                className={cn(
                  "grid h-5 w-5 place-items-center rounded-full border text-[11px]",
                  active ? "border-flame-500 bg-flame-500 text-white" : "border-line",
                )}
              >
                {active ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>

      {answers.goal && answers.area && recTrack && (
        <p className="mt-4 rounded-xl bg-cloud px-4 py-3 text-xs text-ink-400">
          Trilha sugerida ate aqui: <span className="font-bold text-ink-950">{recTrack.icon} {recTrack.title}</span>
        </p>
      )}

      <div className="mt-6">
        <Button size="lg" className="w-full" onClick={next} disabled={!selected}>
          {isLast ? "Comecar a aprender" : "Continuar"}
        </Button>
        {isLast && selected && (
          <p className="mt-3 text-center text-xs text-ink-300">
            Objetivo: {labelFor("goal", answers.goal)} • Area: {labelFor("area", answers.area)}
          </p>
        )}
      </div>
    </div>
  );
}
