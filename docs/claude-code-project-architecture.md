# PROJECT ARCHITECTURE: TechnoFluency

## 1. CONTEXT & PROBLEM

Muitos estudantes e profissionais de tecnologia no Brasil tem alguma base de ingles, mas travam quando precisam usar o idioma em contexto tecnico e profissional.

Eles tem dificuldade para entender documentacoes, mensagens tecnicas, tickets e erros; falta vocabulario especifico por area como HTML, mobile, backend, APIs, QA e cloud; e sentem inseguranca para conversar com leads, times internacionais, recrutadores ou clientes.

Cursos tradicionais de ingles costumam ser genericos demais e nao treinam situacoes reais do dia a dia de tecnologia, como explicar um bug, pedir ajuda, dar status em uma daily, escrever um ticket ou defender uma solucao tecnica.

## 2. PROPOSED SOLUTION

O TechnoFluency sera uma plataforma gamificada de ingles tecnico para tecnologia, semelhante em progressao e leveza a apps como Duolingo, mas focada em situacoes reais da rotina de devs e profissionais de TI.

O app comeca por fases bem basicas, explicando conceitos como bug, API, HTML, deploy, commit e ticket, e evolui para vocabulario por setores, frases do dia a dia e simulacoes profissionais.

O objetivo e ajudar o usuario a aprender o ingles que profissionais de tecnologia realmente usam no trabalho, melhorando sua confianca para conversar com leads, explicar problemas, reportar progresso, pedir ajuda e se comunicar com mais dominio.

## 3. FUNCTIONAL REQUIREMENTS

- Login e Autenticacao
- Dashboards
- Multi usuario
- Parte premium (paga)
- Notificacoes
- Chat / Mensagens
- Integracoes (API)
- Busca e Filtros
- Onboarding do Usuario

Funcionalidades essenciais do MVP:

- Onboarding com objetivo, area de tecnologia e nivel de ingles.
- Jornada gamificada em fases curtas, comecando por Fundamentos Tech.
- Licoes basicas: o que e um bug, API, HTML, CSS, frontend, backend, server, database, deploy, commit, ticket e pull request.
- Vocabulario por setores: HTML, CSS, JavaScript, Frontend, Backend, Mobile, APIs, Databases, Git/GitHub, QA/Bugs, Cloud, DevOps, Cybersecurity, Agile/Scrum e Support/Infrastructure.
- Exercicios rapidos: escolher traducao, completar frase, montar frase, relacionar termo e definicao, corrigir mensagem e escolher a melhor resposta para um lead.
- Modulo de Comunicacao com Lead: explicar progresso, dizer que esta bloqueado, pedir ajuda, reportar riscos, defender solucao, explicar atraso e responder feedback tecnico.
- Simulacoes profissionais: daily update, bug report, mensagem para lead, code review, support ticket e pergunta de entrevista tecnica.
- Progresso com XP, streak, niveis por habilidade e badges profissionais.
- Feedback textual simples para melhorar clareza, tom profissional e confianca.

## 4. USER PERSONAS

Estudante de TI - Esta comecando na area e precisa aprender conceitos tecnicos basicos junto com vocabulario em ingles. Quer entender termos como bug, API, HTML, deploy e database.

Desenvolvedor junior - Ja trabalha ou busca a primeira vaga, mas tem dificuldade para explicar tarefas, bugs e progresso em ingles. Precisa melhorar comunicacao com lead e time.

Desenvolvedor pleno buscando vaga internacional - Tem boa base tecnica, mas quer se comunicar melhor em entrevistas, reunioes e ambientes internacionais. Precisa explicar decisoes, trade-offs e solucoes com confianca.

Profissional de suporte, infra, cloud ou QA - Usa ingles para tickets, incidentes, logs, ferramentas e documentacao. Precisa escrever updates claros e reportar problemas com precisao.

Lead ou empresa no futuro B2B - Pode usar a plataforma para desenvolver comunicacao tecnica em ingles no time.

## 5. TECHNICAL STACK

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Supabase
- Vercel
- Claude Code
- Node.js
- PostgreSQL
- TypeScript

Sugestao inicial:

- Next.js com React e TypeScript para a aplicacao web.
- Tailwind CSS e shadcn/ui para uma interface moderna, limpa e consistente.
- Supabase com PostgreSQL para autenticacao, banco de dados, progresso do usuario e conteudo das licoes.
- Vercel para deploy.
- Stripe para planos pagos em etapa futura.
- Claude Code para apoiar desenvolvimento, geracao de conteudo inicial e iteracao do produto.

Para mobile, avaliar posteriormente React Native ou uma versao PWA primeiro, dependendo do escopo do MVP.

## 6. DESIGN LANGUAGE

Referencias de design e experiencia:

Duolingo - Inspiracao para progressao gamificada, licoes curtas, streak e sensacao de avanco diario, mas com tom menos infantil e mais profissional.

Linear - Referencia visual para uma interface moderna, tecnica, limpa e focada em produtividade.

Codecademy - Inspiracao para aprendizado aplicado e estruturado por topicos tecnicos.

Grammarly - Referencia para feedback de escrita, clareza e tom profissional.

Direcao visual do TechnoFluency: moderno, tecnico, acessivel e voltado para carreira. Usar azul escuro #0a0426 como cor principal, laranja #ed4d02 como destaque, branco/off-white e cinzas neutros para interface. O visual deve transmitir tecnologia, evolucao, clareza e confianca profissional, evitando aparencia escolar tradicional.

## 7. PROCESS

- Break app build into logical milestones (steps)
- Each milestone should be a deliverable increment
- Prioritize core functionality first, then iterate
- Test each milestone before moving to the next

---

> Generated by NoCodeStartup Framework - optimized for Claude Code

