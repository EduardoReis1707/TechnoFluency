import type { OnboardingProfile } from "@/lib/types";
import { TRACKS } from "@/content/tracks";

export const GOALS = [
  { id: "work-abroad", label: "Trabalhar para fora" },
  { id: "current-job", label: "Melhorar no emprego atual" },
  { id: "interviews", label: "Preparar entrevistas" },
  { id: "docs", label: "Ler documentacao melhor" },
  { id: "lead-team", label: "Conversar melhor com lead/time" },
];

export const AREAS = [
  { id: "student", label: "Estudante" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Fullstack" },
  { id: "mobile", label: "Mobile" },
  { id: "devops", label: "DevOps/Cloud" },
  { id: "data", label: "Dados" },
  { id: "qa", label: "QA" },
  { id: "support", label: "Suporte/Infra" },
  { id: "security", label: "Seguranca" },
];

export const LEVELS = [
  { id: "beginner", label: "Comecando do basico" },
  { id: "some-words", label: "Entendo algumas palavras tecnicas" },
  { id: "reads-docs", label: "Leio documentacao, mas travo para falar" },
  { id: "converses", label: "Converso, mas quero mais fluencia tecnica" },
];

/** Returns an ordered list of track slugs recommended for this profile. */
export function recommendTracks(profile: OnboardingProfile): string[] {
  const order: string[] = [];
  const push = (slug: string) => {
    if (!order.includes(slug)) order.push(slug);
  };

  if (profile.level === "beginner" || profile.level === "some-words") {
    push("fundamentos-tech");
  }

  switch (profile.goal) {
    case "lead-team":
      push("comunicacao-com-lead");
      break;
    case "interviews":
      push("comunicacao-com-lead");
      push("apis");
      break;
    case "docs":
      push("apis");
      break;
    default:
      break;
  }

  switch (profile.area) {
    case "frontend":
    case "fullstack":
      push("html");
      break;
    case "backend":
    case "data":
      push("apis");
      break;
    case "qa":
      push("qa-bugs");
      break;
    case "devops":
    case "support":
    case "security":
      push("git-github");
      break;
    default:
      break;
  }

  // Always make sure every track appears so the UI can show the full list.
  push("fundamentos-tech");
  push("comunicacao-com-lead");
  for (const t of TRACKS) push(t.slug);

  return order;
}

export function primaryRecommendation(profile: OnboardingProfile): string {
  return recommendTracks(profile)[0] ?? "fundamentos-tech";
}

export function labelFor(
  kind: "goal" | "area" | "level",
  id: string | undefined,
): string | undefined {
  if (!id) return undefined;
  const list = kind === "goal" ? GOALS : kind === "area" ? AREAS : LEVELS;
  return list.find((x) => x.id === id)?.label;
}
