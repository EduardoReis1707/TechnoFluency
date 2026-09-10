"use client";

import { ButtonLink } from "@/components/ui";
import { useProgress } from "@/lib/progress-context";
import { totalLessons } from "@/content/tracks";

const HIGHLIGHTS = [
  { icon: "🧱", title: "Fundamentos Tech", text: "bug, API, deploy, commit e PR — explicados em ingles, do zero." },
  { icon: "📚", title: "Vocabulario por setor", text: "Frontend, Backend, APIs, QA, Cloud, DevOps e mais." },
  { icon: "🎯", title: "Comunicacao com lead", text: "Dar status, dizer que esta bloqueado e defender solucoes." },
  { icon: "🎭", title: "Simulacoes reais", text: "Daily update, bug report e mensagem para o tech lead." },
];

export default function Landing() {
  const { state, ready } = useProgress();
  const started = ready && state.onboarded;

  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl tf-gradient-ink text-sm font-black text-white">
            Tf
          </span>
          <span className="text-lg font-black tracking-tight text-ink-950">TechnoFluency</span>
        </div>
        <ButtonLink href={started ? "/home" : "/onboarding"} variant="secondary" size="md">
          {started ? "Continuar" : "Entrar"}
        </ButtonLink>
      </header>

      <section className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-16">
        <div className="tf-rise">
          <p className="mb-4 inline-flex items-center rounded-full bg-flame-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-flame-700">
            Ingles tecnico para tecnologia
          </p>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-ink-950 md:text-5xl">
            Do primeiro bug report a conversa com o tech lead.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-400">
            Aprenda o ingles que devs e profissionais de TI realmente usam no
            trabalho. Licoes curtas e gamificadas, sem cara de curso escolar.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={started ? "/home" : "/onboarding"} size="lg">
              {started ? "Voltar para a trilha" : "Comecar agora"}
            </ButtonLink>
            <span className="text-sm text-ink-300">
              {totalLessons()} licoes • 6 trilhas • gratis no MVP
            </span>
          </div>
        </div>

        <div className="tf-card tf-pop p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-ink-300">
            <span className="h-2.5 w-2.5 rounded-full bg-flame-500" />
            Preview de licao
          </div>
          <p className="text-sm font-medium text-ink-300">Escolha a traducao</p>
          <p className="mt-1 text-lg font-bold text-ink-950">
            &quot;Estou bloqueado porque preciso de acesso ao banco.&quot;
          </p>
          <div className="mt-4 space-y-2">
            <div className="rounded-xl border border-grass-500 bg-grass-50 px-4 py-3 text-sm font-semibold text-ink-950">
              I&apos;m blocked because I need access to the database.
            </div>
            <div className="rounded-xl border border-line px-4 py-3 text-sm text-ink-400">
              I have a block because I need access on the database.
            </div>
            <div className="rounded-xl border border-line px-4 py-3 text-sm text-ink-400">
              I am blocked because I need access of database.
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between text-xs font-semibold text-ink-300">
            <span>+20 XP</span>
            <span>🔥 streak diario</span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="tf-card p-5">
              <div className="text-2xl">{h.icon}</div>
              <h3 className="mt-3 text-sm font-bold text-ink-950">{h.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">{h.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
