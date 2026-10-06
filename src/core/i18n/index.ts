export const LOCALES = ['pt-br', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt-br';

export const HTML_LANG: Record<Locale, string> = { 'pt-br': 'pt-BR', en: 'en' };

/** Path of a route in a given locale: pt-br has no prefix, others use /<locale>/. */
export function localizedPath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return `${prefix}/${clean}${clean ? '/' : ''}`.replace(/\/{2,}/g, '/');
}
