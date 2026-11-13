// Conteúdo do portfólio. Fonte única: texto, links e dados estruturados (JSON-LD) saem daqui.

export type Link = { label: string; href: string };
export type Experience = {
  company: string;
  role: string;
  place: string;
  period: string;
  highlights: string[];
};
export type Project = { title: string; description: string; tags: string[] };
export type SkillGroup = { title: string; items: string[] };
export type Education = { course: string; school: string; period: string };

export const siteUrl = "https://example.com"; // provisório: trocar quando houver domínio

export const profile = {
  name: "Willian Hiroshi",
  legalName: "Willian Hiroshi Fukuda",
  brand: "Hiroshi",
  initials: "WH",
  title: "Engenheiro de Software Full Stack",
  stack: "Node.js · NestJS · TypeScript · React",
  status: "Aberto a vagas · remoto",
  summary:
    "Engenheiro full stack com 5 anos de experiência em desenvolvimento, os últimos em plataformas de iGaming com milhões de usuários. Atuo de ponta a ponta: arquitetura e backend em Node.js/NestJS e TypeScript, interfaces em React/Next.js e entrega em containers na AWS.",
  location: { city: "Londrina", region: "PR", country: "BR", label: "Londrina, PR · Brasil · remoto" },
  facts: [
    { value: "5 anos", label: "de experiência" },
    { value: "Milhões", label: "de usuários em iGaming" },
    { value: "PT · EN · ES", label: "nativo, fluente, profissional" },
  ],
};

