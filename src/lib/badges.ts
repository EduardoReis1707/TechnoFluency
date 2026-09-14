export interface BadgeDef {
  id: string;
  name: string;
  hint: string;
  icon: string;
}

export const BADGES: Record<string, BadgeDef> = {
  "first-steps": { id: "first-steps", name: "First Steps", hint: "Complete sua primeira licao", icon: "🚀" },
  "warming-up": { id: "warming-up", name: "Warming Up", hint: "5 licoes concluidas", icon: "🔥" },
  "in-the-zone": { id: "in-the-zone", name: "In the Zone", hint: "12 licoes concluidas", icon: "⚡" },
  consistent: { id: "consistent", name: "Consistent", hint: "Streak de 3 dias", icon: "📅" },
  "week-strong": { id: "week-strong", name: "Week Strong", hint: "Streak de 7 dias", icon: "🏆" },
  "xp-300": { id: "xp-300", name: "300 XP Club", hint: "Alcance 300 XP", icon: "💠" },
  "tech-basics": { id: "tech-basics", name: "Tech Basics", hint: "Conclua Fundamentos Tech", icon: "🧩" },
  "lead-ready": { id: "lead-ready", name: "Lead Ready", hint: "3 licoes de Comunicacao com Lead", icon: "🎯" },
  "bug-reporter": { id: "bug-reporter", name: "Bug Reporter", hint: "Conclua a simulacao de bug report", icon: "🐞" },
  "daily-ready": { id: "daily-ready", name: "Daily Ready", hint: "Conclua a simulacao de daily update", icon: "☀️" },
};

export function badge(id: string): BadgeDef {
  return BADGES[id] ?? { id, name: id, hint: "", icon: "🎖️" };
}
