"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Button, ButtonLink, Card } from "@/components/ui";
import { useProgress } from "@/lib/progress-context";
import { badge } from "@/lib/badges";
import { getSimulation } from "@/content/simulations";
import { cn } from "@/lib/utils";

const SIM_XP = 25;

export default function SimulationPage() {
  const params = useParams<{ slug: string }>();
  const sim = getSimulation(params.slug);
  const { completeSimulation } = useProgress();

  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [earned, setEarned] = useState<string[]>([]);

  if (!sim) return notFound();

  const answer = sim.answer;
  const slug = sim.slug;
  const correct = submitted && choice === answer;

  function submit() {
    if (choice === null) return;
    setSubmitted(true);
    if (choice === answer) {
      setEarned(completeSimulation(slug, SIM_XP));
    }
  }

  return (
    <div className="space-y-5">
      <Link href="/simulacoes" className="text-sm font-semibold text-ink-300 hover:text-ink-950">
        ← Simulacoes
      </Link>

      <div className="flex items-start gap-3">
        <span className="text-3xl">{sim.icon}</span>
        <div>
          <h1 className="text-xl font-black tracking-tight text-ink-950">{sim.title}</h1>
          <p className="mt-1 text-sm text-ink-300">{sim.scenario}</p>
        </div>
      </div>

      <Card className="space-y-2 bg-cloud">
        {sim.thread.map((step, i) => (
          <p
            key={i}
            className={cn(
              "text-sm",
              step.speaker === "system" && "text-ink-300",
              step.speaker === "lead" && "font-semibold text-ink-950",
              step.speaker === "you" && "text-flame-700",
            )}
          >
            {step.speaker === "lead" && <span className="text-ink-300">Lead: </span>}
            {step.text}
          </p>
        ))}
      </Card>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-flame-600">Sua tarefa</p>
        <p className="mt-1 text-sm font-semibold text-ink-950">{sim.task}</p>
      </div>

      <div className="space-y-2.5">
        {sim.options.map((opt, i) => {
          const selected = choice === i;
          const isAnswer = i === sim.answer;
          let tone = "border-line bg-white text-ink-400 hover:border-ink-200";
          if (submitted && isAnswer) tone = "border-grass-500 bg-grass-50 text-ink-950";
          else if (submitted && selected && !isAnswer) tone = "border-berry-500 bg-berry-50 text-ink-950";
          else if (selected) tone = "border-flame-500 bg-flame-50 text-ink-950";
          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setChoice(i)}
              className={cn(
                "w-full rounded-2xl border px-4 py-3.5 text-left text-sm font-medium leading-relaxed transition-colors",
                tone,
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <Button size="lg" className="w-full" disabled={choice === null} onClick={submit}>
          Enviar resposta
        </Button>
      ) : (
        <Card className={correct ? "border-grass-500/40 bg-grass-50" : "border-berry-500/40 bg-berry-50"}>
          <p className={`text-sm font-bold ${correct ? "text-grass-500" : "text-berry-500"}`}>
            {correct ? `Boa! +${SIM_XP} XP` : "Dá pra melhorar."}
          </p>
          <p className="mt-2 text-sm text-ink-950">
            <span className="font-semibold">Por que funciona: </span>
            {sim.feedback.good}
          </p>
          <p className="mt-1 text-sm text-ink-500">{sim.feedback.why}</p>

          {earned.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {earned.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-flame-700"
                >
                  <span>{badge(b).icon}</span>
                  {badge(b).name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <ButtonLink href="/simulacoes" variant="secondary">
              Outras simulacoes
            </ButtonLink>
            <ButtonLink href="/home" variant="ghost">
              Home
            </ButtonLink>
          </div>
        </Card>
      )}
    </div>
  );
}
