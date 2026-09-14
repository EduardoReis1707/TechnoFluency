# TechnoFluency

TechnoFluency e um app gamificado para aprender **ingles tecnico** aplicado a tecnologia.
Ajuda devs, estudantes e profissionais de TI a aprender vocabulario, entender conceitos
tecnicos e se comunicar com mais confianca em situacoes reais de trabalho: bug reports,
dailies, conversas com o lead, tickets, documentacao e entrevistas.

> Do primeiro bug report a conversa com o tech lead.

## Status

MVP navegavel rodando localmente. Progresso do usuario e persistido no `localStorage`
do navegador (sem backend ainda).

- [Product Requirements Document](docs/techno-fluency-prd.md)
- [Arquitetura do projeto](docs/claude-code-project-architecture.md)
- [Notas de build do MVP](docs/mvp-build-notes.md)

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens em `src/app/globals.css`)
- Estado de progresso via store `localStorage` + `useSyncExternalStore`
- Alvo de deploy: **Vercel**. Auth + persistencia: **Supabase** (proxima fase)

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

Outros comandos:

```bash
npm run build   # build de producao
npm run lint    # eslint
npx tsc --noEmit # checagem de tipos
```

## Estrutura

```
src/
  app/
    page.tsx                 landing / splash
    onboarding/              wizard de 3 passos (objetivo, area, nivel)
    (app)/                   area logada, com nav (AppShell + OnboardGuard)
      home/                  pratica do dia, streak, XP, habilidades
      trilhas/               lista de trilhas
      trilha/[slug]/         licoes de uma trilha
      licao/[track]/[lesson] player de licao (conceito + exercicios + resultado)
      vocabulario/           termos por setor + frases do dia a dia
      simulacoes/            cenarios profissionais
      simulacao/[slug]/      player de simulacao
      perfil/                progresso, habilidades, conquistas, reset
  components/                UI, navegacao, player de licao e exercicios
  content/                   conteudo tipado (trilhas, setores, frases, simulacoes)
  lib/                       tipos, store de progresso, recomendacao, badges, utils
```

## Conteudo do MVP

6 trilhas / 17 licoes:

| Trilha | Licoes |
| --- | --- |
| Fundamentos Tech | 6 (bug, API, HTML/CSS, front/back, server/db, deploy/commit/PR) |
| HTML | 2 |
| APIs | 2 |
| QA & Bugs | 2 |
| Git / GitHub | 2 |
| Comunicacao com Lead | 3 (status update, blocked, defender solucao) |

Tipos de exercicio: escolha unica (traducao, completar, melhor resposta, corrigir mensagem),
montar frase (ordenar tokens) e relacionar termo/definicao.

3 simulacoes: daily update, bug report, mensagem para o lead.

## Proximos passos

Ver [docs/mvp-build-notes.md](docs/mvp-build-notes.md).
