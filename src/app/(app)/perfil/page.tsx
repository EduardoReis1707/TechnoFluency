"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, ProgressBar, SectionTitle, StatPill } from "@/components/ui";
import { useProgress } from "@/lib/progress-context";
import { levelFromXp } from "@/lib/utils";
import { BADGES, badge } from "@/lib/badges";
import { labelFor } from "@/lib/recommend";
import { overallProgress } from "@/lib/progress-select";
import { totalLessons } from "@/content/tracks";
import type { Skill } from "@/lib/types";
import { cn } from "@/lib/utils";

const SKILLS: Skill[] = ["reading", "writing", "speaking", "vocabulary"];

export default function Perfil() {
  const { state, resetProgress } = useProgress();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const { level, into, span } = levelFromXp(state.xp);
  const skillMax = Math.max(1, ...Object.values(state.skillXp));

  function doReset() {
    resetProgress();
    router.push("/");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-ink-950">Perfil e progresso</h1>
        <p className="mt-1 text-sm text-ink-300">
          {labelFor("goal", state.profile.goal) ?? "Objetivo nao definido"} ·{" "}
          {labelFor("area", state.profile.area) ?? "area"} ·{" "}
          {labelFor("level", state.profile.level) ?? "nivel"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <StatPill icon="⭐" value={state.xp} label="XP" tone="ink" />
        <StatPill icon="🔥" value={state.streak} label="streak" />
        <StatPill icon="🏅" value={`Lv ${level}`} label="nivel" tone="ink" />
        <StatPill icon="✅" value={`${state.completedLessons.length}/${totalLessons()}`} label="licoes" tone="ink" />
      </div>

      <Card>
        <div className="flex items-center justify-between text-sm font-semibold text-ink-950">
          <span>Nivel {level}</span>
          <span className="text-ink-300">{into} / {span} XP</span>
        </div>
        <ProgressBar value={(into / span) * 100} className="mt-3" />
        <p className="mt-3 text-xs text-ink-300">
          Progresso geral no conteudo: {Math.round(overallProgress(state))}%
        </p>
      </Card>

      <div>
        <SectionTitle>Habilidades</SectionTitle>
        <Card className="space-y-3">
          {SKILLS.map((s) => (
            <div key={s}>
              <div className="flex items-center justify-between text-xs font-semibold text-ink-400">
                <span className="capitalize">{s}</span>
                <span>{state.skillXp[s]} XP</span>
              </div>
              <ProgressBar value={(state.skillXp[s] / skillMax) * 100} tone="grass" className="mt-1.5" />
            </div>
          ))}
        </Card>
      </div>

      <div>
        <SectionTitle>Conquistas ({state.badges.length}/{Object.keys(BADGES).length})</SectionTitle>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {Object.values(BADGES).map((b) => {
            const earned = state.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={cn(
                  "rounded-2xl border p-3 text-center",
                  earned ? "border-flame-200 bg-flame-50" : "border-line bg-white opacity-60",
                )}
              >
                <div className={cn("text-2xl", !earned && "grayscale")}>{b.icon}</div>
                <p className="mt-1 text-xs font-bold text-ink-950">{badge(b.id).name}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-ink-300">{b.hint}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <SectionTitle>Conta</SectionTitle>
        <Card>
          <p className="text-sm font-semibold text-ink-950">Reiniciar progresso</p>
          <p className="mt-1 text-xs text-ink-300">
            Apaga XP, streak, licoes concluidas e conquistas deste navegador. Nao da para desfazer.
          </p>
          {!confirming ? (
            <Button variant="secondary" className="mt-3" onClick={() => setConfirming(true)}>
              Reiniciar
            </Button>
          ) : (
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" onClick={() => setConfirming(false)}>
                Cancelar
              </Button>
              <Button className="bg-berry-500 hover:bg-berry-500/90" onClick={doReset}>
                Confirmar reset
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
