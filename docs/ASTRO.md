# Editando o site no Astro

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Qualquer texto da landing (pt-BR) | `src/features/landing/content/pt-br.ts` |
| Texto em inglês | `src/features/landing/content/en.ts` |
| Ordem das seções | `src/features/landing/LandingPage.astro` |
| HTML de uma seção | `src/features/landing/sections/<Secao>.astro` |
| Links, URL do app e do GitHub | `src/core/config/site.ts` |
| Título, descrição, canonical, hreflang, Open Graph | `src/layouts/BaseLayout.astro` |
| Cabeçalho, rodapé, botão, ícone, moldura de screenshot | `src/shared/components/*.astro` |
| Cores e fontes (gerado do app, não edite) | `src/styles/base/tokens.css` via `npm run sync:tokens` |
| Estilos | `src/styles/{base,components,layout}/*.css`, importados em `src/styles/styles.css` |
| Screenshots | `src/assets/screenshots/` (veja o README da pasta) |
| Ícones | usar `<Icon name="..." />` ou `icon: '...'` e rodar `npm run sync:icons` |
| Artigos | `src/content/articles/<idioma>/<slug>.mdx` |
| Headers de segurança e cache | `vercel.json` |

## Como funciona
- `.astro` tem duas partes: o bloco entre `---` roda **no build** (imports, props, lógica) e o HTML abaixo vira HTML estático.
- Props: o componente declara `interface Props` e lê `Astro.props`. Exemplo: `Button.astro` recebe `href`, `variant`, `icon`.
- `<slot />` recebe o conteúdo filho (ver `Button.astro`, `Section.astro`).
- CSS é um conjunto de arquivos comuns importados em `styles.css`; não há CSS-in-JS nem framework.
- JavaScript: **nenhum** é enviado ao navegador hoje. Se precisar de interação, use `<script>` dentro do `.astro` (o Astro empacota) e mantenha a CSP `script-src 'self'`.
- Imagens: `<Image />` do `astro:assets` gera WebP em vários tamanhos e define largura/altura (evita layout shift).

### Ícones
Material Symbols, a mesma família do app. `public/fonts/material-symbols-outlined.woff2` é um subset com ~6 KB
com só os ícones usados. Ao adicionar um ícone:
```bash
pip install fonttools brotli
python3 scripts/subset-icons.py ../edu-assets/frontend/public/assets/fonts/material-symbols-outlined.woff2
```

## Por que Astro (e não HTML/CSS/JS puro)
- **Desempenho:** gera HTML estático e envia zero JavaScript por padrão. Ideal para SEO e para o LCP.
- **Reuso sem runtime:** componentes (`Section`, `IconBadge`, `Screenshot`) evitam copiar marcação, mas somem no build.
- **Conteúdo separado do HTML:** os textos ficam em `content/*.ts` tipados; pt-BR e EN usam a mesma página.
- **Artigos:** coleções com Markdown/MDX e schema validado, sitemap e RSS prontos. Em HTML puro seria manual.
- **Imagens e SEO:** otimização de imagens, canonical, hreflang e JSON-LD centralizados no layout.
- **Manutenção:** `astro check` valida tipos; o build falha se um link interno ou campo obrigatório quebrar.

Custo: exige Node e `npm run build` (não abre direto por `file://` nem Live Server). Para um site de uma página só
sem artigos, HTML puro bastaria. Aqui os artigos e o inglês justificam a escolha. Não foi adicionado nenhum
framework de UI (React/Vue/Tailwind): não há estado no cliente que os justifique.
