"use client";

import Link from "next/link";
import { Card, Chip, ProgressBar } from "@/components/ui";
import { useProgress } from "@/lib/progress-context";
import { TRACKS } from "@/content/tracks";
import { recommendTracks } from "@/lib/recommend";
import { trackProgress } from "@/lib/progress-select";

const KIND_LABEL: Record<string, string> = {
  fundamentos: "Fundamentos",
  setor: "Vocabulario por setor",
  comunicacao: "Comunicacao",
};

export default function Trilhas() {
  const { state } = useProgress();
  const recommended = recommendTracks(state.profile)[0];

  const ordered = [...TRACKS].sort((a, b) => {
    const oa = recommendTracks(state.profile).indexOf(a.slug);
    const ob = recommendTracks(state.profile).indexOf(b.slug);
    return oa - ob;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-ink-950">Trilhas</h1>
        <p className="mt-1 text-sm text-ink-300">
          Comece pelos fundamentos e avance para comunicacao profissional.
        </p>
      </div>

      <div className="space-y-3">
        {ordered.map((track) => {
          const prog = trackProgress(state, track);
          return (
            <Link key={track.slug} href={`/trilha/${track.slug}`}>
              <Card className="transition-colors hover:border-flame-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{track.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-bold text-ink-950">{track.title}</h2>
                      <Chip>{KIND_LABEL[track.kind]}</Chip>
                      {track.slug === recommended && <Chip active>Recomendada</Chip>}
                    </div>
                    <p className="mt-1 text-sm text-ink-300">{track.tagline}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <ProgressBar value={prog.pct} className="flex-1" />
                      <span className="text-xs font-bold text-ink-300">
                        {prog.done}/{prog.total}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
