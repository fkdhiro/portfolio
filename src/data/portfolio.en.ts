import type { Portfolio } from "@/types/portfolio";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF CONTENT (EN) — Willian Hiroshi
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every string, number and link rendered on the page lives here.
 *  Rules kept on purpose:
 *  - No figures besides "5 years" of experience and "millions of users".
 *  - No internal project/client names (except Online Queue).
 *  - AWS: only ECR, ECS and S3. Java, Machine Learning, React Native and C#/.NET
 *    listed as intermediate.
 *  - JSON-LD Person: no e-mail nor city (privacy); country + sameAs only.
 *  - Social links stay `null` (hidden) until confirmed profile URLs exist.
 *  - Portrait: real photo (assets/portrait-source.png → `npm run images`).
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const portfolioEn: Portfolio = {
  site: {
    title:
      "Willian Hiroshi | Full Stack Developer · Software Engineer · Node.js · NestJS · TypeScript · React",
    description:
      "Full Stack Developer and Software Engineer with 5 years of experience: Node.js, NestJS, TypeScript, JavaScript and React on iGaming platforms serving millions of users.",
    lang: "en",
    locale: "en_US",
    path: "/en/",
    ogAlt: "Willian Hiroshi — Full Stack Developer · Software Engineer",
    ui: {
      intro: { scan: "Scanning interface", agents: "agents", targets: "targets" },
      skipLink: "Skip to content",
      navLabel: "Main",
      backToTop: "back to top",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: {
        label: "Language",
        current: { code: "EN", lang: "en" },
        alternate: { code: "PT", lang: "pt-BR", href: "/", title: "Ler em português" },
      },
    },
    person: {
      name: "Willian Hiroshi Fukuda",
      alternateName: ["Willian Fukuda", "Hiroshi"],
      jobTitle: "Full Stack Software Engineer",
      country: "BR",
      sameAs: ["https://www.linkedin.com/in/w-hiroshi", "https://github.com/fkdhiro"],
      alumniOf: ["Federal University of Technology – Paraná (UTFPR)", "SENAI/SC"],
      knowsAbout: ["Node.js", "NestJS", "TypeScript", "JavaScript", "React", "Next.js", "React Native", "C#", ".NET", "SQL", "Microservices", "gRPC", "RabbitMQ", "Redis", "WebSocket", "MongoDB", "PostgreSQL", "Docker", "AWS", "Gamification", "iGaming"],
      knowsLanguage: ["pt-BR", "en", "es"],
    },
  },

  nav: [
    { id: "about", label: "About" },
    { id: "flagships", label: "Projects" },
    { id: "matrix", label: "Systems" },
    { id: "contact", label: "Contact" },
  ],

  profile: {
    fullName: "Willian Hiroshi",
    wordmark: "HIROSHI.",
    greeting: "Hi, I'm",
    name: "HIROSHI.",
    headline: "Full Stack Software Engineer",
    techLabel: "Technologies",
    microheadline: "Full Stack // Node.js · NestJS // TypeScript · React",
    intro:
      "Full stack engineer with 5 years of development experience, the last ones on iGaming platforms with millions of users. I work end to end: architecture and backend in Node.js/NestJS and TypeScript, interfaces in React/Next.js, and container delivery on AWS.",
    status: { label: "Online", detail: "Open to roles · remote" },
    primaryCta: { label: "Get in touch", href: "#contact" },
    secondaryCta: { label: "Explore projects", href: "#flagships" },
    portrait: {
      src: "/images/portrait.webp",
      alt: "Portrait of Willian Hiroshi",
      caption: { title: "Willian Hiroshi", subtitle: "Full Stack Engineer" },
    },
    heroCards: [
      {
        index: "01",
        title: "Backend & Architecture",
        chips: ["NestJS", "gRPC", "RabbitMQ"],
        description: "Event-driven, multi-tenant microservices",
      },
      {
        index: "02",
        title: "Frontend & Product",
        chips: ["React", "Next.js", "PixiJS"],
        description: "Dashboards, player experience and minigames",
      },
      {
        index: "03",
        title: "Cloud & Delivery",
        chips: ["Docker", "AWS", "CI/CD"],
        description: "Containers, deployment and observability",
      },
    ],
    heroStats: [
      { value: "5 years", label: "Of development experience" },
      { value: "Millions", label: "Of users · iGaming platforms" },
      { value: "Full stack", label: "Backend + frontend, end to end" },
      { value: "PT·EN·ES", label: "Native · fluent · professional" },
    ],
  },

  about: {
    marker: { code: "//01.00", name: "SEC_ABOUT", position: "01/05", indexLabel: "INDEX" },
    eyebrow: "Engineering profile",
    title: "Background & Philosophy",
    paragraphs: [
      "I started in networking and IT support (I hold a technical diploma in Computer Networks from SENAI/SC), went through freelance projects with the MERN stack and Electron, and settled in as a full stack engineer on iGaming products, where I have spent the last few years building platforms used by millions of people.",
      "I work end to end: architecture and backend in Node.js, NestJS and TypeScript (microservices, gRPC, RabbitMQ, Redis, WebSocket, multi-tenant and event-driven systems), interfaces in React and Next.js, and delivery with Docker, CI and AWS.",
      "I have strong experience in gamification: missions, tournaments, rewards, minigames, player segmentation and engagement. I use AI in my day-to-day development: I operate agents with Claude Code, running several autonomous sessions with rules, memory and tools to automate tasks end to end. I speak Portuguese (native), English (fluent) and Spanish (professional).",
    ],
    quote:
      "I enjoy problems of scale and architecture, sustainable code, and understanding the product well enough to make good decisions.",
    principles: [
      {
        index: "01",
        title: "End to end",
        body: "From the data model to the interface, with the same attention to backend and frontend.",
      },
      {
        index: "02",
        title: "Scale and architecture",
        body: "Event-driven, multi-tenant, real-time services, built to grow.",
      },
      {
        index: "03",
        title: "Product focus",
        body: "Understanding the business and the user to choose the right solution, not just the newest one.",
      },
    ],
    experience: {
      educationLabel: "Education",
      eyebrow: "Career",
      title: "Professional experience",
      items: [
        {
          company: "Supernova Gaming",
          role: "Full Stack Engineer",
          period: "Oct 2025 — Nov 2026",
          summary:
            "Gamification solutions for iGaming platforms with millions of users: missions, tournaments, rewards, player segmentation and engagement.",
          highlights: [
            "Backend in NestJS/TypeScript with microservices (gRPC and REST), RabbitMQ, Redis/BullMQ, event-driven and multi-tenant architecture",
            "React/Next.js interfaces for admin dashboards and the player experience, including PixiJS minigames",
            "Real-time integrations (WebSocket, webhooks) with partner platforms",
            "Docker, GitHub Actions and AWS deployment (ECR, ECS, S3); observability with Pino, Prometheus and OpenTelemetry",
            "Day-to-day technical leadership: architecture decisions, code review and team support",
          ],
        },
        {
          company: "Ana Gaming",
          role: "Software Engineer",
          period: "Feb 2025 — Oct 2025",
          summary:
            "Backend services for online gaming platforms: gamification, player engagement and scalable APIs.",
          highlights: [
            "Real-time integrations and contributions to platform architecture and performance",
            "React frontend when the delivery called for it, working end to end with the backend",
          ],
        },
        {
          company: "Growth Digital Marketing",
          role: "Software Engineer",
          period: "Oct 2023 — Feb 2025",
          summary: "Backend services and real-time APIs with Node.js and NestJS.",
          highlights: [
            "WebSocket integrations and gamification features",
            "React screens integrated with those APIs",
          ],
        },
        {
          company: "Upwork",
          role: "Freelance Developer",
          period: "Nov 2022 — Oct 2023",
          summary:
            "Web and desktop applications for clients with MERN (MongoDB, Express, React, Node.js) and Electron.js.",
          highlights: [
            "Scalable backends and APIs in Node.js/Express with MongoDB",
            "Responsive React interfaces and desktop apps with Electron.js",
          ],
        },
        {
          company: "Municipal Government of Ibiporã",
          role: "IT Intern",
          period: "Jan 2022 — Nov 2022",
          summary: "IT support for the municipality: networks, hardware, software and administrative systems.",
          highlights: [
            "Network and hardware support",
            "Support for software and the municipality's administrative systems",
          ],
        },
      ],
      education: [
        {
          course: "Bachelor's Degree in Software Engineering",
          institution: "UTFPR",
          period: "2020 — 2025",
        },
        {
          course: "Technical Diploma in Computer Networks",
          institution: "SENAI/SC",
          period: "2016 — 2018",
        },
      ],
    },
    skills: {
      eyebrow: "Technologies",
      title: "Technical skills",
      groups: [
        {
          label: "Backend",
          items: ["Node.js", "NestJS", "TypeScript", "Express", "REST + OpenAPI", "gRPC", "Microservices", "WebSocket / Socket.IO", "RabbitMQ", "Redis", "BullMQ", "JWT / Passport", "Webhooks"],
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
          label: "Data",
          items: ["SQL", "PostgreSQL", "MongoDB (Mongoose)", "Python (FastAPI, Flask)", "BigQuery", "Athena"],
        },
        {
          label: "Quality",
          items: ["Jest", "Supertest", "Vitest", "Playwright", "Pino", "Prometheus", "OpenTelemetry"],
        },
        {
          label: "Also",
          items: ["Java (intermediate)", "Machine Learning (intermediate)", "React Native (intermediate)", "C# / .NET (intermediate)", "Vue", "Ruby on Rails", "Go", "IoT (MQTT, RTSP)", "AI: LLMs and agents (Claude Code)"],
        },
      ],
    },
  },

  flagships: {
    marker: { code: "//02.00", name: "SEC_PROJECTS", position: "02/05", indexLabel: "INDEX" },
    eyebrow: "Architecture showcase",
    title: "Featured projects",
    description:
      "Platforms I designed and built in a professional context, plus personal projects.",
    flagship: {
      badge: "Main platform",
      context: "Supernova Gaming · 2025–2026",
      title: "Multi-tenant gamification service",
      description:
        "Event-driven service for missions, tournaments and rewards on iGaming platforms with millions of users, with service-to-service communication over gRPC and queues.",
      metrics: [
        { value: "Millions", label: "Of users" },
        { value: "gRPC", label: "Between services" },
        { value: "EDA", label: "Event-driven" },
        { value: "Multi", label: "Tenant / white-label" },
      ],
      stackLabel: "Platform capabilities",
      tagsLabel: "Tags",
      stackNote:
        "The layers describe the platform's functional capabilities, not necessarily independent services.",
      layers: [
        {
          id: "l1",
          code: "L1",
          name: "Missions",
          headline: "Rules, progress and completion",
          body: "Missions configurable per operation, with progress rules calculated from each player's game events.",
          specs: [
            { label: "Role", value: "Engagement" },
            { label: "Focus", value: "Rules" },
          ],
          tags: ["Missions", "Rules", "Events"],
        },
        {
          id: "l2",
          code: "L2",
          name: "Tournaments",
          headline: "Competitions and rankings",
          body: "Tournaments with rankings updated as events arrive, for competition between players.",
          specs: [
            { label: "Role", value: "Competition" },
            { label: "Focus", value: "Rankings" },
          ],
          tags: ["Tournaments", "Rankings", "Redis"],
        },
        {
          id: "l3",
          code: "L3",
          name: "Rewards",
          headline: "Prize granting and control",
          body: "Reward granting when missions and tournaments are completed, with controls ensuring each prize is delivered exactly once.",
          specs: [
            { label: "Role", value: "Reward" },
            { label: "Focus", value: "Consistency" },
          ],
          tags: ["Rewards", "Idempotency", "BullMQ"],
        },
        {
          id: "l4",
          code: "L4",
          name: "Segmentation",
          headline: "The right players for each action",
          body: "Player segmentation to target missions, tournaments and engagement strategies by profile.",
          specs: [
            { label: "Role", value: "Segmentation" },
            { label: "Focus", value: "Engagement" },
          ],
          tags: ["Segments", "Profiles", "Engagement"],
        },
        {
          id: "l5",
          code: "L5",
          name: "Messaging",
          headline: "Asynchronous events and decoupling",
          body: "Service communication through events and queues, so volume spikes and isolated failures do not propagate.",
          specs: [
            { label: "Role", value: "Distribution" },
            { label: "Focus", value: "Decoupling" },
          ],
          tags: ["RabbitMQ", "gRPC", "Queues"],
        },
        {
          id: "l6",
          code: "L6",
          name: "Integrations",
          headline: "Real time with partner platforms",
          body: "WebSocket and webhook integrations, letting the same solution serve several operations (multi-tenant).",
          specs: [
            { label: "Role", value: "Integration" },
            { label: "Focus", value: "Real time" },
          ],
          tags: ["WebSocket", "Webhooks", "Multi-tenant"],
        },
        {
          id: "l7",
          code: "L7",
          name: "Observability",
          headline: "Logs, metrics and tracing",
          body: "End-to-end visibility of the event flow to detect failures and bottlenecks quickly.",
          specs: [
            { label: "Role", value: "Operations" },
            { label: "Focus", value: "Visibility" },
          ],
          tags: ["Pino", "Prometheus", "OpenTelemetry"],
        },
      ],
    },
    projects: [
      {
        eyebrow: "Project · white-label",
        title: "White-label SaaS for raffles and gamification",
        description:
          "Multi-tenant platform in a monorepo: each operation gets its own brand on top of the same codebase.",
        details: [
          "Multi-tenant / white-label architecture",
          "Backend in NestJS and frontend in Next.js",
          "CI/CD with GitHub Actions",
        ],
        tech: ["NestJS", "Next.js", "PostgreSQL", "GitHub Actions"],
      },
      {
        eyebrow: "Project · real time",
        title: "Online Queue",
        description:
          "Real-time queue monitoring that connects queue tickets to any platform and notifies the user when their turn comes.",
        details: [
          "Ticket integration with any platform",
          "User notification when their turn arrives",
          "End-to-end MERN stack",
        ],
        tech: ["MongoDB", "Express", "React", "Node.js"],
      },
    ],
  },

  matrix: {
    marker: { code: "//03.00", name: "SEC_SYSTEMS", position: "03/05", indexLabel: "INDEX" },
    eyebrow: "Engineering index",
    title: "Systems Matrix",
    description:
      "Systems from my professional experience and personal projects, each with its real context.",
    filterLabel: "Filter systems by area",
    allLabel: "All systems",
    categories: [
      { id: "distributed", label: "Distributed systems" },
      { id: "cloud", label: "Cloud & platform" },
      { id: "realtime", label: "Real time" },
      { id: "product", label: "Frontend & product" },
    ],
    systems: [
      {
        id: "gamification",
        categories: ["distributed", "cloud"],
        title: "Multi-tenant gamification service",
        description:
          "Event-driven missions, tournaments and rewards, with gRPC, RabbitMQ and Redis.",
        meta: [
          { label: "Context", value: "Supernova Gaming" },
          { label: "Status", value: "Professional experience" },
        ],
      },
      {
        id: "minigames",
        categories: ["product"],
        title: "Minigames and player experience",
        description:
          "React/Next.js interfaces and PixiJS minigames for the player experience.",
        meta: [
          { label: "Context", value: "Supernova Gaming" },
          { label: "Status", value: "Professional experience" },
        ],
      },
      {
        id: "white-label",
        categories: ["cloud", "product"],
        title: "White-label raffle SaaS",
        description:
          "Multi-tenant platform in a monorepo with NestJS, Next.js, PostgreSQL and GitHub Actions.",
        meta: [
          { label: "Type", value: "Project" },
          { label: "Status", value: "White-label" },
        ],
      },
      {
        id: "engagement-apis",
        categories: ["realtime", "distributed"],
        title: "Real-time engagement APIs",
        description:
          "Backend services and real-time integrations for gamification and player engagement.",
        meta: [
          { label: "Context", value: "Ana Gaming · Growth" },
          { label: "Status", value: "Professional experience" },
        ],
      },
      {
        id: "online-queue",
        categories: ["realtime", "product"],
        title: "Online Queue",
        description: "Real-time queue monitoring with user notifications (MERN).",
        meta: [
          { label: "Type", value: "Personal project" },
          { label: "Status", value: "MERN" },
        ],
      },
      {
        id: "freelance-apps",
        categories: ["product"],
        title: "Web and desktop applications",
        description: "Client applications with MERN and Electron.js: APIs and responsive interfaces.",
        meta: [
          { label: "Context", value: "Upwork" },
          { label: "Status", value: "Freelance" },
        ],
      },
    ],
  },

  contact: {
    marker: { code: "//04.00", name: "SEC_CONTACT", position: "04/05", indexLabel: "INDEX" },
    eyebrow: "Direct contact",
    headline: ["Let's build", "something extraordinary."],
    body: "Open to full stack, backend or frontend roles, remote. I reply by email or LinkedIn.",
    email: "w.hiroshi.fkd@gmail.com",
    copyLabel: "Copy email",
    copiedLabel: "Copied!",
    socialsLabel: "Social profiles",
    copyErrorLabel: "Copy failed — select the address",
    cv: {
      label: "Download CV (PDF)",
      href: "/cv/Willian-Hiroshi-CV-EN.pdf",
      alternate: { label: "Versão em português", href: "/cv/Willian-Hiroshi-CV-PT.pdf", lang: "pt-BR" },
    },
    socials: [
      { platform: "github", label: "GitHub", href: "https://github.com/fkdhiro" },
      { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/w-hiroshi" },
    ],
  },

  footer: {
    copyright: "© 2026 Willian Hiroshi",
    signature: "Full stack engineering · Londrina, PR · remote",
    build: "//05.00 SEC_END [05/05]",
  },
};
