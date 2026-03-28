export type ApplicationStatus =
  | "Enviada"
  | "Em Analise"
  | "Entrevista"
  | "Oferta"
  | "Rejeitada";

export type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedAt: string;
  description: string;
  location: string;
};

export const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: "1",
    company: "Tech Corp",
    role: "Engenheiro de Software Senior",
    status: "Entrevista",
    appliedAt: "2026-03-10",
    description:
      "Desenvolvimento de aplicacoes web com React e Node.js. Lideranca tecnica de equipe de 5 desenvolvedores.",
    location: "Remoto",
  },
  {
    id: "2",
    company: "StartupXYZ",
    role: "Desenvolvedor Full Stack",
    status: "Em Analise",
    appliedAt: "2026-03-15",
    description:
      "Construcao de plataforma SaaS do zero. Stack: TypeScript, React, Go, PostgreSQL.",
    location: "Sao Paulo, SP",
  },
  {
    id: "3",
    company: "BigData Inc",
    role: "Engenheiro de Software",
    status: "Enviada",
    appliedAt: "2026-03-20",
    description:
      "Desenvolvimento de pipelines de dados e APIs REST. Experiencia com Python e Docker desejavel.",
    location: "Rio de Janeiro, RJ",
  },
  {
    id: "4",
    company: "MobileFirst",
    role: "Desenvolvedor React Native",
    status: "Oferta",
    appliedAt: "2026-02-28",
    description:
      "Desenvolvimento de aplicativos moveis com React Native e Expo. Publicacao na App Store e Google Play.",
    location: "Remoto",
  },
  {
    id: "5",
    company: "CloudSys",
    role: "Engenheiro de Backend",
    status: "Rejeitada",
    appliedAt: "2026-02-15",
    description:
      "Microsservicos em Go e Kubernetes. Experiencia com arquitetura distribuida.",
    location: "Curitiba, PR",
  },
];
