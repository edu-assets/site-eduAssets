import DOMPurify from 'dompurify';
import { marked } from 'marked';

type DocButtonData = { file: string; title: string; icon: string; category: string };
type HeadingData = { id: string; title: string; level: number };
type LoadedDoc = { markdown: string; html: string; headings: HeadingData[] };

const dialog = document.querySelector<HTMLDialogElement>('#docs-reader');
if (dialog) {
  const locale = dialog.dataset.locale === 'en' ? 'en' : 'pt-br';
  const baseUrl = (dialog.dataset.docsBase ?? 'https://docs.eduassets.tech/docs').replace(/\/+$/, '');
  const repositoryUrl = (dialog.dataset.docsRepo ?? 'https://github.com/edu-assets/docs-eduassets').replace(/\/+$/, '');
  const technicalFiles = new Set<string>(JSON.parse(dialog.dataset.technicalFiles ?? '[]'));
  const ui = locale === 'en' ? {
    loading: 'Loading document…', error: 'Could not load this document. Check your connection and try again.',
    searchLoading: 'Searching documents…', noResults: 'No results found.', copy: 'Copy code', copied: 'Code copied.',
    copyFailed: 'Could not copy code.', general: 'General', technical: 'Technical',
  } : {
    loading: 'Carregando documento…', error: 'Não foi possível carregar este documento. Verifique sua conexão e tente novamente.',
    searchLoading: 'Buscando nos documentos…', noResults: 'Nenhum resultado encontrado.', copy: 'Copiar código',
    copied: 'Código copiado.', copyFailed: 'Não foi possível copiar o código.', general: 'Geral', technical: 'Técnico',
  };

  const nav = dialog.querySelector<HTMLElement>('.docs-reader__nav-list')!;
  const content = dialog.querySelector<HTMLElement>('[data-doc-content]')!;
  const status = dialog.querySelector<HTMLElement>('[data-doc-status]')!;
  const categoryEl = dialog.querySelector<HTMLElement>('[data-doc-category]')!;
  const fileEl = dialog.querySelector<HTMLElement>('[data-doc-filename]')!;
  const sourceLink = dialog.querySelector<HTMLAnchorElement>('[data-doc-source]')!;
  const headingEl = dialog.querySelector<HTMLElement>('[data-doc-heading]')!;
  const toc = dialog.querySelector<HTMLElement>('[data-doc-toc]')!;
  const search = dialog.querySelector<HTMLInputElement>('#docs-reader-search')!;
  const results = dialog.querySelector<HTMLElement>('#docs-reader-results')!;
  const docs: DocButtonData[] = Array.from(nav.querySelectorAll<HTMLElement>('[data-doc-select]')).map((button) => ({
    file: button.dataset.docFile ?? '',
    title: button.dataset.docTitle ?? '',
    icon: button.dataset.docIcon ?? 'description',
    category: button.dataset.category ?? '',
  }));
  const cache = new Map<string, LoadedDoc>();
  const inflight = new Map<string, Promise<LoadedDoc>>();
  let activeFile = '';
  let searchSequence = 0;

  marked.setOptions({ gfm: true, breaks: false });

  const documentUrl = (file: string) => `${baseUrl}/${encodeURIComponent(file)}`;
  const sourceFileUrl = (file: string) => `${repositoryUrl}/blob/main/public/docs/${encodeURIComponent(file)}`;
  const normalize = (value: string) => value.toLocaleLowerCase(locale).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const slugify = (value: string) => normalize(value).replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

  async function loadDoc(file: string): Promise<LoadedDoc> {
    const cached = cache.get(file);
    if (cached) return cached;
    const ongoing = inflight.get(file);
    if (ongoing) return ongoing;

    const request = (async () => {
      const response = await fetch(documentUrl(file));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();
      const parsed = await marked.parse(markdown);
      const safeHtml = DOMPurify.sanitize(parsed, { USE_PROFILES: { html: true } });
      const template = document.createElement('template');
      template.innerHTML = safeHtml;

      const headings: HeadingData[] = [];
      const headingCount = new Map<string, number>();
      template.content.querySelectorAll<HTMLElement>('h2, h3').forEach((heading) => {
        const headingTitle = (heading.textContent ?? '').trim();
        const baseId = slugify(headingTitle) || 'section';
        const count = headingCount.get(baseId) ?? 0;
        headingCount.set(baseId, count + 1);
        const id = count ? `${baseId}-${count}` : baseId;
        heading.id = id;
        headings.push({ id, title: headingTitle, level: Number(heading.tagName.slice(1)) });
      });

      template.content.querySelectorAll<HTMLPreElement>('pre').forEach((pre) => {
        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'docs-reader__copy';
        copy.dataset.copyCode = '';
        copy.setAttribute('aria-label', ui.copy);
        copy.title = ui.copy;
        copy.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">content_copy</span>';
        pre.prepend(copy);
      });

      template.content.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
        const href = anchor.getAttribute('href') ?? '';
        if (/^https?:\/\//i.test(href)) {
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
        } else if (/\.md(?:#.*)?$/i.test(href)) {
          const path = href.split(/[?#]/, 1)[0] ?? '';
          const linkedFile = path.split('/').pop() ?? '';
          const known = docs.find((doc) => doc.file.toLowerCase() === linkedFile.toLowerCase());
          if (known) {
            anchor.dataset.docLink = known.file;
            anchor.href = '#';
            anchor.setAttribute('aria-label', `${known.title} — ${anchor.textContent?.trim() || known.title}`);
          } else {
            anchor.href = sourceFileUrl(linkedFile || path);
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
          }
        }
      });

      const loaded = { markdown, html: template.innerHTML, headings };
      cache.set(file, loaded);
      return loaded;
    })();
    inflight.set(file, request);
    try { return await request; }
    finally { inflight.delete(file); }
  }

  function setActive(file: string): void {
    nav.querySelectorAll<HTMLElement>('[data-doc-select]').forEach((button) => {
      const active = button.dataset.docFile === file;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-current', active ? 'page' : 'false');
    });
  }

  function renderToc(headings: HeadingData[]): void {
    toc.replaceChildren();
    toc.hidden = headings.length === 0;
    headings.forEach((heading) => {
      const link = document.createElement('a');
      link.className = `docs-reader__toc-link${heading.level === 3 ? ' is-nested' : ''}`;
      link.href = `#${heading.id}`;
      link.textContent = heading.title;
      link.dataset.tocTarget = heading.id;
      toc.append(link);
    });
  }

  async function openDocument(file: string, title?: string): Promise<void> {
    const doc = docs.find((item) => item.file === file);
    if (!doc) return;
    activeFile = file;
    setActive(file);
    headingEl.textContent = title || doc.title;
    categoryEl.textContent = technicalFiles.has(file) ? ui.technical : ui.general;
    fileEl.textContent = file;
    sourceLink.href = sourceFileUrl(file);
    content.replaceChildren();
    toc.replaceChildren();
    toc.hidden = true;
    status.hidden = false;
    delete status.dataset.state;
    status.textContent = ui.loading;

    try {
      const loaded = await loadDoc(file);
      if (activeFile !== file) return;
      const template = document.createElement('template');
      template.innerHTML = loaded.html;
      content.replaceChildren(template.content.cloneNode(true));
      content.scrollTop = 0;
      status.hidden = true;
      status.textContent = '';
      renderToc(loaded.headings);
    } catch {
      if (activeFile !== file) return;
      status.hidden = false;
      status.textContent = ui.error;
      status.dataset.state = 'error';
    }
  }

  function closeSearch(): void {
    results.hidden = true;
    results.replaceChildren();
    search.setAttribute('aria-expanded', 'false');
  }

  function makeSnippet(text: string, index: number): string {
    const start = Math.max(0, index - 58);
    const end = Math.min(text.length, index + 92);
    return `${start ? '…' : ''}${text.slice(start, end).replace(/\s+/g, ' ').trim()}${end < text.length ? '…' : ''}`;
  }

  async function searchDocuments(query: string): Promise<void> {
    const sequence = ++searchSequence;
    const term = normalize(query.trim());
    if (!term) {
      closeSearch();
      return;
    }
    results.hidden = false;
    results.replaceChildren();
    search.setAttribute('aria-expanded', 'true');
    const loading = document.createElement('p');
    loading.className = 'docs-reader__empty';
    loading.textContent = ui.searchLoading;
    results.append(loading);

    const loaded = await Promise.all(docs.map(async (doc) => {
      try { return { doc, data: await loadDoc(doc.file) }; } catch { return null; }
    }));
    if (sequence !== searchSequence || normalize(search.value.trim()) !== term) return;

    const matches = loaded.flatMap((entry) => {
      if (!entry) return [];
      const titleMatch = normalize(entry.doc.title).includes(term);
      const text = normalize(entry.data.markdown);
      const index = text.indexOf(term);
      if (!titleMatch && index < 0) return [];
      const rawIndex = index < 0 ? 0 : index;
      return [{ doc: entry.doc, snippet: titleMatch && index < 0 ? entry.doc.category : makeSnippet(entry.data.markdown, rawIndex) }];
    });

    results.replaceChildren();
    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'docs-reader__empty';
      empty.textContent = ui.noResults;
      results.append(empty);
      return;
    }
    matches.forEach(({ doc, snippet }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'docs-reader__result';
      button.dataset.resultFile = doc.file;
      const icon = document.createElement('span');
      icon.className = 'material-symbols-outlined';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = doc.icon;
      const body = document.createElement('span');
      body.className = 'docs-reader__result-body';
      const name = document.createElement('strong');
      name.textContent = doc.title;
      const excerpt = document.createElement('span');
      excerpt.textContent = snippet;
      body.append(name, excerpt);
      button.append(icon, body);
      results.append(button);
    });
  }

  function preloadAll(): void {
    void Promise.all(docs.map((doc) => loadDoc(doc.file).catch(() => null)));
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const opener = target.closest<HTMLElement>('[data-doc-open]');
    if (opener) {
      const file = opener.dataset.docFile ?? '';
      const title = opener.dataset.docTitle ?? '';
      if (!dialog.open) dialog.showModal();
      void openDocument(file, title);
      preloadAll();
      return;
    }

    const closeButton = target.closest('[data-doc-close]');
    if (closeButton) {
      dialog.close();
      return;
    }

    const sidebarButton = target.closest<HTMLElement>('[data-doc-select]');
    if (sidebarButton) {
      closeSearch();
      void openDocument(sidebarButton.dataset.docFile ?? '', sidebarButton.dataset.docTitle);
      return;
    }

    const resultButton = target.closest<HTMLElement>('[data-result-file]');
    if (resultButton) {
      closeSearch();
      search.value = '';
      void openDocument(resultButton.dataset.resultFile ?? '');
      return;
    }

    const tocLink = target.closest<HTMLAnchorElement>('[data-toc-target]');
    if (tocLink) {
      event.preventDefault();
      content.querySelector(`#${CSS.escape(tocLink.dataset.tocTarget ?? '')}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const markdownLink = target.closest<HTMLAnchorElement>('[data-doc-link]');
    if (markdownLink) {
      event.preventDefault();
      void openDocument(markdownLink.dataset.docLink ?? '');
      return;
    }

    const copyButton = target.closest<HTMLButtonElement>('[data-copy-code]');
    if (copyButton) {
      const code = copyButton.closest('pre')?.querySelector('code')?.textContent ?? '';
      void navigator.clipboard.writeText(code).then(() => {
        status.hidden = false;
        status.dataset.state = 'success';
        status.textContent = ui.copied;
        window.setTimeout(() => { if (status.dataset.state === 'success') status.hidden = true; }, 1800);
      }).catch(() => {
      status.hidden = false;
      status.dataset.state = 'error';
        status.textContent = ui.copyFailed;
      });
    }
  });

  search.addEventListener('input', () => { void searchDocuments(search.value); });
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSearch();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    search.value = '';
    closeSearch();
  });
}
