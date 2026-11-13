import type { Portfolio } from "@/types/portfolio";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF CONTENT — Willian Hiroshi
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every string, number and link rendered on the page lives here.
 *  Rules kept on purpose:
 *  - No figures besides "5 anos" de experiência e "milhões de usuários".
 *  - No internal project/client names (except Online Queue).
 *  - AWS: only ECR, ECS and S3. Java, Machine Learning, React Native and C#/.NET
 *    listed as intermediate.
 *  - JSON-LD Person: no e-mail nor city (privacy); country + sameAs only.
 *  - Social links stay `null` (hidden) until confirmed profile URLs exist.
 *  - Portrait: real photo (assets/portrait-source.png → `npm run images`).
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const portfolio: Portfolio = {
  site: {
    title:
      "Willian Hiroshi | Desenvolvedor Full Stack · Engenheiro de Software · Node.js · NestJS · TypeScript · React",
    description:
      "Desenvolvedor Full Stack e Engenheiro de Software com 5 anos de experiência: Node.js, NestJS, TypeScript, JavaScript e React em plataformas de iGaming com milhões de usuários.",
    lang: "pt-BR",
    person: {
      name: "Willian Hiroshi Fukuda",
      alternateName: ["Willian Fukuda", "Hiroshi"],
      jobTitle: "Engenheiro de Software Full Stack",
      country: "BR",
      sameAs: ["https://www.linkedin.com/in/w-hiroshi", "https://github.com/fkdhiro"],
      alumniOf: ["Universidade Tecnológica Federal do Paraná (UTFPR)", "SENAI/SC"],
      knowsAbout: ["Node.js", "NestJS", "TypeScript", "JavaScript", "React", "Next.js", "React Native", "C#", ".NET", "SQL", "Microsserviços", "gRPC", "RabbitMQ", "Redis", "WebSocket", "MongoDB", "PostgreSQL", "Docker", "AWS", "Gamificação", "iGaming"],
      knowsLanguage: ["pt-BR", "en", "es"],
    },
  },

  nav: [
    { id: "about", label: "Sobre" },
    { id: "flagships", label: "Projetos" },
    { id: "matrix", label: "Sistemas" },
    { id: "contact", label: "Contato" },
  ],

  profile: {
    fullName: "Willian Hiroshi",
    wordmark: "HIROSHI.",
    greeting: "Olá, eu sou",
    name: "HIROSHI.",
    headline: "Engenheiro de Software Full Stack",
    microheadline: "Full Stack // Node.js · NestJS // TypeScript · React",
    intro:
      "Engenheiro full stack com 5 anos de experiência em desenvolvimento, os últimos em plataformas de iGaming com milhões de usuários. Atuo de ponta a ponta: arquitetura e backend em Node.js/NestJS e TypeScript, interfaces em React/Next.js e entrega em containers na AWS.",
    status: { label: "Online", detail: "Aberto a vagas · remoto" },
    primaryCta: { label: "Entre em contato", href: "#contact" },
    secondaryCta: { label: "Explorar projetos", href: "#flagships" },
    portrait: {
      src: "/images/portrait.webp",
      alt: "Retrato de Willian Hiroshi",
      caption: { title: "Willian Hiroshi", subtitle: "Engenheiro Full Stack" },
    },
    heroCards: [
      {
        index: "01",
        title: "Backend e Arquitetura",
        chips: ["NestJS", "gRPC", "RabbitMQ"],
        description: "Microsserviços orientados a eventos e multi-tenant",
      },
      {
        index: "02",
        title: "Frontend e Produto",
        chips: ["React", "Next.js", "PixiJS"],
        description: "Painéis, experiência do jogador e minigames",
      },
      {
        index: "03",
        title: "Cloud e Entrega",
        chips: ["Docker", "AWS", "CI/CD"],
        description: "Containers, deploy e observabilidade",
      },
    ],
    heroStats: [
      { value: "5 anos", label: "De experiência em desenvolvimento" },
      { value: "Milhões", label: "De usuários · plataformas de iGaming" },
      { value: "Full stack", label: "Backend + frontend, ponta a ponta" },
      { value: "PT·EN·ES", label: "Nativo · fluente · profissional" },
    ],
  },

  about: {
    marker: { code: "//01.00", name: "SEC_SOBRE", position: "01/05" },
    eyebrow: "Perfil de engenharia",
    title: "Trajetória e Filosofia",
    paragraphs: [
      "Comecei com redes e suporte de TI (sou técnico em Redes de Computadores pelo SENAI/SC), passei por projetos freelance com a stack MERN e Electron e me consolidei como engenheiro full stack em produtos de iGaming, onde passei os últimos anos construindo plataformas usadas por milhões de pessoas.",
      "Trabalho de ponta a ponta: arquitetura e backend em Node.js, NestJS e TypeScript (microsserviços, gRPC, RabbitMQ, Redis, WebSocket, sistemas multi-tenant e orientados a eventos), interfaces em React e Next.js e entrega com Docker, CI e AWS.",
      "Tenho experiência forte em gamificação: missões, torneios, recompensas, minigames, segmentação de jogadores e engajamento. Uso IA no dia a dia do desenvolvimento: opero agentes com Claude Code, com várias sessões autônomas com regras, memória e ferramentas, para automatizar tarefas de ponta a ponta. Falo português (nativo), inglês (fluente) e espanhol (profissional).",
    ],
    quote:
      "Gosto de problemas de escala e de arquitetura, de código sustentável e de entender o produto para decidir bem.",
    principles: [
      {
        index: "01",
        title: "Ponta a ponta",
        body: "Do modelo de dados à interface, com a mesma atenção ao backend e ao frontend.",
      },
      {
        index: "02",
        title: "Escala e arquitetura",
        body: "Serviços orientados a eventos, multi-tenant e em tempo real, prontos para crescer.",
      },
      {
        index: "03",
        title: "Foco no produto",
        body: "Entender o negócio e o usuário para escolher a solução certa, não só a mais nova.",
      },
    ],
    experience: {
      eyebrow: "Carreira",
      title: "Experiência profissional",
      items: [
        {
          company: "Supernova Gaming",
          role: "Engenheiro Full Stack",
          period: "out/2025 — nov/2026",
          summary:
            "Soluções de gamificação para plataformas de iGaming com milhões de usuários: missões, torneios, recompensas, segmentação de jogadores e engajamento.",
          highlights: [
            "Backend em NestJS/TypeScript com microsserviços (gRPC e REST), RabbitMQ, Redis/BullMQ, arquitetura orientada a eventos e multi-tenant",
            "Interfaces em React/Next.js para painéis administrativos e experiência do jogador, incluindo minigames com PixiJS",
            "Integrações em tempo real (WebSocket, webhooks) com plataformas parceiras",
            "Docker, GitHub Actions e deploy na AWS (ECR, ECS, S3); observabilidade com Pino, Prometheus e OpenTelemetry",
            "Liderança técnica no dia a dia: decisões de arquitetura, revisão de código e apoio ao time",
          ],
        },
        {
          company: "Ana Gaming",
          role: "Engenheiro de Software",
          period: "fev/2025 — out/2025",
          summary:
            "Serviços backend para plataformas de jogos online: gamificação, engajamento de jogadores e APIs escaláveis.",
          highlights: [
            "Integrações em tempo real e contribuição com arquitetura e performance da plataforma",
            "Frontend em React quando a entrega pedia, ponta a ponta com o backend",
          ],
        },
        {
          company: "Growth Digital Marketing",
          role: "Engenheiro de Software",
          period: "out/2023 — fev/2025",
          summary: "Serviços backend e APIs em tempo real com Node.js e NestJS.",
          highlights: [
            "Integrações via WebSocket e funcionalidades de gamificação",
            "Telas em React integradas a essas APIs",
          ],
        },
        {
          company: "Upwork",
          role: "Desenvolvedor freelancer",
          period: "nov/2022 — out/2023",
          summary:
            "Aplicações web e desktop para clientes com MERN (MongoDB, Express, React, Node.js) e Electron.js.",
          highlights: [
            "Backends escaláveis e APIs em Node.js/Express com MongoDB",
            "Interfaces responsivas em React e apps desktop com Electron.js",
          ],
        },
        {
          company: "Prefeitura Municipal de Ibiporã",
          role: "Estagiário de TI",
          period: "jan/2022 — nov/2022",
          summary: "Suporte de TI ao município: redes, hardware, software e sistemas administrativos.",
          highlights: [
            "Suporte a redes e hardware",
            "Suporte a software e sistemas administrativos do município",
          ],
        },
      ],
      education: [
        {
          course: "Bacharelado em Engenharia de Software",
          institution: "UTFPR",
          period: "2020 — 2025",
        },
        {
          course: "Técnico em Redes de Computadores",
          institution: "SENAI/SC",
          period: "2016 — 2018",
        },
      ],
    },
    skills: {
      eyebrow: "Tecnologias",
      title: "Competências técnicas",
      groups: [
        {
          label: "Backend",
          items: ["Node.js", "NestJS", "TypeScript", "Express", "REST + OpenAPI", "gRPC", "Microsserviços", "WebSocket / Socket.IO", "RabbitMQ", "Redis", "BullMQ", "JWT / Passport", "Webhooks"],
        },
        {
          label: "Frontend",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "TanStack Query", "Zustand", "React Hook Form + Zod", "PixiJS", "Electron"],
        },
        {
          label: "Cloud / DevOps",
          items: ["Docker", "Docker Compose", "GitHub Actions", "AWS ECR", "AWS ECS", "AWS S3", "CI/CD", "Linux"],
        },
        {
          label: "Dados",
          items: ["SQL", "PostgreSQL", "MongoDB (Mongoose)", "Python (FastAPI, Flask)", "BigQuery", "Athena"],
        },
        {
          label: "Qualidade",
          items: ["Jest", "Supertest", "Vitest", "Playwright", "Pino", "Prometheus", "OpenTelemetry"],
        },
        {
          label: "Também",
          items: ["Java (intermediário)", "Machine Learning (intermediário)", "React Native (intermediário)", "C# / .NET (intermediário)", "Vue", "Ruby on Rails", "Go", "IoT (MQTT, RTSP)", "IA: LLMs e agentes (Claude Code)"],
        },
      ],
    },
  },

  flagships: {
    marker: { code: "//02.00", name: "SEC_PROJETOS", position: "02/05" },
    eyebrow: "Vitrine de arquitetura",
    title: "Projetos em destaque",
    description:
      "Plataformas que projetei e desenvolvi em contexto profissional e projetos próprios.",
    flagship: {
      badge: "Plataforma principal",
      context: "Supernova Gaming · 2025–2026",
      title: "Serviço de gamificação multi-tenant",
      description:
        "Serviço orientado a eventos para missões, torneios e recompensas em plataformas de iGaming com milhões de usuários, com comunicação entre serviços via gRPC e filas.",
      metrics: [
        { value: "Milhões", label: "De usuários" },
        { value: "gRPC", label: "Entre serviços" },
        { value: "EDA", label: "Orientado a eventos" },
        { value: "Multi", label: "Tenant / white-label" },
      ],
      stackLabel: "Capacidades da plataforma",
      stackNote:
        "As camadas descrevem capacidades funcionais da plataforma, não necessariamente serviços independentes.",
      layers: [
        {
          id: "l1",
          code: "L1",
          name: "Missões",
          headline: "Regras, progresso e conclusão",
          body: "Missões configuráveis por operação, com regras de progresso calculadas a partir dos eventos de jogo de cada jogador.",
          specs: [
            { label: "Função", value: "Engajamento" },
            { label: "Foco", value: "Regras" },
          ],
          tags: ["Missões", "Regras", "Eventos"],
        },
        {
          id: "l2",
          code: "L2",
          name: "Torneios",
          headline: "Competições e rankings",
          body: "Torneios com rankings atualizados conforme os eventos chegam, para competição entre jogadores.",
          specs: [
            { label: "Função", value: "Competição" },
            { label: "Foco", value: "Rankings" },
          ],
          tags: ["Torneios", "Rankings", "Redis"],
        },
        {
          id: "l3",
          code: "L3",
          name: "Recompensas",
          headline: "Concessão e controle de prêmios",
          body: "Concessão de recompensas ao concluir missões e torneios, com controle para que cada prêmio seja entregue uma única vez.",
          specs: [
            { label: "Função", value: "Recompensa" },
            { label: "Foco", value: "Consistência" },
          ],
          tags: ["Recompensas", "Idempotência", "BullMQ"],
        },
        {
          id: "l4",
          code: "L4",
          name: "Segmentação",
          headline: "Jogadores certos para cada ação",
          body: "Segmentação de jogadores para direcionar missões, torneios e estratégias de engajamento por perfil.",
          specs: [
            { label: "Função", value: "Segmentação" },
            { label: "Foco", value: "Engajamento" },
          ],
          tags: ["Segmentos", "Perfis", "Engajamento"],
        },
        {
          id: "l5",
          code: "L5",
          name: "Mensageria",
          headline: "Eventos assíncronos e desacoplamento",
          body: "Comunicação entre serviços por eventos e filas, para que picos de volume e falhas pontuais não se propaguem.",
          specs: [
            { label: "Função", value: "Distribuição" },
            { label: "Foco", value: "Desacoplamento" },
          ],
          tags: ["RabbitMQ", "gRPC", "Filas"],
        },
        {
          id: "l6",
          code: "L6",
          name: "Integrações",
          headline: "Tempo real com plataformas parceiras",
          body: "Integrações por WebSocket e webhooks, mantendo a mesma solução atendendo várias operações (multi-tenant).",
          specs: [
            { label: "Função", value: "Integração" },
            { label: "Foco", value: "Tempo real" },
          ],
          tags: ["WebSocket", "Webhooks", "Multi-tenant"],
        },
        {
          id: "l7",
          code: "L7",
          name: "Observabilidade",
          headline: "Logs, métricas e tracing",
          body: "Visibilidade de ponta a ponta do fluxo de eventos para detectar falhas e gargalos rapidamente.",
          specs: [
            { label: "Função", value: "Operação" },
            { label: "Foco", value: "Visibilidade" },
          ],
          tags: ["Pino", "Prometheus", "OpenTelemetry"],
        },
      ],
    },
    projects: [
      {
        eyebrow: "Projeto · white-label",
        title: "SaaS white-label de sorteios e gamificação",
        description:
          "Plataforma multi-tenant em monorepo: cada operação ganha sua própria marca sobre a mesma base de código.",
        details: [
          "Arquitetura multi-tenant / white-label",
          "Backend em NestJS e frontend em Next.js",
          "CI/CD com GitHub Actions",
        ],
        tech: ["NestJS", "Next.js", "PostgreSQL", "GitHub Actions"],
      },
      {
        eyebrow: "Projeto · tempo real",
        title: "Online Queue",
        description:
          "Monitoramento de filas em tempo real que integra senhas a qualquer plataforma e avisa o usuário quando chega a vez dele.",
        details: [
          "Integração de senhas com qualquer plataforma",
          "Aviso ao usuário quando chega a vez dele",
          "Stack MERN de ponta a ponta",
        ],
        tech: ["MongoDB", "Express", "React", "Node.js"],
      },
    ],
  },

  matrix: {
    marker: { code: "//03.00", name: "SEC_SISTEMAS", position: "03/05" },
    eyebrow: "Índice de engenharia",
    title: "Matriz de Sistemas",
    description:
      "Sistemas da experiência profissional e projetos próprios — cada um com seu contexto real.",
    allLabel: "Todos os sistemas",
    categories: [
      { id: "distributed", label: "Sistemas distribuídos" },
      { id: "cloud", label: "Cloud e plataforma" },
      { id: "realtime", label: "Tempo real" },
      { id: "product", label: "Frontend e produto" },
    ],
    systems: [
      {
        id: "gamification",
        categories: ["distributed", "cloud"],
        title: "Serviço de gamificação multi-tenant",
        description:
          "Missões, torneios e recompensas orientados a eventos, com gRPC, RabbitMQ e Redis.",
        meta: [
          { label: "Contexto", value: "Supernova Gaming" },
          { label: "Status", value: "Experiência profissional" },
        ],
      },
      {
        id: "minigames",
        categories: ["product"],
        title: "Minigames e experiência do jogador",
        description:
          "Interfaces em React/Next.js e minigames com PixiJS para a experiência do jogador.",
        meta: [
          { label: "Contexto", value: "Supernova Gaming" },
          { label: "Status", value: "Experiência profissional" },
        ],
      },
      {
        id: "white-label",
        categories: ["cloud", "product"],
        title: "SaaS white-label de sorteios",
        description:
          "Plataforma multi-tenant em monorepo com NestJS, Next.js, PostgreSQL e GitHub Actions.",
        meta: [
          { label: "Tipo", value: "Projeto" },
          { label: "Status", value: "White-label" },
        ],
      },
      {
        id: "engagement-apis",
        categories: ["realtime", "distributed"],
        title: "APIs de engajamento em tempo real",
        description:
          "Serviços backend e integrações em tempo real para gamificação e engajamento de jogadores.",
        meta: [
          { label: "Contexto", value: "Ana Gaming · Growth" },
          { label: "Status", value: "Experiência profissional" },
        ],
      },
      {
        id: "online-queue",
        categories: ["realtime", "product"],
        title: "Online Queue",
        description: "Monitoramento de filas em tempo real com aviso ao usuário (MERN).",
        meta: [
          { label: "Tipo", value: "Projeto próprio" },
          { label: "Status", value: "MERN" },
        ],
      },
      {
        id: "freelance-apps",
        categories: ["product"],
        title: "Aplicações web e desktop",
        description: "Aplicações para clientes com MERN e Electron.js: APIs e interfaces responsivas.",
        meta: [
          { label: "Contexto", value: "Upwork" },
          { label: "Status", value: "Freelance" },
        ],
      },
    ],
  },

  contact: {
    marker: { code: "//04.00", name: "SEC_CONTATO", position: "04/05" },
    eyebrow: "Contato direto",
    headline: ["Vamos construir", "algo extraordinário."],
    body: "Aberto a vagas full stack, backend ou frontend, em regime remoto. Respondo por e-mail ou LinkedIn.",
    email: "w.hiroshi.fkd@gmail.com",
    copyLabel: "Copiar e-mail",
    copiedLabel: "Copiado!",
    copyErrorLabel: "Falha ao copiar — selecione o endereço",
    socials: [
      { platform: "github", label: "GitHub", href: "https://github.com/fkdhiro" },
      { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/w-hiroshi" },
    ],
  },

  footer: {
    copyright: "© 2026 Willian Hiroshi",
    signature: "Engenharia full stack · Londrina, PR · remoto",
    build: "//05.00 SEC_FIM [05/05]",
  },
};
