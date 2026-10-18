const KEY = 'eduassets-theme';
type Theme = 'light' | 'dark';

const root = document.documentElement;
const media = window.matchMedia('(prefers-color-scheme: dark)');

const current = (): Theme => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

function apply(theme: Theme) {
  root.setAttribute('data-theme', theme);
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    const dark = theme === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', (dark ? btn.dataset.labelToLight : btn.dataset.labelToDark) ?? '');
    btn.title = btn.getAttribute('aria-label') ?? '';
  });
}

function saved(): Theme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

apply(current());

document.querySelectorAll('[data-theme-toggle]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const next: Theme = current() === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch { /* storage unavailable: theme still applies for this page */ }
  }),
);

// Without an explicit choice, follow the operating system live.
media.addEventListener('change', (e) => {
  if (!saved()) apply(e.matches ? 'dark' : 'light');
});
