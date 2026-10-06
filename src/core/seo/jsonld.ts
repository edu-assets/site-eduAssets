import { APP_URL, GITHUB_URL, SITE_NAME, SITE_URL } from '../config/site';

export function softwareApplicationJsonLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    description,
    url: SITE_URL,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    sameAs: [GITHUB_URL],
    installUrl: APP_URL,
  };
}
