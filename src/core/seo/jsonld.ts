import { APP_URL, GITHUB_URL, SITE_NAME, SITE_URL } from '../config/site';

export function softwareApplicationJsonLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: ['pt-BR', 'en'],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        sameAs: [GITHUB_URL],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: SITE_NAME,
        description,
        url: APP_URL,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}
