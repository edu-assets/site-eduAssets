# Editando o site no Astro

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Qualquer texto da landing (pt-BR) | `src/features/landing/content/pt-br.ts` |
| Texto em inglês | `src/features/landing/content/en.ts` |
| Ordem das seções | `src/features/landing/LandingPage.astro` |
| HTML de uma seção | `src/features/landing/sections/<Secao>.astro` |
| Catálogo e diálogo de documentação | `src/features/landing/sections/Docs.astro` e `src/features/landing/content/{pt-br,en}.ts` |
| Leitor Markdown no cliente | `src/features/landing/sections/docs-modal.ts` |
| Estilos responsivos do leitor | `src/styles/components/docs-modal.css` |
| Origem da documentação | `src/core/config/site.ts` (`DOCS_BASE_URL`) |
| Links, URL do app e do GitHub | `src/core/config/site.ts` |
| Título, descrição, canonical, hreflang, Open Graph | `src/layouts/BaseLayout.astro` |
| Cabeçalho, rodapé, botão, ícone, moldura de screenshot | `src/shared/components/*.astro` |
| Cores e fontes (geradas do app, não editar diretamente) | `src/styles/base/tokens.css` via `npm run sync:tokens` |
| Estilos | `src/styles/{base,components,layout}/*.css`, importados em `src/styles/styles.css` |
| Screenshots | `src/assets/screenshots/` (veja o README da pasta) |
| Headers de segurança e cache | `vercel.json` |
| Conteúdo canônico dos guias | repositório `edu-assets/docs-eduassets`, publicado em `https://docs.eduassets.tech` |

## Como funciona

- O bloco entre `---` de um arquivo `.astro` roda no build (imports, props e lógica); o HTML abaixo vira HTML estático.
- Props são declaradas em `interface Props` e lidas de `Astro.props`. `<slot />` recebe conteúdo filho.
- CSS é composto por arquivos comuns importados em `src/styles/styles.css`; não há CSS-in-JS nem framework.
- A landing é HTML estático por padrão. O leitor documental é uma exceção com `<script>` cliente em `docs-modal.ts`, empacotado pelo Astro.
- O leitor carrega Markdown público de `https://docs.eduassets.tech/docs`, renderiza com Marked e sanitiza a saída com DOMPurify. Não remova a sanitização nem inclua conteúdo de documentos por interpolação HTML sem sanitização.
- A CSP em `vercel.json` precisa permitir `connect-src https://docs.eduassets.tech`; não use `*` como atalho. O host de API não é necessário ao site.
- Imagens com `<Image />` de `astro:assets` são otimizadas e recebem dimensões.

## Catálogo e navegação da documentação

Os cards PT-BR/EN e seus filenames ficam em `src/features/landing/content/{pt-br,en}.ts`. O leitor não mantém outra cópia Markdown: a fonte canônica está no repositório `docs-eduassets`. Ao adicionar um documento, confirme que o arquivo foi publicado em `/docs/`, atualize as duas listas de cards e, se ele precisar de links Markdown internos tratados dentro do diálogo, inclua o filename em `technicalFiles` de `Docs.astro`.

## Ícones Material Symbols

Use `<Icon name="..." />` ou `icon: '...'`. A fonte `public/fonts/material-symbols-outlined.woff2` é um subset local; nomes de ícone inseridos dinamicamente precisam constar da lista explícita em `scripts/subset-icons.py` (por exemplo, `content_copy`, usado pelo leitor para copiar blocos de código). Regere o subset com a fonte completa:

```bash
npm run sync:icons -- /caminho/para/material-symbols-outlined.woff2
```

O script usa `fonttools` e `brotli` no ambiente Python.

## Validação

```bash
npm run check
npm run build
```

`astro check` valida o projeto e o build gera as rotas estáticas. Não há verificador automatizado de links configurado; revise separadamente a disponibilidade dos arquivos em `docs.eduassets.tech` e os links internos dos documentos.

## Por que Astro (e não HTML/CSS/JS puro)

- **Desempenho:** HTML estático; JavaScript limitado a interações como o leitor de documentação.
- **Reuso sem runtime:** componentes (`Section`, `IconBadge`, `Screenshot`) evitam duplicar marcação e somem no build.
- **Conteúdo separado do HTML:** textos tipados em `content/*.ts`; PT-BR e EN usam a mesma página.
- **Artigos:** coleções com Markdown/MDX e schema validado, sitemap e RSS.
- **Imagens e SEO:** otimização de imagens, canonical, hreflang e JSON-LD centralizados no layout.

Custo: exige Node e `npm run build` (não abre direto por `file://` nem Live Server). Para um site sem artigos ou interação, HTML puro bastaria; o conteúdo editorial e os recursos do portfólio justificam Astro. Não foi adicionado framework de UI (React/Vue/Tailwind).
