import type { Sector } from "@/lib/types";

export const SECTORS: Sector[] = [
  {
    slug: "frontend",
    name: "Frontend",
    icon: "🖥️",
    terms: [
      { term: "render", pt: "renderizar / desenhar na tela", example: "The list renders after the data loads." },
      { term: "state", pt: "estado dos dados na UI", example: "Keep the form value in component state." },
      { term: "props", pt: "dados passados a um componente", example: "Pass the user as a prop." },
      { term: "layout shift", pt: "elementos pulando ao carregar", example: "The banner causes a layout shift." },
    ],
  },
  {
    slug: "backend",
    name: "Backend",
    icon: "⚙️",
    terms: [
      { term: "endpoint", pt: "rota da API", example: "Add a GET endpoint for orders." },
      { term: "middleware", pt: "camada entre a request e a resposta", example: "Auth is handled in middleware." },
      { term: "queue", pt: "fila de tarefas assincronas", example: "Emails go through a queue." },
      { term: "rate limit", pt: "limite de requests por tempo", example: "We hit the rate limit at peak hours." },
    ],
  },
  {
    slug: "mobile",
    name: "Mobile",
    icon: "📱",
    terms: [
      { term: "build", pt: "versao compilada do app", example: "I'll send a new build to TestFlight." },
      { term: "crash log", pt: "registro de travamento", example: "The crash log points to the map screen." },
      { term: "offline-first", pt: "funciona sem internet primeiro", example: "The notes feature is offline-first." },
      { term: "push notification", pt: "notificacao enviada ao device", example: "Push notifications are delayed on Android." },
    ],
  },
  {
    slug: "databases",
    name: "Databases",
    icon: "🗄️",
    terms: [
      { term: "migration", pt: "mudanca versionada no schema", example: "Run the migration before deploy." },
      { term: "index", pt: "estrutura que acelera buscas", example: "Add an index on the email column." },
      { term: "seed", pt: "dados iniciais de teste", example: "The seed script creates 10 demo users." },
      { term: "rollback", pt: "voltar ao estado anterior", example: "We had to rollback the migration." },
    ],
  },
  {
    slug: "cloud",
    name: "Cloud",
    icon: "☁️",
    terms: [
      { term: "environment", pt: "ambiente (dev, staging, prod)", example: "This only fails in the staging environment." },
      { term: "scaling", pt: "aumentar/diminuir recursos", example: "Auto-scaling kicked in during the spike." },
      { term: "outage", pt: "indisponibilidade do servico", example: "The provider had a short outage." },
      { term: "secret", pt: "credencial protegida", example: "Store the API key as a secret, not in code." },
    ],
  },
  {
    slug: "devops",
    name: "DevOps",
    icon: "🔧",
    terms: [
      { term: "pipeline", pt: "esteira de build e deploy", example: "The pipeline failed on the test step." },
      { term: "rollout", pt: "liberacao gradual", example: "We're doing a 10% rollout first." },
      { term: "artifact", pt: "saida gerada pelo build", example: "The build artifact is uploaded to storage." },
      { term: "healthcheck", pt: "verificacao de saude do servico", example: "The healthcheck endpoint returns 200." },
    ],
  },
  {
    slug: "agile",
    name: "Agile / Scrum",
    icon: "🌀",
    terms: [
      { term: "sprint", pt: "ciclo curto de trabalho", example: "This won't fit in the current sprint." },
      { term: "standup", pt: "reuniao diaria rapida", example: "I'll raise it at standup." },
      { term: "grooming", pt: "refinar o backlog", example: "Let's size this during grooming." },
      { term: "retro", pt: "retrospectiva do time", example: "Good point for the retro." },
    ],
  },
  {
    slug: "security",
    name: "Cybersecurity",
    icon: "🛡️",
    terms: [
      { term: "vulnerability", pt: "falha exploravel", example: "The scan found a medium vulnerability." },
      { term: "patch", pt: "correcao de seguranca", example: "Apply the patch this week." },
      { term: "least privilege", pt: "acesso minimo necessario", example: "Follow least privilege for service accounts." },
      { term: "audit log", pt: "registro de acoes sensiveis", example: "Check the audit log for that change." },
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}
