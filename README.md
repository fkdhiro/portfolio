# Portfólio — Akiyuki Miyama

Next.js (App Router) + TypeScript + Tailwind CSS, exportado como **site estático** (`out/`).

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera o site estático em `out/` |
| `npm start` | Pré-visualiza `out/` em http://localhost:4000 (gzip + cache, como no Netlify) |
| `npm run lint` | ESLint |
| `npm run images` | Regera as versões da foto a partir de `assets/portrait-source.png` |

Adicione `?replayIntro=1` à URL para rever a abertura sem recarregar o cache.

## Publicar no Netlify

**Arrastar e soltar (Netlify Drop):** `npm run build`, compacte o **conteúdo** de `out/` (com `index.html` na raiz) e arraste o `.zip` ou a pasta `out/` em https://app.netlify.com/drop.

**Via Git:** conecte o repositório. O `netlify.toml` já define `npm run build` e a pasta `out`.

`public/_headers` define cache longo para os arquivos com hash e cabeçalhos de segurança.

## Onde editar

- **Conteúdo (textos, experiências, projetos, métricas, e-mail, redes):** `src/data/portfolio.ts`
- **Foto:** substitua `assets/portrait-source.png` e rode `npm run images`
- **Animação (tempos, quantidade de cursores, perfis por dispositivo):** `src/components/animation/animationTimeline.ts` e `cursorPaths.ts`
- Links sociais com `href: null` não aparecem — preencha só com URLs reais.
