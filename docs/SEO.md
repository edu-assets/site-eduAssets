# SEO, descoberta e publicação

Este documento registra as configurações mantidas no repositório do site público `eduassets.tech`. Ele não substitui configurações externas do Cloudflare, Search Console ou da hospedagem.

## URLs canônicas

- Português: `https://eduassets.tech/`
- Inglês: `https://eduassets.tech/en/`
- Aplicação: `https://app.eduassets.tech/` — não é incluída no sitemap do site institucional.
- API: `https://api.eduassets.tech/` — não é incluída no sitemap.

As páginas PT/EN usam canonicals próprios, `hreflang` recíproco e `x-default` apontando para a versão em português. O `robots.txt` público aponta para `https://eduassets.tech/sitemap.xml`, que referencia o sitemap gerado pelo Astro.

O host `app.eduassets.tech` é operacional e não deve aparecer na busca. O frontend da aplicação envia `X-Robots-Tag: noindex, nofollow, noarchive`, publica meta `robots` equivalente e mantém `robots.txt` com `Disallow: /`. Isso é uma política separada do `robots.txt` da landing page.

## Deploy e verificação local

```bash
npm ci
npm run check
npm run build
test -s dist/robots.txt
test -s dist/sitemap.xml
test -s dist/sitemap-0.xml
grep -Fq 'canonical' dist/index.html
grep -Fq 'hreflang="en"' dist/index.html
grep -Fq 'og:image' dist/index.html
```

O sitemap gerado pelo Astro pode conter as rotas públicas de artigos quando a coleção tiver conteúdo. Não adicione rotas autenticadas, a aplicação ou a API ao sitemap institucional.

## Google Search Console

1. Verifique `eduassets.tech`, preferencialmente por DNS no provedor que administra o domínio.
2. Envie `https://eduassets.tech/sitemap.xml`.
3. Use a inspeção de URL para `https://eduassets.tech/` e `https://eduassets.tech/en/`.
4. Confirme canonical, indexação, experiência da página e relatórios de segurança.
5. Repita a inspeção depois de cada publicação relevante e aguarde o novo rastreamento.

Se uma URL antiga da aplicação já aparecer nos resultados, publique primeiro a correção de `noindex`, confirme que o host responde com o header e depois use Search Console → Remoções → Nova solicitação para ocultar temporariamente a URL antiga. A remoção temporária não substitui o `noindex`; aguarde o recrawl para a remoção permanente.

## PageSpeed Insights e Bing

Teste as URLs PT e EN no PageSpeed Insights em mobile e desktop. Registre a data, URL, dispositivo e condições do teste; este repositório não afirma que os Core Web Vitals estão bons sem uma medição real.

O Bing Webmaster Tools é uma alternativa opcional. Se usado, verifique o mesmo domínio canônico e envie o mesmo sitemap.

## Analytics

Nenhum script de analytics é adicionado por padrão. Se um provedor for adotado, documente a ferramenta, a finalidade, os cookies/armazenamento usados, a base legal aplicável e o consentimento necessário antes da publicação.

Eventos úteis, sem coletar dados pessoais:

- clique no CTA da aplicação;
- clique no GitHub;
- troca de idioma;
- abertura da documentação.

## O que permanece externo

DNS, redirects HTTP/HTTPS, Cloudflare Pages, regras de cache, Search Console, Bing Webmaster Tools e qualquer configuração de analytics precisam ser verificados na plataforma correspondente. Não inclua credenciais, tokens, dados internos ou documentos operacionais privados em `public/`.
