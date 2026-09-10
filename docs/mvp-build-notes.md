# Notas de build do MVP

Este documento registra o que foi implementado na primeira rodada de producao e o que
fica para as proximas fases.

## Entregue

### Fluxo do usuario
- **Landing** (`/`) com proposta de valor, preview de licao e CTA que muda para
  "Continuar" quando ja existe progresso.
- **Onboarding** (`/onboarding`): wizard de 3 passos (objetivo, area, nivel de ingles)
  com barra de progresso. Ao concluir, grava o perfil e leva para a home.
- **OnboardGuard**: qualquer rota dentro de `(app)` redireciona para o onboarding se o
  usuario ainda nao respondeu (checagem no cliente, pois o estado vive no `localStorage`).

### Area logada (`src/app/(app)`)
- **Home**: saudacao personalizada por area, pills de streak / XP / nivel, "pratica do
  dia" (proxima licao nao concluida seguindo a ordem recomendada), progresso de nivel,
  progresso por habilidade (Reading/Writing/Speaking/Vocabulary), atalho "Falar com mais
  confianca com meu lead" e ultimas licoes.
- **Trilhas**: lista das 6 trilhas ordenadas pela recomendacao, com progresso e selo
  "Recomendada".
- **Trilha**: cabecalho, progresso e lista de licoes com estados concluida / atual /
  bloqueada (a licao seguinte destrava ao concluir a anterior).
- **Licao** (`LessonPlayer`): card de conceito (explicacao, exemplo tecnico, frase
  profissional) -> exercicios -> tela de resultado (XP, % de acertos, novas conquistas,
  micro desafio, navegacao para a proxima licao).
- **Vocabulario**: abas "Por setor" (8 setores, termos com traducao e exemplo) e "Frases
  do dia a dia" (4 grupos).
- **Simulacoes**: 3 cenarios (daily update, bug report, mensagem para o lead) com thread
  de contexto, escolha da melhor resposta e feedback explicando o porque.
- **Perfil**: resumo do perfil, XP / nivel / streak / licoes, barras por habilidade,
  grade de conquistas (ganhas + bloqueadas com dica) e reset de progresso com confirmacao.

### Sistema de progresso
- Store module-level em `src/lib/progress-context.tsx` usando `useSyncExternalStore`,
  persistindo em `localStorage` (`technofluency:v1`) e sincronizando entre abas pelo
  evento `storage`.
- XP total e por habilidade; refazer uma licao rende 30% do XP.
- **Streak**: +1 se a ultima atividade foi ontem, reinicia em 1 se houve um gap, estavel
  se ja praticou hoje.
- **Conquistas** derivadas do estado: First Steps, Warming Up, In the Zone, Consistent,
  Week Strong, 300 XP Club, Tech Basics, Lead Ready, Bug Reporter, Daily Ready.

### Motor de recomendacao (`src/lib/recommend.ts`)
Ordena as trilhas a partir de objetivo + area + nivel. Iniciantes comecam por Fundamentos
Tech; objetivo "conversar com lead" e "entrevistas" priorizam Comunicacao com Lead; a
area define a trilha de setor.

### Design
- Tokens da marca em `globals.css`: `ink` (#0a0426), `flame` (#ed4d02), `paper`, `cloud`,
  `grass`, `berry`. Fontes Geist Sans/Mono. Sem dark mode no MVP (visual claro on-brand).
- Componentes base em `src/components/ui.tsx` (Button, Card, ProgressBar, StatPill, Chip,
  SectionTitle, IconBubble). Navegacao responsiva: sidebar no desktop, bottom nav no mobile.

## Verificacao
- `npx tsc --noEmit` limpo.
- `npx eslint src --max-warnings 0` limpo (uma diretiva `eslint-disable` justificada no
  flag de hidratacao do store).
- `npm run build` passa; smoke test manual no navegador cobrindo onboarding -> licao
  completa (todos os tipos de exercicio) -> resultado com badge -> simulacao.

## Proximos passos sugeridos

1. **Supabase**: auth (magic link / OAuth), tabelas `profiles`, `progress`,
   `lesson_completions`, `content` (ou manter conteudo no repo). Migrar o store para
   ler/gravar no Supabase com fallback offline.
2. **Mais conteudo**: completar as trilhas de setor (hoje 2 licoes cada) e adicionar as
   trilhas que faltam do PRD (JavaScript, Mobile, Databases, Cloud, DevOps, Cybersecurity,
   Agile/Scrum, Support/Infra).
3. **Exercicios de escrita**: o "micro desafio" hoje e so um enunciado. Adicionar campo de
   texto + feedback (heuristico agora, IA depois) para daily update / bug report.
4. **Parte premium**: gating de trilhas/simulacoes avancadas, checkout com Stripe.
5. **Notificacoes** e lembrete de streak.
6. **Telas do PRD ainda nao feitas**: splash dedicada, resultado de licao como rota
   propria (hoje e um estado do player).
7. **Testes** (Vitest + Testing Library) para o motor de progresso/streak e recomendacao.
8. **generateStaticParams** nas rotas `[slug]` / `[track]/[lesson]` para prerender.
