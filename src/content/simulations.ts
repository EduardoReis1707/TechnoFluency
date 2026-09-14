import type { Simulation } from "@/lib/types";

export const SIMULATIONS: Simulation[] = [
  {
    slug: "daily-update",
    title: "Daily update",
    icon: "☀️",
    scenario: "Sua vez de falar na daily. O time quer um update curto e claro.",
    thread: [
      { speaker: "system", text: "Standup — 9:00 AM. Scrum master: \"Let's go around. Your turn.\"" },
      { speaker: "lead", text: "\"What did you do yesterday, and what's the plan for today?\"" },
    ],
    task: "Escolha o update mais claro e profissional.",
    options: [
      "Yesterday I finished the orders API and added tests. Today I'll connect the frontend. No blockers.",
      "Um, I did some stuff on the API, still going I guess.",
      "Yesterday was rough, lots of meetings, didn't do much honestly.",
      "I'll send it on Slack later, running low on time.",
    ],
    answer: 0,
    feedback: {
      good: "Done + Today + Blockers, em uma frase cada. Especifico e curto.",
      why: "Leads precisam saber progresso, proximo passo e riscos. Evite 'some stuff' e desabafos.",
    },
    badge: "daily-ready",
  },
  {
    slug: "bug-report",
    title: "Bug report",
    icon: "🐞",
    scenario: "Voce encontrou um bug no cupom de desconto e vai abrir um ticket.",
    thread: [
      { speaker: "system", text: "New ticket — Checkout. Assignee: you." },
      { speaker: "lead", text: "\"Give me enough detail to reproduce it without pinging you.\"" },
    ],
    task: "Escolha o corpo de ticket mais util.",
    options: [
      "Steps: 1) add item 2) apply coupon SAVE10 3) refresh page. Expected: coupon stays applied. Actual: coupon is removed, total goes back to full price. Env: staging, Chrome 120.",
      "Coupon is broken, please fix asap.",
      "Something is wrong with checkout, I think it's the coupon or maybe the total.",
      "It worked yesterday, now it doesn't. No idea why.",
    ],
    answer: 0,
    feedback: {
      good: "Tem steps to reproduce, expected, actual e environment.",
      why: "Um bom bug report deixa qualquer pessoa reproduzir sem depender de voce.",
    },
    badge: "bug-reporter",
  },
  {
    slug: "message-to-lead",
    title: "Mensagem para o lead",
    icon: "💬",
    scenario: "Voce vai atrasar uma entrega por causa de uma dependencia externa.",
    thread: [
      { speaker: "system", text: "Direct message to your tech lead." },
      { speaker: "lead", text: "\"Is the payments integration still on track for Thursday?\"" },
    ],
    task: "Escolha a mensagem que comunica o atraso com responsabilidade.",
    options: [
      "Heads up: it will slip to Monday. The payment provider's sandbox has been down since yesterday and I've opened a support case. Code is ready; I just can't verify end-to-end. I'll share a demo of what works today.",
      "It's not my fault, the provider is down. Can't do anything.",
      "Maybe Thursday, maybe not, hard to say right now.",
      "Still on track!! (will explain later)",
    ],
    answer: 0,
    feedback: {
      good: "Novo prazo, causa concreta, o que ja esta pronto e um proximo passo.",
      why: "Comunicar atraso cedo, com fatos e um plano, mantem a confianca do lead.",
    },
  },
];

export function getSimulation(slug: string): Simulation | undefined {
  return SIMULATIONS.find((s) => s.slug === slug);
}
