"use client";

import { useMemo, useState } from "react";
import type { ChooseExercise, MatchExercise, OrderExercise } from "@/lib/types";
import { cn, shuffle } from "@/lib/utils";

/* ============ Choose ============ */

export function ChoosePane({
  exercise,
  value,
  onChange,
  checked,
}: {
  exercise: ChooseExercise;
  value: number | null;
  onChange: (v: number) => void;
  checked: boolean;
}) {
  return (
    <div className="space-y-2.5">
      {exercise.options.map((opt, i) => {
        const selected = value === i;
        const isAnswer = i === exercise.answer;
        let tone = "border-line bg-white text-ink-400 hover:border-ink-200";
        if (checked && isAnswer) tone = "border-grass-500 bg-grass-50 text-ink-950";
        else if (checked && selected && !isAnswer) tone = "border-berry-500 bg-berry-50 text-ink-950";
        else if (selected) tone = "border-flame-500 bg-flame-50 text-ink-950";
        return (
          <button
            key={i}
            disabled={checked}
            onClick={() => onChange(i)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-semibold transition-colors",
              tone,
            )}
          >
            <span
              className={cn(
                "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-bold",
                selected ? "border-current" : "border-line",
              )}
            >
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ============ Order ============ */

export function OrderPane({
  exercise,
  value,
  onChange,
  checked,
}: {
  exercise: OrderExercise;
  value: string[];
  onChange: (v: string[]) => void;
  checked: boolean;
}) {
  const bank = useMemo(() => shuffle(exercise.tokens.map((t, i) => ({ t, i }))), [exercise]);
  const usedCounts = value.reduce<Record<string, number>>((acc, t) => {
    acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  }, {});
  const bankCounts = exercise.tokens.reduce<Record<string, number>>((acc, t) => {
    acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  }, {});

  const correct = checked && value.join(" ") === exercise.answer.join(" ");

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "min-h-[3.25rem] rounded-2xl border-2 border-dashed p-2",
          checked ? (correct ? "border-grass-500 bg-grass-50" : "border-berry-500 bg-berry-50") : "border-line bg-white",
        )}
      >
        <div className="flex flex-wrap gap-2">
          {value.length === 0 && (
            <span className="px-2 py-1 text-xs text-ink-300">Toque nas palavras para montar a frase</span>
          )}
          {value.map((t, idx) => (
            <button
              key={`${t}-${idx}`}
              disabled={checked}
              onClick={() => onChange(value.filter((_, i) => i !== idx))}
              className="rounded-xl bg-ink-950 px-3 py-1.5 text-sm font-semibold text-white"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {bank.map(({ t, i }) => {
          const exhausted = (usedCounts[t] ?? 0) >= (bankCounts[t] ?? 0);
          return (
            <button
              key={`${t}-${i}`}
              disabled={checked || exhausted}
              onClick={() => onChange([...value, t])}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-sm font-semibold transition-colors",
                exhausted
                  ? "border-line bg-cloud text-ink-200"
                  : "border-line bg-white text-ink-950 hover:border-flame-300",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============ Match ============ */

export function MatchPane({
  exercise,
  value,
  onChange,
  checked,
}: {
  exercise: MatchExercise;
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
  checked: boolean;
}) {
  const rights = useMemo(() => shuffle(exercise.pairs.map((p) => p.right)), [exercise]);
  const [activeLeft, setActiveLeft] = useState<string | null>(null);

  const rightToLeft = Object.entries(value).reduce<Record<string, string>>((acc, [l, r]) => {
    acc[r] = l;
    return acc;
  }, {});

  function pickLeft(left: string) {
    if (checked) return;
    setActiveLeft((cur) => (cur === left ? null : left));
  }
  function pickRight(right: string) {
    if (checked || !activeLeft) return;
    const next = { ...value };
    // remove any previous mapping to this right or from this left
    for (const [l, r] of Object.entries(next)) {
      if (r === right || l === activeLeft) delete next[l];
    }
    next[activeLeft] = right;
    onChange(next);
    setActiveLeft(null);
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        {exercise.pairs.map((p) => {
          const paired = value[p.left];
          const ok = checked && paired === p.right;
          const bad = checked && paired && paired !== p.right;
          return (
            <button
              key={p.left}
              onClick={() => pickLeft(p.left)}
              disabled={checked}
              className={cn(
                "w-full rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                ok && "border-grass-500 bg-grass-50",
                bad && "border-berry-500 bg-berry-50",
                !checked && activeLeft === p.left && "border-flame-500 bg-flame-50",
                !checked && activeLeft !== p.left && "border-line bg-white",
                checked && !paired && "border-line bg-white",
              )}
            >
              {p.left}
              {paired && <span className="mt-0.5 block text-xs font-normal text-ink-300">→ {paired}</span>}
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        {rights.map((r) => {
          const taken = rightToLeft[r];
          return (
            <button
              key={r}
              onClick={() => pickRight(r)}
              disabled={checked || !activeLeft}
              className={cn(
                "w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-colors",
                taken ? "border-ink-200 bg-cloud text-ink-400" : "border-line bg-white text-ink-950",
                !checked && activeLeft && !taken && "hover:border-flame-300",
              )}
            >
              {r}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============ evaluation ============ */

export function isChooseCorrect(ex: ChooseExercise, v: number | null) {
  return v === ex.answer;
}
export function isOrderCorrect(ex: OrderExercise, v: string[]) {
  return v.join(" ") === ex.answer.join(" ");
}
export function isMatchCorrect(ex: MatchExercise, v: Record<string, string>) {
  return ex.pairs.every((p) => v[p.left] === p.right);
}
