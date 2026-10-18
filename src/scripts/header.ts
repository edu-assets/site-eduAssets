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
