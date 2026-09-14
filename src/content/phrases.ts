import type { Phrase } from "@/lib/types";

export const PHRASE_GROUPS: { title: string; phrases: Phrase[] }[] = [
  {
    title: "Reportar trabalho",
    phrases: [
      { en: "I found a bug.", pt: "Encontrei um bug.", context: "Ao identificar um problema." },
      { en: "I pushed a fix.", pt: "Subi uma correcao.", context: "Depois de enviar o commit." },
      { en: "I'm working on the login screen.", pt: "Estou trabalhando na tela de login.", context: "Status atual." },
      { en: "I'll investigate the issue and update you soon.", pt: "Vou investigar e te atualizo em breve.", context: "Quando ainda nao ha diagnostico." },
    ],
  },
  {
    title: "Pedir ajuda ou contexto",
    phrases: [
      { en: "I need more details about this task.", pt: "Preciso de mais detalhes sobre esta tarefa.", context: "Quando o ticket esta vago." },
      { en: "I'm blocked because I need access to the database.", pt: "Estou bloqueado porque preciso de acesso ao banco.", context: "Ao reportar um blocker." },
      { en: "Could you clarify the expected behavior?", pt: "Voce pode esclarecer o comportamento esperado?", context: "Requisito ambiguo." },
      { en: "Can we pair on this for 15 minutes?", pt: "Podemos parear nisso por 15 minutos?", context: "Pedir ajuda pratica." },
    ],
  },
  {
    title: "Code review e PRs",
    phrases: [
      { en: "Can you review my pull request?", pt: "Voce pode revisar meu pull request?", context: "Pedir revisao." },
      { en: "I addressed all the review comments.", pt: "Resolvi todos os comentarios do review.", context: "Depois de ajustar o PR." },
      { en: "This is a small nit, feel free to ignore.", pt: "E um detalhe menor, pode ignorar.", context: "Comentando o PR de alguem." },
      { en: "Let's split this PR to make it easier to review.", pt: "Vamos dividir este PR para facilitar a revisao.", context: "PR grande demais." },
    ],
  },
  {
    title: "Reunioes e alinhamento",
    phrases: [
      { en: "I'll raise it at standup.", pt: "Vou trazer isso na daily.", context: "Adiar um ponto para a reuniao." },
      { en: "Let's take this offline.", pt: "Vamos tratar disso separadamente.", context: "Assunto longo para depois da call." },
      { en: "Just to confirm, the deadline is Friday?", pt: "So confirmando, o prazo e sexta?", context: "Validar entendimento." },
      { en: "I don't have enough context yet to estimate.", pt: "Ainda nao tenho contexto para estimar.", context: "Evitar chute em estimativa." },
    ],
  },
];

export const ALL_PHRASES: Phrase[] = PHRASE_GROUPS.flatMap((g) => g.phrases);
