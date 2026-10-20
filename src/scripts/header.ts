const header = document.querySelector<HTMLElement>('.site-header');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('mobile-menu');

// Discreet background/border only after the page starts scrolling.
function onScroll() {
  header?.toggleAttribute('data-at-top', window.scrollY < 8);
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

function setMenu(open: boolean, returnFocus = false) {
  if (!toggle || !menu) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '');
  menu.hidden = !open;
  header?.toggleAttribute('data-menu-open', open);
  if (returnFocus) toggle.focus();
}

toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('click', (e) => {
  if (toggle?.getAttribute('aria-expanded') === 'true' && !header?.contains(e.target as Node)) setMenu(false);
});
window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

// Language switch: keep the reading position across / and /en/.
// Sections share the same ids in both locales, but text heights differ,
// so we store "which section + how far into it" instead of raw pixels.
const SCROLL_KEY = 'eduassets-lang-scroll';
type ScrollAnchor = { id: string; ratio: number } | { y: number };

function captureScroll(): ScrollAnchor {
  const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
  const current = sections.filter((s) => s.getBoundingClientRect().top <= 0).pop();
  if (!current) return { y: window.scrollY }; // still in the hero
  const rect = current.getBoundingClientRect();
  return { id: current.id, ratio: -rect.top / rect.height };
}

function restoreScroll() {
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(SCROLL_KEY);
    sessionStorage.removeItem(SCROLL_KEY);
  } catch { /* ignore */ }
  if (!raw) return;

  const anchor = JSON.parse(raw) as ScrollAnchor;
  let top = 0;
  if ('id' in anchor) {
    const el = document.getElementById(anchor.id);
    if (!el) return;
    top = el.getBoundingClientRect().top + window.scrollY + anchor.ratio * el.offsetHeight;
  } else {
    top = anchor.y;
  }
  // 'instant' overrides the global scroll-behavior: smooth, so there is no visible scrolling.
  window.scrollTo({ top, behavior: 'instant' });
}

restoreScroll();

document.querySelectorAll<HTMLAnchorElement>('.lang-switch a').forEach((a) =>
  a.addEventListener('click', () => {
    try { sessionStorage.setItem(SCROLL_KEY, JSON.stringify(captureScroll())); } catch { /* ignore */ }
  }),
);
