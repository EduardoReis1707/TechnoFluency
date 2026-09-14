"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ButtonLink, Card, ProgressBar } from "@/components/ui";
import { useProgress } from "@/lib/progress-context";
import { getTrack } from "@/content/tracks";
import { isLessonDone, trackProgress } from "@/lib/progress-select";
import { cn } from "@/lib/utils";

export default function TrackDetail() {
  const params = useParams<{ slug: string }>();
  const track = getTrack(params.slug);
  const { state } = useProgress();

  if (!track) return notFound();

  const prog = trackProgress(state, track);
  const firstUndone = track.lessons.find((l) => !isLessonDone(state, track.slug, l.id));

  return (
    <div className="space-y-6">
      <Link href="/trilhas" className="text-sm font-semibold text-ink-300 hover:text-ink-950">
        ← Trilhas
      </Link>

      <div className="flex items-start gap-4">
        <span className="text-4xl">{track.icon}</span>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-ink-950">{track.title}</h1>
          <p className="mt-1 text-sm text-ink-300">{track.tagline}</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between text-sm font-semibold text-ink-950">
          <span>Progresso da trilha</span>
          <span className="text-ink-300">
            {prog.done}/{prog.total} licoes
          </span>
        </div>
        <ProgressBar value={prog.pct} className="mt-3" />
        {firstUndone && (
          <ButtonLink
            href={`/licao/${track.slug}/${firstUndone.id}`}
            className="mt-4 w-full"
            size="lg"
          >
            {prog.done === 0 ? "Comecar trilha" : "Continuar"}
          </ButtonLink>
        )}
      </Card>

      <ol className="space-y-2.5">
        {track.lessons.map((lesson, i) => {
          const done = isLessonDone(state, track.slug, lesson.id);
          const locked = i > 0 && !isLessonDone(state, track.slug, track.lessons[i - 1].id) && !done;
          const card = (
            <Card
              className={cn(
                "flex items-center gap-4 py-4 transition-colors",
                locked ? "opacity-55" : "hover:border-flame-300",
              )}
            >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold",
                      done
                        ? "bg-grass-500 text-white"
                        : locked
                          ? "bg-cloud text-ink-300"
                          : "bg-flame-50 text-flame-700",
                    )}
                  >
                    {done ? "✓" : locked ? "🔒" : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-ink-950">{lesson.title}</p>
                    <p className="truncate text-xs text-ink-300">
                      {lesson.subtitle ?? `${lesson.exercises.length} exercicios`} • +{lesson.xp} XP
                    </p>
                  </div>
              {!locked && <span className="text-ink-200">→</span>}
            </Card>
          );
          return (
            <li key={lesson.id}>
              {locked ? (
                card
              ) : (
                <Link href={`/licao/${track.slug}/${lesson.id}`} className="block">
                  {card}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
