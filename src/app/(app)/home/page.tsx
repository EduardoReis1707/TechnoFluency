"use client";

import Link from "next/link";
import { ButtonLink, Card, IconBubble, ProgressBar, SectionTitle, StatPill } from "@/components/ui";
import { useProgress } from "@/lib/progress-context";
import { levelFromXp } from "@/lib/utils";
import { nextLesson, recentLessons, trackProgress } from "@/lib/progress-select";
import { labelFor } from "@/lib/recommend";
import { getTrack } from "@/content/tracks";
import type { Skill } from "@/lib/types";

const SKILL_LABELS: Record<Skill, string> = {
  reading: "Reading",
  writing: "Writing",
  speaking: "Speaking",
  vocabulary: "Vocabulary",
};

export default function Home() {
  const { state } = useProgress();
  const { level, into, span } = levelFromXp(state.xp);
  const nl = nextLesson(state);
  const recent = recentLessons(state);
  const leadTrack = getTrack("comunicacao-com-lead")!;
  const leadProg = trackProgress(state, leadTrack);
  const areaLabel = labelFor("area", state.profile.area);

  const skillMax = Math.max(1, ...Object.values(state.skillXp));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-ink-950">
          Bora praticar{areaLabel ? `, ${areaLabel}` : ""} 👋
        </h1>
        <p className="mt-1 text-sm text-ink-300">
          {nl ? "Sua pratica do dia esta pronta." : "Voce concluiu todas as licoes do MVP. 🎉"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <StatPill icon="🔥" value={state.streak} label={state.streak === 1 ? "dia" : "dias"} />
        <StatPill icon="⭐" value={state.xp} label="XP" tone="ink" />
        <StatPill icon="🏅" value={`Lv ${level}`} label="nivel" tone="ink" />
      </div>

      {/* Practice of the day */}
      {nl ? (
        <Card className="tf-gradient-ink border-0 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-flame-200">Pratica do dia</p>
          <div className="mt-3 flex items-center gap-3">
            <IconBubble size="md" className="bg-white/10 text-white">
              {nl.track.icon}
            </IconBubble>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold">
                {nl.track.lessons.find((l) => l.id === nl.lessonId)?.title}
              </p>
              <p className="text-sm text-white/70">{nl.track.title}</p>
            </div>
          </div>
          <ButtonLink
            href={`/licao/${nl.track.slug}/${nl.lessonId}`}
            className="mt-5 w-full"
            size="lg"
          >
            Comecar licao
          </ButtonLink>
        </Card>
      ) : (
        <Card>
          <p className="text-sm text-ink-400">
            Novas trilhas chegam nas proximas versoes. Enquanto isso, revise uma licao ou
            treine com uma simulacao.
          </p>
          <ButtonLink href="/simulacoes" variant="secondary" className="mt-4">
            Ir para simulacoes
          </ButtonLink>
        </Card>
      )}

      {/* Level progress */}
      <div>
        <SectionTitle>Progresso de nivel</SectionTitle>
        <Card>
          <div className="flex items-center justify-between text-sm font-semibold text-ink-950">
            <span>Nivel {level}</span>
            <span className="text-ink-300">
              {into} / {span} XP
            </span>
          </div>
          <ProgressBar value={(into / span) * 100} className="mt-3" />
        </Card>
      </div>

      {/* Skills */}
      <div>
        <SectionTitle>Progresso por habilidade</SectionTitle>
        <Card className="space-y-3">
          {(Object.keys(SKILL_LABELS) as Skill[]).map((skill) => (
            <div key={skill}>
              <div className="flex items-center justify-between text-xs font-semibold text-ink-400">
                <span>{SKILL_LABELS[skill]}</span>
                <span>{state.skillXp[skill]} XP</span>
              </div>
              <ProgressBar
                value={(state.skillXp[skill] / skillMax) * 100}
                tone="grass"
                className="mt-1.5"
              />
            </div>
          ))}
        </Card>
      </div>

      {/* Lead shortcut */}
      <div>
        <SectionTitle>Atalho</SectionTitle>
        <Link href={`/trilha/${leadTrack.slug}`} className="block">
          <Card className="flex items-center gap-4 transition-colors hover:border-flame-300">
            <IconBubble>{leadTrack.icon}</IconBubble>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink-950">Falar com mais confianca com meu lead</p>
              <p className="truncate text-xs text-ink-300">{leadTrack.tagline}</p>
              <ProgressBar value={leadProg.pct} className="mt-2" />
            </div>
            <span className="text-ink-200">→</span>
          </Card>
        </Link>
      </div>

      {/* Recent */}
      {recent.length > 0 && (
        <div>
          <SectionTitle action={<Link href="/trilhas" className="text-xs font-semibold text-flame-600">Ver trilhas</Link>}>
            Ultimas licoes
          </SectionTitle>
          <div className="space-y-2">
            {recent.map(({ track, lesson }) => (
              <Link key={`${track.slug}/${lesson.id}`} href={`/licao/${track.slug}/${lesson.id}`}>
                <Card className="flex items-center gap-3 py-3">
                  <span className="text-xl">{track.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-950">{lesson.title}</p>
                    <p className="text-xs text-ink-300">{track.title}</p>
                  </div>
                  <span className="text-xs font-bold text-grass-500">✓</span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
