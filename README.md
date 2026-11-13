# Portfólio — Willian Hiroshi

Portfólio de uma página, em Next.js (App Router), TypeScript e Tailwind CSS 4, exportado como **site estático** (`out/`).

Visual minimalista e sem animações, com modo claro e escuro seguindo o sistema. A página traz dados estruturados (JSON-LD `ProfilePage`/`Person`) para buscadores e ferramentas de triagem.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em http://localhost:3000 |
| `npm run build` | Gera o site estático em `out/` |
| `npm start` | Pré-visualiza `out/` em http://localhost:4000 (gzip + cache, como no Netlify) |
| `npm run lint` | ESLint |

## Onde editar

- **Todo o conteúdo** (textos, experiências, projetos, competências, formação, contato): `src/data/portfolio.ts`. O JSON-LD e os metadados também saem dele.
- **Domínio:** troque `siteUrl` em `src/data/portfolio.ts` quando houver um.
- **Cores e tipografia:** `src/app/globals.css` (tokens em `@theme`)
- **Estrutura da página:** `src/app/page.tsx`, `src/components/`

## Publicar no Netlify

- **Arrastar e soltar (Netlify Drop):** rode `npm run build` e arraste a pasta `out/` em https://app.netlify.com/drop.
- **Via Git:** conecte o repositório. O `netlify.toml` já define `npm run build` e a pasta `out`.

`public/_headers` define cache longo para os arquivos com hash e cabeçalhos de segurança.

## Origem

A estrutura do projeto (Next.js com export estático e configuração do Netlify) partiu de um clone de [Akiyuki89/portfolio](https://github.com/Akiyuki89/portfolio). O conteúdo e o visual foram reescritos.
