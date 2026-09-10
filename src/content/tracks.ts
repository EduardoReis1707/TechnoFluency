import type { Track } from "@/lib/types";

/**
 * MVP learning content. Six tracks:
 *  - fundamentos-tech      (Fundamentos Tech)
 *  - html                  (Vocabulario por setor)
 *  - apis                  (Vocabulario por setor)
 *  - qa-bugs               (Vocabulario por setor)
 *  - git-github            (Vocabulario por setor)
 *  - comunicacao-com-lead  (Comunicacao com lideranca tecnica)
 */

export const TRACKS: Track[] = [
  {
    slug: "fundamentos-tech",
    title: "Fundamentos Tech",
    tagline: "Os conceitos base em ingles: bug, API, deploy, commit e mais.",
    icon: "🧱",
    kind: "fundamentos",
    lessons: [
      {
        id: "what-is-a-bug",
        title: "What is a bug?",
        subtitle: "Falar sobre erros no sistema",
        skill: "vocabulary",
        xp: 20,
        concept: {
          term: "bug",
          explain:
            "Um bug e um erro ou comportamento inesperado no software. Quando algo nao funciona como deveria, dizemos que ha um bug.",
          techExample: "The login button throws an error — looks like a bug in the auth flow.",
          proExample: "I found a bug in checkout. I'll open a ticket and start investigating.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a traducao",
            prompt: "Como voce diz \"Encontrei um bug no checkout\" em ingles?",
            options: [
              "I found a bug in the checkout.",
              "I have a bug on the checkout.",
              "I finding a bug in checkout.",
              "I found a bug of checkout.",
            ],
            answer: 0,
            explain: "\"found\" (passado de find) + \"a bug in the <area>\".",
          },
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "The app crashes on submit. It is definitely a ___.",
            options: ["feature", "bug", "deploy", "commit"],
            answer: 1,
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: relatar que voce vai investigar o bug.",
            tokens: ["I", "will", "investigate", "the", "bug", "now"],
            answer: ["I", "will", "investigate", "the", "bug", "now"],
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine cada termo com o significado.",
            pairs: [
              { left: "bug", right: "erro no software" },
              { left: "crash", right: "o programa para de funcionar" },
              { left: "fix", right: "correcao de um problema" },
            ],
          },
        ],
        challenge: "Escreva em 1 frase: avise seu time que o botao de login esta com bug.",
      },
      {
        id: "what-is-an-api",
        title: "What is an API?",
        subtitle: "Como sistemas conversam entre si",
        skill: "vocabulary",
        xp: 20,
        concept: {
          term: "API",
          explain:
            "API (Application Programming Interface) e a forma como dois sistemas trocam dados. O frontend faz uma request e a API devolve uma response.",
          techExample: "The frontend calls the /users API and renders the response.",
          proExample: "The API is returning a 500 error. I'm checking the server logs.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a traducao",
            prompt: "\"A API esta retornando um erro.\"",
            options: [
              "The API is returning an error.",
              "The API is return an error.",
              "The API returns a error now.",
              "The API has return an error.",
            ],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "The client sends a ___ and the API sends back a response.",
            options: ["request", "commit", "branch", "ticket"],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os termos de API.",
            pairs: [
              { left: "request", right: "pedido enviado ao servidor" },
              { left: "response", right: "resposta que o servidor devolve" },
              { left: "endpoint", right: "URL especifica da API" },
              { left: "payload", right: "dados enviados no corpo da request" },
            ],
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: dizer que o endpoint esta lento.",
            tokens: ["the", "users", "endpoint", "is", "very", "slow"],
            answer: ["the", "users", "endpoint", "is", "very", "slow"],
          },
        ],
        challenge: "Explique em 1 frase o que a API /orders faz.",
      },
      {
        id: "html-and-css",
        title: "HTML & CSS",
        subtitle: "Estrutura e estilo da pagina",
        skill: "vocabulary",
        xp: 20,
        concept: {
          term: "markup & styles",
          explain:
            "HTML e a estrutura (markup) do conteudo. CSS define o estilo: cores, espacamento e layout.",
          techExample: "The heading is an <h1> in HTML, styled with CSS in styles.css.",
          proExample: "The layout breaks on mobile — I'll fix the CSS for small screens.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a melhor opcao",
            prompt: "HTML defines the page ___; CSS defines the page ___.",
            options: [
              "structure / style",
              "style / structure",
              "server / client",
              "bug / fix",
            ],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "The button color is wrong. I'll update the ___.",
            options: ["CSS", "database", "API", "commit"],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os termos de front.",
            pairs: [
              { left: "tag", right: "elemento HTML como <p> ou <div>" },
              { left: "class", right: "nome usado para aplicar estilo" },
              { left: "responsive", right: "adapta a diferentes telas" },
            ],
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: dizer que o layout quebra no mobile.",
            tokens: ["the", "layout", "breaks", "on", "mobile"],
            answer: ["the", "layout", "breaks", "on", "mobile"],
          },
        ],
        challenge: "Escreva 1 frase pedindo revisao do seu CSS da tela de login.",
      },
      {
        id: "frontend-and-backend",
        title: "Frontend & Backend",
        subtitle: "Os dois lados da aplicacao",
        skill: "reading",
        xp: 20,
        concept: {
          term: "frontend / backend",
          explain:
            "Frontend e o que o usuario ve e usa no navegador. Backend roda no servidor: regras de negocio, banco de dados e APIs.",
          techExample: "The frontend shows the form; the backend validates and saves the data.",
          proExample: "This is a backend issue — the frontend is sending the right data.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Leia e responda",
            prompt:
              "\"The button works, the request is correct, but the data is never saved.\" Where is the problem most likely?",
            options: ["Backend", "Frontend", "CSS", "The user"],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "I work mostly on the ___: React screens and components.",
            options: ["frontend", "backend", "server", "database"],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine cada parte.",
            pairs: [
              { left: "frontend", right: "interface no navegador" },
              { left: "backend", right: "logica no servidor" },
              { left: "full-stack", right: "trabalha nos dois lados" },
            ],
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: dizer que e um problema de backend.",
            tokens: ["this", "looks", "like", "a", "backend", "issue"],
            answer: ["this", "looks", "like", "a", "backend", "issue"],
          },
        ],
        challenge: "Diga em 1 frase em qual lado (front ou back) esta o bug do checkout e por que.",
      },
      {
        id: "server-and-database",
        title: "Server & Database",
        subtitle: "Onde os dados vivem",
        skill: "vocabulary",
        xp: 20,
        concept: {
          term: "server / database",
          explain:
            "O server e a maquina que roda a aplicacao e responde requests. O database (banco de dados) guarda os dados de forma organizada.",
          techExample: "The server queries the database and returns the user list.",
          proExample: "I'm blocked because I need access to the staging database.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a traducao",
            prompt: "\"Estou bloqueado porque preciso de acesso ao banco de dados.\"",
            options: [
              "I'm blocked because I need access to the database.",
              "I'm block because I need access on the database.",
              "I am blocked because I need access of database.",
              "I'm blocked because I need the access database.",
            ],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "The ___ is down, so no requests are being answered.",
            options: ["server", "commit", "branch", "ticket"],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os termos.",
            pairs: [
              { left: "query", right: "consulta feita ao banco" },
              { left: "table", right: "estrutura que guarda registros" },
              { left: "downtime", right: "periodo em que o sistema fica fora" },
            ],
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: avisar que o servidor esta fora do ar.",
            tokens: ["the", "server", "is", "down", "right", "now"],
            answer: ["the", "server", "is", "down", "right", "now"],
          },
        ],
        challenge: "Escreva 1 frase pedindo acesso ao banco de dados de staging.",
      },
      {
        id: "deploy-commit-ticket-pr",
        title: "Deploy, Commit, Ticket & PR",
        subtitle: "O fluxo de entrega do codigo",
        skill: "vocabulary",
        xp: 25,
        concept: {
          term: "deploy / commit / PR",
          explain:
            "Voce faz commit das mudancas, abre um pull request (PR) para revisao e, depois do merge, faz o deploy para producao. Um ticket descreve a tarefa ou o problema.",
          techExample: "I pushed a fix, opened a PR, and after review we'll deploy.",
          proExample: "The fix is merged. I'll deploy to production after the daily.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a traducao",
            prompt: "\"Voce pode revisar meu pull request?\"",
            options: [
              "Can you review my pull request?",
              "Can you review my pull request now please yes?",
              "Do you can review my pull request?",
              "Can you reviewing my pull request?",
            ],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "The change is approved and merged. Next step: ___ to production.",
            options: ["deploy", "commit", "branch", "revert"],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine o fluxo de entrega.",
            pairs: [
              { left: "commit", right: "salvar um conjunto de mudancas" },
              { left: "pull request", right: "pedido de revisao antes do merge" },
              { left: "deploy", right: "publicar a aplicacao em um ambiente" },
              { left: "ticket", right: "registro de uma tarefa ou problema" },
            ],
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: dizer que voce enviou uma correcao.",
            tokens: ["I", "pushed", "a", "fix", "for", "the", "bug"],
            answer: ["I", "pushed", "a", "fix", "for", "the", "bug"],
          },
        ],
        challenge: "Escreva 1 mensagem curta pedindo review do seu PR e explicando o que ele faz.",
      },
    ],
  },

  {
    slug: "html",
    title: "HTML",
    tagline: "Vocabulario essencial de marcacao e semantica.",
    icon: "🏷️",
    kind: "setor",
    lessons: [
      {
        id: "html-elements",
        title: "Elements & Attributes",
        skill: "vocabulary",
        xp: 15,
        concept: {
          term: "element / attribute",
          explain:
            "Um element e uma tag com conteudo, como <a>Docs</a>. Attributes configuram a tag, como href em <a href=\"...\">.",
          techExample: "Add an alt attribute to every <img> for accessibility.",
          proExample: "The link is missing an href attribute — that's why it does nothing.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "Every <img> should have an ___ attribute for screen readers.",
            options: ["alt", "src-only", "color", "size"],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os termos de HTML.",
            pairs: [
              { left: "tag", right: "marca de abertura ou fechamento" },
              { left: "attribute", right: "par nome=valor dentro da tag" },
              { left: "nesting", right: "elementos dentro de outros elementos" },
            ],
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: pedir para adicionar um atributo alt.",
            tokens: ["please", "add", "an", "alt", "attribute", "here"],
            answer: ["please", "add", "an", "alt", "attribute", "here"],
          },
        ],
        challenge: "Descreva em 1 frase o que o atributo href faz.",
      },
      {
        id: "html-semantics",
        title: "Semantic HTML",
        skill: "reading",
        xp: 15,
        concept: {
          term: "semantic tags",
          explain:
            "Tags semanticas descrevem o papel do conteudo: <header>, <nav>, <main>, <footer>. Ajudam SEO e acessibilidade.",
          techExample: "Wrap the page content in <main> and the menu in <nav>.",
          proExample: "Let's use semantic tags here so the page is accessible by default.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Leia e responda",
            prompt: "Which tag best wraps the primary content of a page?",
            options: ["<main>", "<div>", "<span>", "<b>"],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Escolha a melhor opcao",
            prompt: "Semantic HTML mainly improves ___.",
            options: [
              "accessibility and SEO",
              "database speed",
              "server memory",
              "commit size",
            ],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine tag e papel.",
            pairs: [
              { left: "<nav>", right: "bloco de navegacao" },
              { left: "<header>", right: "topo da pagina ou secao" },
              { left: "<footer>", right: "rodape com info secundaria" },
            ],
          },
        ],
        challenge: "Sugira em 1 frase como tornar um menu <div> mais semantico.",
      },
    ],
  },

  {
    slug: "apis",
    title: "APIs",
    tagline: "Requests, responses, status codes e autenticacao.",
    icon: "🔌",
    kind: "setor",
    lessons: [
      {
        id: "status-codes",
        title: "HTTP Status Codes",
        skill: "reading",
        xp: 15,
        concept: {
          term: "status code",
          explain:
            "O status code resume o resultado da request: 2xx sucesso, 4xx erro do cliente, 5xx erro do servidor.",
          techExample: "The endpoint returns 404 when the user id does not exist.",
          proExample: "We're seeing intermittent 500s on /checkout since the last deploy.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Leia e responda",
            prompt: "A 500 status code usually means the problem is on the ___.",
            options: ["server", "client", "CSS", "browser cache"],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine codigo e significado.",
            pairs: [
              { left: "200", right: "OK, deu certo" },
              { left: "401", right: "nao autenticado" },
              { left: "404", right: "nao encontrado" },
              { left: "500", right: "erro interno do servidor" },
            ],
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: reportar 500 intermitente apos o deploy.",
            tokens: ["we", "see", "intermittent", "500s", "after", "the", "deploy"],
            answer: ["we", "see", "intermittent", "500s", "after", "the", "deploy"],
          },
        ],
        challenge: "Escreva 1 frase reportando que /login retorna 401 para todos os usuarios.",
      },
      {
        id: "api-auth",
        title: "Auth & Tokens",
        skill: "vocabulary",
        xp: 15,
        concept: {
          term: "authentication / token",
          explain:
            "Authentication prova quem voce e. Muitas APIs usam um token (ex.: Bearer token) enviado no header Authorization.",
          techExample: "Send the token in the Authorization header on every request.",
          proExample: "The token is expiring too fast — users get logged out mid-task.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "The request fails with 401 because the ___ is missing or expired.",
            options: ["token", "commit", "branch", "endpoint name"],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Escolha a melhor opcao",
            prompt: "\"Authentication\" answers which question?",
            options: [
              "Who are you?",
              "How fast is the server?",
              "Which color is the button?",
              "How big is the payload?",
            ],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os termos.",
            pairs: [
              { left: "authentication", right: "provar identidade" },
              { left: "authorization", right: "definir o que voce pode acessar" },
              { left: "token", right: "credencial temporaria enviada no header" },
            ],
          },
        ],
        challenge: "Explique em 1 frase a diferenca entre authentication e authorization.",
      },
    ],
  },

  {
    slug: "qa-bugs",
    title: "QA & Bugs",
    tagline: "Reproduzir, priorizar e reportar problemas com clareza.",
    icon: "🐞",
    kind: "setor",
    lessons: [
      {
        id: "repro-steps",
        title: "Steps to Reproduce",
        skill: "writing",
        xp: 15,
        concept: {
          term: "steps to reproduce",
          explain:
            "Um bom bug report tem: steps to reproduce, expected result e actual result. Assim qualquer pessoa reproduz o problema.",
          techExample: "Steps: 1) open cart 2) apply coupon 3) refresh. Expected: coupon stays. Actual: coupon is removed.",
          proExample: "I added clear repro steps and a screenshot to the ticket.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a melhor opcao",
            prompt: "A strong bug report always includes expected result and ___.",
            options: ["actual result", "your salary", "the CSS file", "a commit hash only"],
            answer: 0,
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: introduzir os passos de reproducao.",
            tokens: ["here", "are", "the", "steps", "to", "reproduce"],
            answer: ["here", "are", "the", "steps", "to", "reproduce"],
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os campos de um bug report.",
            pairs: [
              { left: "expected", right: "o que deveria acontecer" },
              { left: "actual", right: "o que realmente acontece" },
              { left: "severity", right: "o quanto o problema e grave" },
            ],
          },
        ],
        challenge: "Escreva os 3 passos de reproducao de um bug no filtro de busca.",
      },
      {
        id: "severity-priority",
        title: "Severity & Priority",
        skill: "reading",
        xp: 15,
        concept: {
          term: "severity / priority",
          explain:
            "Severity mede o impacto tecnico. Priority mede a urgencia de resolver. Um bug pode ter alta severity e baixa priority, e vice-versa.",
          techExample: "Crash on payment: high severity, high priority.",
          proExample: "It's low priority for this sprint, but let's keep it on the backlog.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Leia e responda",
            prompt: "\"Typo in the footer, visible to all users.\" Most likely:",
            options: [
              "low severity, low priority",
              "high severity, high priority",
              "high severity, low priority",
              "blocker",
            ],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os termos.",
            pairs: [
              { left: "blocker", right: "impede o trabalho de continuar" },
              { left: "regression", right: "algo que funcionava e quebrou" },
              { left: "backlog", right: "lista de itens ainda nao priorizados" },
            ],
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: classificar como baixa prioridade nesta sprint.",
            tokens: ["this", "is", "low", "priority", "for", "this", "sprint"],
            answer: ["this", "is", "low", "priority", "for", "this", "sprint"],
          },
        ],
        challenge: "Justifique em 1 frase por que um crash no pagamento e high priority.",
      },
    ],
  },

  {
    slug: "git-github",
    title: "Git / GitHub",
    tagline: "Branches, commits, merge conflicts e code review.",
    icon: "🌿",
    kind: "setor",
    lessons: [
      {
        id: "branch-commit",
        title: "Branches & Commits",
        skill: "vocabulary",
        xp: 15,
        concept: {
          term: "branch / commit",
          explain:
            "Uma branch e uma linha de trabalho isolada. Um commit e um conjunto de mudancas com uma mensagem. Voce faz push da branch e abre um PR.",
          techExample: "I created a branch feature/login and pushed my first commit.",
          proExample: "I'll open a branch for this fix and share the PR before lunch.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a traducao",
            prompt: "\"Vou criar uma branch para essa correcao.\"",
            options: [
              "I'll create a branch for this fix.",
              "I'll create a branch to this fix.",
              "I create a branch for this fixing.",
              "I'll creating a branch for this fix.",
            ],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os termos de Git.",
            pairs: [
              { left: "commit", right: "mudancas salvas com mensagem" },
              { left: "push", right: "enviar commits para o remoto" },
              { left: "pull", right: "trazer mudancas do remoto" },
              { left: "merge", right: "juntar duas branches" },
            ],
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: avisar que voce vai compartilhar o PR em breve.",
            tokens: ["I", "will", "share", "the", "PR", "soon"],
            answer: ["I", "will", "share", "the", "PR", "soon"],
          },
        ],
        challenge: "Escreva 1 mensagem de commit curta e clara para \"corrige erro no login\".",
      },
      {
        id: "merge-conflicts-review",
        title: "Conflicts & Review",
        skill: "writing",
        xp: 15,
        concept: {
          term: "merge conflict / review",
          explain:
            "Um merge conflict acontece quando duas mudancas mexem na mesma linha. No code review, colegas comentam e pedem changes antes de aprovar.",
          techExample: "I resolved the merge conflict in package.json and re-ran the tests.",
          proExample: "I addressed all review comments — this is ready for another look.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Corrija a mensagem",
            prompt: "Qual versao soa mais profissional em um review?",
            options: [
              "I addressed all the comments. Ready for another review.",
              "fixed everything, just approve pls",
              "i think its ok now maybe",
              "why so many comments??",
            ],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "There's a ___ in the same file — I'll resolve it and push again.",
            options: ["merge conflict", "status code", "endpoint", "severity"],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os termos de review.",
            pairs: [
              { left: "approve", right: "aprovar o PR" },
              { left: "request changes", right: "pedir ajustes antes de aprovar" },
              { left: "nit", right: "comentario menor, opcional" },
            ],
          },
        ],
        challenge: "Escreva 1 resposta educada a um review que pediu mudancas no seu PR.",
      },
    ],
  },

  {
    slug: "comunicacao-com-lead",
    title: "Comunicacao com Lead",
    tagline: "Dar status, dizer que esta bloqueado e defender solucoes.",
    icon: "🎯",
    kind: "comunicacao",
    lessons: [
      {
        id: "status-update",
        title: "Giving a status update",
        subtitle: "Progresso claro na daily",
        skill: "speaking",
        xp: 20,
        concept: {
          term: "status update",
          explain:
            "Um bom update tem tres partes: o que voce fez, o que vai fazer, e se ha algum blocker. Curto e especifico.",
          techExample: "Done: login API. Today: connect the frontend. Blockers: none.",
          proExample: "Yesterday I finished the API. Today I'll wire the UI. No blockers.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a melhor resposta para o lead",
            prompt: "Lead: \"Where are we on the login feature?\"",
            options: [
              "API is done. Today I'm connecting the UI. Should be ready for review tomorrow.",
              "Almost there I think.",
              "It's complicated, hard to say.",
              "I didn't have time to look yet, sorry.",
            ],
            answer: 0,
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: dar um update de progresso.",
            tokens: ["today", "I", "will", "connect", "the", "frontend"],
            answer: ["today", "I", "will", "connect", "the", "frontend"],
          },
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "Yesterday I finished the API. Today I'll wire the UI. ___ blockers.",
            options: ["No", "Some", "A", "Many the"],
            answer: 0,
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine as partes de um update.",
            pairs: [
              { left: "done", right: "o que ja foi concluido" },
              { left: "next", right: "proximo passo planejado" },
              { left: "blocker", right: "algo que impede o progresso" },
            ],
          },
        ],
        challenge: "Escreva seu update de hoje em 3 linhas: Done / Today / Blockers.",
      },
      {
        id: "im-blocked",
        title: "Saying you're blocked",
        subtitle: "Pedir ajuda sem rodeios",
        skill: "speaking",
        xp: 20,
        concept: {
          term: "blocker",
          explain:
            "Dizer que esta bloqueado nao e sinal de fraqueza. Explique o que voce tentou, o que precisa e de quem.",
          techExample: "I'm blocked on deploy — I need staging access from DevOps.",
          proExample: "I tried X and Y. I'm blocked because I need access to the DB. Can you help or point me to someone?",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a melhor resposta para o lead",
            prompt: "You cannot continue without database access. What do you say?",
            options: [
              "I'm blocked: I need access to the staging DB to continue. Could you grant it or tell me who can?",
              "Nothing works.",
              "I'll just wait until someone notices.",
              "This task is impossible.",
            ],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Corrija a mensagem",
            prompt: "Qual versao pede ajuda de forma profissional?",
            options: [
              "I've tried the docs and a config change without luck. I'm blocked and would appreciate a quick pair.",
              "help me now please this is urgent!!!",
              "idk whats wrong, someone fix it",
              "why is nobody helping me",
            ],
            answer: 0,
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: explicar o motivo do bloqueio.",
            tokens: ["I'm", "blocked", "because", "I", "need", "staging", "access"],
            answer: ["I'm", "blocked", "because", "I", "need", "staging", "access"],
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine as expressoes.",
            pairs: [
              { left: "to be blocked", right: "nao poder avancar" },
              { left: "to unblock", right: "remover o impedimento" },
              { left: "to pair", right: "trabalhar junto para resolver" },
            ],
          },
        ],
        challenge: "Escreva 1 mensagem dizendo que esta bloqueado, o que tentou e o que precisa.",
      },
      {
        id: "defend-a-solution",
        title: "Defending a solution",
        subtitle: "Explicar trade-offs com confianca",
        skill: "speaking",
        xp: 25,
        concept: {
          term: "trade-off",
          explain:
            "Defender uma solucao e mostrar os trade-offs: o que ela ganha, o que custa e por que ainda e a melhor opcao agora.",
          techExample: "Option A is faster to ship; Option B scales better but takes a week more.",
          proExample: "I'd go with A now: it unblocks users this sprint, and we can migrate to B later with low risk.",
        },
        exercises: [
          {
            kind: "choose",
            label: "Escolha a melhor resposta para o lead",
            prompt: "Lead: \"Why not just do the bigger refactor now?\"",
            options: [
              "The quick fix unblocks users this week. The refactor is safer as a separate, planned change.",
              "Because I don't want to.",
              "The refactor is too hard for me.",
              "We never refactor here.",
            ],
            answer: 0,
          },
          {
            kind: "choose",
            label: "Complete a frase",
            prompt: "Option B scales better, ___ it takes a week more.",
            options: ["but", "so", "because", "unless"],
            answer: 0,
          },
          {
            kind: "order",
            label: "Monte a frase",
            prompt: "Ordene: propor a opcao A por agora.",
            tokens: ["I", "would", "go", "with", "option", "A", "for", "now"],
            answer: ["I", "would", "go", "with", "option", "A", "for", "now"],
          },
          {
            kind: "match",
            label: "Relacione termo e definicao",
            prompt: "Combine os termos.",
            pairs: [
              { left: "trade-off", right: "o que se ganha e o que se perde" },
              { left: "scope", right: "o tamanho e limite da tarefa" },
              { left: "risk", right: "chance de algo dar errado" },
            ],
          },
        ],
        challenge: "Defenda em 2 frases uma solucao simples agora vs. um refactor grande depois.",
      },
    ],
  },
];

export function getTrack(slug: string): Track | undefined {
  return TRACKS.find((t) => t.slug === slug);
}

export function getLesson(trackSlug: string, lessonId: string) {
  const track = getTrack(trackSlug);
  const lesson = track?.lessons.find((l) => l.id === lessonId);
  if (!track || !lesson) return undefined;
  const index = track.lessons.findIndex((l) => l.id === lessonId);
  const next = track.lessons[index + 1];
  return { track, lesson, index, next };
}

export function totalLessons(): number {
  return TRACKS.reduce((sum, t) => sum + t.lessons.length, 0);
}