export const nav: Link[] = [
  { label: "Sobre", href: "#sobre" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Projetos", href: "#projetos" },
  { label: "Competências", href: "#competencias" },
  { label: "Formação", href: "#formacao" },
];

export const about = {
  paragraphs: [
    "Trabalho de ponta a ponta: arquitetura e backend em Node.js, NestJS e TypeScript (microsserviços, gRPC, RabbitMQ, Redis, WebSocket, sistemas multi-tenant e orientados a eventos), interfaces em React e Next.js e entrega com Docker, CI e AWS.",
    "Tenho experiência forte em gamificação: missões, torneios, recompensas, minigames, segmentação de jogadores e engajamento. Gosto de problemas de escala e de arquitetura, código sustentável e de entender o produto para decidir bem.",
  ],
  principles: [
    { title: "Ponta a ponta", text: "Do modelo de dados à interface, com a mesma atenção ao backend e ao frontend." },
    { title: "Escala e arquitetura", text: "Serviços orientados a eventos, multi-tenant e em tempo real, prontos para crescer." },
    { title: "Produto", text: "Entender o negócio e o usuário para escolher a solução certa, não só a mais nova." },
  ],
};

export const experience: Experience[] = [
  {
    company: "Supernova Gaming",
    role: "Engenheiro Full Stack",
    place: "Tempo integral · Londrina, PR",
    period: "out 2025 – nov 2026",
    highlights: [
      "Arquitetei e desenvolvi soluções de gamificação para plataformas de iGaming com milhões de usuários: missões, torneios, recompensas, segmentação de jogadores e estratégias de engajamento.",
      "Backend em NestJS/TypeScript com microsserviços (gRPC e REST), mensageria com RabbitMQ, filas e cache com Redis/BullMQ, arquitetura orientada a eventos e multi-tenant.",
      "Interfaces em React/Next.js (Tailwind, TanStack Query, Zustand) para painéis administrativos e para a experiência do jogador, incluindo minigames com PixiJS.",
      "Integrações em tempo real (WebSocket, webhooks) com plataformas parceiras, mantendo a mesma solução atendendo várias operações.",
      "Entrega com Docker, CI no GitHub Actions e deploy na AWS (ECR, ECS, S3); observabilidade com Pino, Prometheus e OpenTelemetry; testes com Jest e Supertest.",
      "Liderança técnica no dia a dia: decisões de arquitetura, revisão de código e apoio ao time.",
    ],
  },
  {
    company: "Ana Gaming",
    role: "Engenheiro de Software",
    place: "Tempo integral · Nova Lima, MG",
    period: "fev 2025 – out 2025",
    highlights: [
      "Desenvolvi e evoluí serviços backend para plataformas de jogos online: funcionalidades de gamificação, estratégias de engajamento de jogadores e APIs escaláveis.",
      "Implementei integrações em tempo real e contribuí com a arquitetura e a performance da plataforma.",
      "Atuei também no frontend em React quando a entrega pedia, ponta a ponta com o backend.",
    ],
  },
  {
    company: "Growth Digital Marketing",
    role: "Engenheiro de Software",
    place: "Tempo integral · Londrina, PR",
    period: "out 2023 – fev 2025",
    highlights: [
      "Desenvolvi serviços backend e APIs em tempo real com Node.js e NestJS.",
      "Implementei integrações via WebSocket e funcionalidades de gamificação, contribuindo para performance, manutenibilidade e engajamento dos usuários.",
      "Construí telas em React integradas a essas APIs.",
    ],
  },
  {
    company: "Upwork",
    role: "Desenvolvedor freelancer",
    place: "Freelance · remoto",
    period: "nov 2022 – out 2023",
    highlights: [
      "Desenvolvi aplicações web e desktop para clientes com a stack MERN (MongoDB, Express, React, Node.js) e Electron.js: backends escaláveis, APIs e interfaces responsivas.",
    ],
  },
  {
    company: "Prefeitura Municipal de Ibiporã",
    role: "Estagiário de TI",
    place: "Estágio · Ibiporã, PR",
    period: "jan 2022 – nov 2022",
    highlights: ["Suporte de TI ao município: redes, hardware, software e sistemas administrativos."],
  },
];

export const projects: Project[] = [
  {
    title: "SaaS white-label de sorteios e gamificação",
    description:
      "Plataforma multi-tenant em monorepo: cada operação ganha sua própria marca sobre a mesma base de código.",
    tags: ["NestJS", "Next.js", "PostgreSQL", "GitHub Actions"],
  },
  {
    title: "Serviço de gamificação multi-tenant",
    description: "Serviço orientado a eventos para missões e recompensas, com comunicação entre serviços via gRPC e filas.",
    tags: ["gRPC", "RabbitMQ", "Redis", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Online Queue",
    description:
      "Monitoramento de filas em tempo real que integra senhas a qualquer plataforma e avisa o usuário quando chega a vez dele.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
];

export const skills: SkillGroup[] = [
  {
    title: "Backend",
    items: ["Node.js", "NestJS", "TypeScript", "Express", "REST + OpenAPI", "gRPC", "Microsserviços", "WebSocket / Socket.IO", "RabbitMQ", "Redis", "BullMQ", "JWT / Passport", "Webhooks"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Zustand", "React Hook Form + Zod", "PixiJS", "Electron"],
  },
  { title: "Dados", items: ["PostgreSQL", "MongoDB / Mongoose", "Python (FastAPI, Flask)", "BigQuery"] },
  {
    title: "Infra e qualidade",
    items: ["Docker", "GitHub Actions", "AWS (ECR, ECS, S3)", "Jest", "Supertest", "Vitest", "Playwright", "Pino", "Prometheus", "OpenTelemetry"],
  },
  {
    title: "Arquitetura e domínio",
    items: ["Orientada a eventos", "Multi-tenant / white-label", "Tempo real", "Liderança técnica", "Gamificação", "iGaming"],
  },
  { title: "Também", items: ["Java (intermediário)", "Machine Learning (intermediário)", "Vue", "Ruby on Rails", "Go"] },
];

export const education: Education[] = [
  { course: "Bacharelado em Engenharia de Software", school: "UTFPR — Universidade Tecnológica Federal do Paraná", period: "2020 – 2025" },
  { course: "Técnico em Redes de Computadores", school: "SENAI/SC", period: "2016 – 2018" },
];

export const languages = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Fluente, profissional" },
  { name: "Espanhol", level: "Profissional" },
];

export const contact = {
  text: "Aberto a vagas full stack, backend ou frontend, em regime remoto. Respondo por e-mail ou LinkedIn.",
  email: "w.hiroshi.fkd@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/w-hiroshi" },
    { label: "GitHub", href: "https://github.com/fkdhiro" },
  ] satisfies Link[],
};
