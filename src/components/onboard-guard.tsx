"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/lib/progress-context";

/**
 * Client-side guard: sends first-time visitors to onboarding.
 * MVP uses localStorage, so this check must run on the client.
 */
export function OnboardGuard({ children }: { children: React.ReactNode }) {
  const { state, ready } = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (ready && !state.onboarded) {
      router.replace("/onboarding");
    }
  }, [ready, state.onboarded, router]);

  if (!ready) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-sm text-ink-300">
        Carregando seu progresso…
      </div>
    );
  }

  if (!state.onboarded) return null;

  return <>{children}</>;
}
