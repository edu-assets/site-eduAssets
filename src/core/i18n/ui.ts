import type { Locale } from './index';

/** Labels for site chrome (navbar, theme and language controls). Page copy lives in features/landing/content. */
export const ui: Record<Locale, {
  mainNav: string; openMenu: string; closeMenu: string;
  toDark: string; toLight: string;
  language: string; langNames: { 'pt-br': string; en: string };
}> = {
  'pt-br': {
    mainNav: 'Navegação principal', openMenu: 'Abrir menu', closeMenu: 'Fechar menu',
    toDark: 'Ativar tema escuro', toLight: 'Ativar tema claro',
    language: 'Idioma', langNames: { 'pt-br': 'Português (Brasil)', en: 'English' },
  },
  en: {
    mainNav: 'Main navigation', openMenu: 'Open menu', closeMenu: 'Close menu',
    toDark: 'Switch to dark theme', toLight: 'Switch to light theme',
    language: 'Language', langNames: { 'pt-br': 'Português (Brasil)', en: 'English' },
  },
};
