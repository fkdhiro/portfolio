/** Prefixo de deploy em subpasta (ex.: GitHub Pages "/portfolio"); vazio na raiz. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixa caminhos absolutos do site (/images/..., /cv/...) com o basePath. */
export const withBase = (path: string) =>
  path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
