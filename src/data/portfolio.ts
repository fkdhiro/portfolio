import type { Portfolio } from "@/types/portfolio";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF CONTENT — Akiyuki Miyama
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every string, number and link rendered on the page lives here.
 *  Facts come from Akiyuki's CV. Rules kept on purpose:
 *  - Figures are only the ones confirmed (≈10M events/day on ETS, ≈US$500/month
 *    on one specific white-label deployment, 10 people led (confirmed by
 *    Akiyuki; Ana Gaming alone was 6 engineers + 1 QA), 10M+ tracked clicks,
 *    client bases of 10M+ customers and a 2.5M requests/minute peak on the
 *    Even Tecnologia platform).
 *  - RiskOS, ARQON and the Gamification Engine are NOT presented as production
 *    products.
 *  - Current role confirmed by Akiyuki: Head de Projetos at Even Tecnologia
 *    (jul/2026 — atual). It replaces the unvalidated "Minha Sorte" reference.
 *  - Social links stay `null` (hidden) until confirmed profile URLs exist.
 *  - Portrait: /public/images/portrait.webp (red/black duotone applied in PortraitPanel).
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const portfolio: Portfolio = {
  site: {
    title: "Akiyuki Miyama | Arquiteto de Sistemas e Líder de Engenharia",
    description:
      "Arquiteto de Sistemas especializado em sistemas distribuídos, backend, cloud, tracking e liderança técnica.",
    lang: "pt-BR",
  },

  nav: [
    { id: "about", label: "Sobre" },
    { id: "flagships", label: "Projetos" },
    { id: "matrix", label: "Sistemas" },
    { id: "contact", label: "Contato" },
  ],

  profile: {
    fullName: "Akiyuki Miyama",
    wordmark: "AKIYUKI.",
    greeting: "Olá, eu sou",
    name: "AKIYUKI.",
    headline: "Arquiteto de Sistemas e Líder de Engenharia",
    microheadline: "Arquiteto de Sistemas // Sistemas Distribuídos // Cloud",
    intro:
      "Arquiteto de Sistemas e líder técnico. Projeto plataformas distribuídas, resilientes e eficientes, conectando engenharia backend, cloud e decisões de arquitetura aos objetivos reais do negócio.",
    status: { label: "Online", detail: "Aberto a conversas" },
    primaryCta: { label: "Entre em contato", href: "#contact" },
    secondaryCta: { label: "Explorar projetos", href: "#flagships" },
    portrait: {
      src: "/images/portrait.webp",
      alt: "Retrato de Akiyuki Miyama",
      caption: { title: "Akiyuki Miyama", subtitle: "Arquiteto de Sistemas" },
    },
    heroCards: [
      {
        index: "01",
        title: "Sistemas Distribuídos",
        chips: ["DDD", "EDA", "gRPC"],
        description: "Arquiteturas orientadas a domínio e eventos",
      },
      {
        index: "02",
        title: "Cloud e Plataforma",
        chips: ["AWS", "ECS", "Terraform"],
        description: "Deploy, resiliência, observabilidade e FinOps",
      },
      {
        index: "03",
        title: "Liderança de Engenharia",
        chips: ["Mentoria", "Arquitetura", "Entrega"],
        description: "Liderança técnica e qualidade de engenharia",
      },
    ],
    heroStats: [
      { value: "~10M", label: "Eventos/dia no ETS" },
      { value: "~US$500", label: "AWS/mês · implantação white-label" },
      { value: "10", label: "Profissionais liderados" },
      { value: "10M+", label: "Cliques rastreados · link tracker" },
    ],
  },

  about: {
    marker: { code: "//01.00", name: "SEC_SOBRE", position: "01/05" },
    eyebrow: "Perfil de engenharia",
    title: "Trajetória e Filosofia",
    paragraphs: [
      "Minha trajetória começou com Business Intelligence e engenharia de dados, avançou para o desenvolvimento frontend e backend e evoluiu para arquitetura de sistemas e liderança técnica. Essa experiência me permite conectar decisões de software a métricas, riscos e necessidades operacionais.",
      "Atuo no desenho e na evolução de sistemas distribuídos, plataformas multi-tenant, soluções de tracking server-side e infraestrutura AWS. Trabalho com TypeScript, NestJS, DDD, arquitetura orientada a eventos, mensageria, gRPC, CI/CD, Terraform e observabilidade.",
      "Minha abordagem prioriza modelos de domínio claros, resiliência, simplicidade operacional e eficiência financeira. Escolho tecnologia em função do problema e de suas restrições, não pela complexidade da stack.",
    ],
    quote:
      "A melhor arquitetura é a que resolve o problema certo, com riscos conhecidos, custos sustentáveis e capacidade real de evolução.",
    principles: [
      {
        index: "01",
        title: "Engenharia orientada ao negócio",
        body: "Decisões técnicas conectadas a valor, custo e risco.",
      },
      {
        index: "02",
        title: "Confiabilidade desde o projeto",
        body: "Consistência, observabilidade, recuperação e resiliência.",
      },
      {
        index: "03",
        title: "Escalabilidade sustentável",
        body: "Crescimento com previsibilidade financeira e operacional.",
      },
    ],
    experience: {
      eyebrow: "Carreira",
      title: "Experiência profissional",
      items: [
        {
          company: "Even Tecnologia",
          role: "Head de Projetos",
          period: "jul/2026 — atual",
          summary:
            "Plataforma B2B2C multi-tenant com arquitetura orientada a eventos e gRPC, atendendo clientes com páginas próprias na plataforma.",
          highlights: [
            "Arquitetura multi-tenant com EDA + gRPC",
            "Suporte a clientes com bases de mais de 10 milhões de clientes",
            "Pico máximo suportado de 2,5 milhões de requisições por minuto",
          ],
        },
        {
          company: "SuperNova",
          role: "Arquiteto de Sistemas",
          period: "out/2025 — jun/2026",
          summary:
            "Projeto de uma plataforma white-label multi-tenant com arquitetura orientada a eventos, gRPC e microsserviços na AWS.",
          highlights: [
            "CI/CD com deploy blue/green e práticas de FinOps",
            "Infraestrutura reportada em ~US$500/mês, ~50% abaixo da estimativa inicial",
          ],
        },
        {
          company: "Ana Gaming",
          role: "Tech Lead Back-End",
          period: "abr/2025 — out/2025",
          summary:
            "Liderança de 6 engenheiros e 1 QA, com padrões de entrega, revisões arquiteturais e mentoria.",
          highlights: [
            "Desenvolvimento de soluções distribuídas",
            "Plataforma ETS processando ~10 milhões de eventos por dia",
          ],
        },
        {
          company: "Growth Digital Marketing",
          role: "Engenheiro Back-End",
          period: "mai/2024 — abr/2025",
          summary: "Sistemas de tracking multi-cliente, redirecionamento e analytics.",
          highlights: ["Link tracker com mais de 10 milhões de cliques rastreados"],
        },
        {
          company: "Growth Digital Marketing",
          role: "Engenheiro Front-End Trainee",
          period: "out/2023 — mai/2024",
          summary: "React e TypeScript em landing pages e interfaces para campanhas.",
          highlights: [],
        },
        {
          company: "Brid Soluções",
          role: "Analista de Sistemas BI (estágio)",
          period: "set/2022 — out/2023",
          summary: "Qlik Sense, Power BI, ETL, bancos de dados e dashboards.",
          highlights: [],
        },
      ],
      education: {
        course: "Engenharia de Software",
        institution: "UNOPAR",
        period: "ago/2022 — ago/2025",
      },
    },
    skills: {
      eyebrow: "Tecnologias",
      title: "Competências técnicas",
      groups: [
        {
          label: "Arquitetura",
          items: ["DDD", "EDA", "CQRS", "Outbox/Inbox", "Idempotência", "Sagas", "Resiliência", "Microsserviços", "Multi-tenancy"],
        },
        {
          label: "Backend",
          items: ["Node.js", "TypeScript", "NestJS", "REST", "gRPC", "WebSockets", "RabbitMQ", "Redis", "SQS/SNS"],
        },
        {
          label: "Cloud / DevOps",
          items: ["AWS", "ECS/Fargate", "EC2", "Docker", "Kubernetes/EKS", "Terraform", "CI/CD", "GitHub Actions", "Blue/green", "FinOps"],
        },
        {
          label: "Dados",
          items: ["PostgreSQL", "MongoDB", "ETL", "Qlik Sense", "Power BI"],
        },
        {
          label: "Observabilidade",
          items: ["OpenTelemetry", "Grafana", "Prometheus", "Logs estruturados", "Tracing distribuído"],
        },
        {
          label: "Liderança",
          items: ["Mentoria", "Revisão de código", "Arquitetura", "Priorização técnica", "Entrega"],
        },
      ],
    },
  },

  flagships: {
    marker: { code: "//02.00", name: "SEC_PROJETOS", position: "02/05" },
    eyebrow: "Vitrine de arquitetura",
    title: "Projetos em destaque",
    description:
      "Plataformas que projetei, liderei ou desenvolvi em contexto profissional — com os números que foram efetivamente medidos.",
    flagship: {
      badge: "Plataforma principal",
      context: "Ana Gaming · 2025",
      title: "ETS — Event Tracker Stream",
      description:
        "Plataforma de tracking server-side para ingestão, processamento, atribuição e distribuição de eventos em alto volume, conectando sinais de mídia, eventos da plataforma e métricas de aquisição.",
      metrics: [
        { value: "~10M", label: "Eventos por dia" },
        { value: "S2S", label: "Postbacks server-side" },
        { value: "6", label: "Plataformas de mídia" },
        { value: "EDA", label: "Orientada a eventos" },
      ],
      stackLabel: "Capacidades da plataforma",
      stackNote:
        "As camadas descrevem capacidades funcionais da plataforma, não necessariamente sete serviços independentes.",
      layers: [
        {
          id: "l1",
          code: "L1",
          name: "Ingestão de eventos",
          headline: "Recebimento e validação de eventos",
          body: "Porta de entrada da plataforma: recebe eventos de mídia e da própria plataforma, valida formato e origem e descarta dados inconsistentes antes do processamento.",
          specs: [
            { label: "Função", value: "Ingestão" },
            { label: "Foco", value: "Validação" },
          ],
          tags: ["Validação", "Contratos de evento", "Alto volume"],
        },
        {
          id: "l2",
          code: "L2",
          name: "Processamento",
          headline: "Normalização e tratamento",
          body: "Padroniza eventos de fontes diferentes em um modelo comum, trata duplicidades e prepara os dados necessários para a atribuição.",
          specs: [
            { label: "Função", value: "Processamento" },
            { label: "Foco", value: "Consistência" },
          ],
          tags: ["Normalização", "Idempotência", "Modelo comum"],
        },
        {
          id: "l3",
          code: "L3",
          name: "Atribuição",
          headline: "Correlação de campanhas, cliques e eventos",
          body: "Relaciona cliques, campanhas e eventos de conversão para atribuir cada resultado à sua origem de aquisição.",
          specs: [
            { label: "Função", value: "Atribuição" },
            { label: "Foco", value: "Origem da conversão" },
          ],
          tags: ["Campanhas", "Cliques", "Conversões"],
        },
        {
          id: "l4",
          code: "L4",
          name: "Mensageria",
          headline: "Distribuição assíncrona e desacoplamento",
          body: "Mensageria entre as etapas do fluxo, para que picos de volume e falhas pontuais não se propaguem pela plataforma.",
          specs: [
            { label: "Função", value: "Distribuição" },
            { label: "Foco", value: "Desacoplamento" },
          ],
          tags: ["Mensageria", "Assíncrono", "Filas"],
        },
        {
          id: "l5",
          code: "L5",
          name: "Integrações",
          headline: "Postbacks e plataformas externas",
          body: "Envio de conversões por postback S2S para as plataformas de mídia integradas: Meta, Google, Kwai, X, MGID e Taboola.",
          specs: [
            { label: "Função", value: "Integração" },
            { label: "Foco", value: "Postbacks S2S" },
          ],
          tags: ["Meta", "Google", "Kwai", "X", "MGID", "Taboola"],
        },
        {
          id: "l6",
          code: "L6",
          name: "Análise de dados",
          headline: "Indicadores e dados de performance",
          body: "Consolida os dados de aquisição e conversão em indicadores de performance para as equipes de negócio e mídia.",
          specs: [
            { label: "Função", value: "Análise" },
            { label: "Foco", value: "Performance" },
          ],
          tags: ["Indicadores", "Aquisição", "Performance"],
        },
        {
          id: "l7",
          code: "L7",
          name: "Observabilidade",
          headline: "Logs, métricas e tracing",
          body: "Visibilidade de ponta a ponta do fluxo de eventos para detectar falhas, gargalos e divergências rapidamente.",
          specs: [
            { label: "Função", value: "Operação" },
            { label: "Foco", value: "Visibilidade" },
          ],
          tags: ["Logs", "Métricas", "Tracing"],
        },
      ],
    },
    projects: [
      {
        eyebrow: "SuperNova · 2025–2026",
        title: "Plataforma white-label multi-tenant",
        description:
          "Plataforma B2B2C white-label multi-tenant, projetada com microsserviços orientados a eventos na AWS.",
        details: [
          "Arquitetura orientada a eventos e comunicação gRPC",
          "CI/CD com deploy blue/green",
          "FinOps: ~US$500/mês na implantação reportada, ~50% abaixo da estimativa inicial",
        ],
        tech: ["AWS", "EDA", "gRPC", "Blue/green", "FinOps"],
      },
      {
        eyebrow: "Growth Digital Marketing · 2024–2025",
        title: "Link tracker multi-cliente",
        description:
          "Sistema multi-cliente de rastreamento de links, redirecionamento e analytics para campanhas.",
        details: [
          "Rastreamento e redirecionamento de links por cliente",
          "Analytics de cliques para campanhas",
          "Mais de 10 milhões de cliques rastreados",
        ],
        tech: ["Rastreamento", "Redirecionamento", "Análise"],
      },
    ],
  },

  matrix: {
    marker: { code: "//03.00", name: "SEC_SISTEMAS", position: "03/05" },
    eyebrow: "Índice de engenharia",
    title: "Matriz de Sistemas",
    description:
      "Sistemas da experiência profissional e produtos próprios em evolução — cada um com seu status real.",
    allLabel: "Todos os sistemas",
    categories: [
      { id: "distributed", label: "Sistemas distribuídos" },
      { id: "cloud", label: "Cloud e plataforma" },
      { id: "data", label: "Dados e analytics" },
      { id: "product", label: "Engenharia de produto" },
    ],
    systems: [
      {
        id: "ets",
        categories: ["distributed", "data"],
        title: "ETS — Event Tracker Stream",
        description:
          "Tracking server-side de alto volume: ingestão, atribuição e postbacks S2S para plataformas de mídia.",
        meta: [
          { label: "Contexto", value: "Ana Gaming" },
          { label: "Status", value: "Experiência profissional" },
        ],
      },
      {
        id: "white-label",
        categories: ["cloud", "distributed"],
        title: "Plataforma white-label multi-tenant",
        description:
          "Plataforma B2B2C multi-tenant com EDA, gRPC, blue/green e FinOps na AWS.",
        meta: [
          { label: "Contexto", value: "SuperNova" },
          { label: "Status", value: "Experiência profissional" },
        ],
      },
      {
        id: "link-tracker",
        categories: ["data", "product"],
        title: "Link tracker multi-cliente",
        description:
          "Rastreamento de links, redirecionamento e analytics multi-cliente, com mais de 10 milhões de cliques.",
        meta: [
          { label: "Contexto", value: "Growth Digital Marketing" },
          { label: "Status", value: "Experiência profissional" },
        ],
      },
      {
        id: "riskos",
        categories: ["data", "product"],
        title: "RiskOS",
        description: "Produto voltado a risco, scores e analytics.",
        meta: [
          { label: "Tipo", value: "Produto próprio" },
          { label: "Status", value: "Em evolução" },
        ],
      },
      {
        id: "arqon",
        categories: ["cloud"],
        title: "ARQON",
        description: "Automação de GitHub, infraestrutura como código e CI/CD.",
        meta: [
          { label: "Tipo", value: "Conceito" },
          { label: "Status", value: "Em desenvolvimento" },
        ],
      },
      {
        id: "gamification",
        categories: ["product"],
        title: "Motor de gamificação",
        description: "Motor de missões, torneios, rankings e benefícios.",
        meta: [
          { label: "Tipo", value: "Projeto" },
          { label: "Status", value: "Em planejamento" },
        ],
      },
    ],
  },

  contact: {
    marker: { code: "//04.00", name: "SEC_CONTATO", position: "04/05" },
    eyebrow: "Contato direto",
    headline: ["Vamos arquitetar", "algo extraordinário."],
    body: "Vamos conversar sobre arquitetura de sistemas, engenharia de plataformas e desafios de escala.",
    email: "akiyuki090@gmail.com",
    copyLabel: "Copiar e-mail",
    copiedLabel: "Copiado!",
    copyErrorLabel: "Falha ao copiar — selecione o endereço",
    socials: [
      { platform: "github", label: "GitHub", href: null },
      { platform: "linkedin", label: "LinkedIn", href: null },
      { platform: "x", label: "X", href: null },
      { platform: "instagram", label: "Instagram", href: null },
    ],
  },

  footer: {
    copyright: "© 2026 Akiyuki Miyama",
    signature: "Arquitetura de sistemas · engenharia de plataformas",
    build: "//05.00 SEC_FIM [05/05]",
  },
};
