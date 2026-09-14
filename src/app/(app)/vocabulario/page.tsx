"use client";

import { useState } from "react";
import { Card, Chip } from "@/components/ui";
import { SECTORS } from "@/content/sectors";
import { PHRASE_GROUPS } from "@/content/phrases";
import { cn } from "@/lib/utils";

type Tab = "setores" | "frases";

export default function Vocabulario() {
  const [tab, setTab] = useState<Tab>("setores");
  const [openSector, setOpenSector] = useState<string | null>(SECTORS[0]?.slug ?? null);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-ink-950">Vocabulario</h1>
        <p className="mt-1 text-sm text-ink-300">
          Termos por setor e frases prontas para o dia a dia.
        </p>
      </div>

      <div className="flex gap-2">
        {(["setores", "frases"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              tab === t ? "bg-ink-950 text-white" : "bg-white border border-line text-ink-400",
            )}
          >
            {t === "setores" ? "Por setor" : "Frases do dia a dia"}
          </button>
        ))}
      </div>

      {tab === "setores" && (
        <div className="space-y-2.5">
          {SECTORS.map((sector) => {
            const open = openSector === sector.slug;
            return (
              <Card key={sector.slug} className="p-0 overflow-hidden">
                <button
                  onClick={() => setOpenSector(open ? null : sector.slug)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left"
                >
                  <span className="text-2xl">{sector.icon}</span>
                  <span className="flex-1 text-sm font-bold text-ink-950">{sector.name}</span>
                  <Chip>{sector.terms.length} termos</Chip>
                  <span className="text-ink-200">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <div className="tf-rise space-y-3 border-t border-line px-5 py-4">
                    {sector.terms.map((t) => (
                      <div key={t.term}>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-sm font-bold text-ink-950">{t.term}</span>
                          <span className="text-xs text-ink-300">{t.pt}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-ink-400">
                          <span className="text-ink-200">e.g.</span> {t.example}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {tab === "frases" && (
        <div className="space-y-5">
          {PHRASE_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-300">
                {group.title}
              </h2>
              <div className="space-y-2">
                {group.phrases.map((p) => (
                  <Card key={p.en} className="py-3.5">
                    <p className="text-sm font-bold text-ink-950">{p.en}</p>
                    <p className="text-sm text-ink-400">{p.pt}</p>
                    <p className="mt-1 text-xs text-ink-300">{p.context}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
