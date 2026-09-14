"use client";

import Link from "next/link";
import { Card } from "@/components/ui";
import { useProgress } from "@/lib/progress-context";
import { SIMULATIONS } from "@/content/simulations";

export default function Simulacoes() {
  const { state } = useProgress();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-ink-950">Simulacoes profissionais</h1>
        <p className="mt-1 text-sm text-ink-300">
          Cenarios reais de trabalho. Escolha a resposta mais clara e profissional.
        </p>
      </div>

      <div className="space-y-3">
        {SIMULATIONS.map((sim) => {
          const done = state.completedSimulations.includes(sim.slug);
          return (
            <Link key={sim.slug} href={`/simulacao/${sim.slug}`}>
              <Card className="flex items-start gap-4 transition-colors hover:border-flame-300">
                <span className="text-3xl">{sim.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-ink-950">{sim.title}</h2>
                    {done && <span className="text-xs font-bold text-grass-500">✓ feito</span>}
                  </div>
                  <p className="mt-1 text-sm text-ink-300">{sim.scenario}</p>
                </div>
                <span className="text-ink-200">→</span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
