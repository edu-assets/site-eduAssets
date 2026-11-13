import pkg from '../../../../package.json';

/** Product version shown on the landing page. Single source: site/package.json (kept in sync by app: npm run version:set). */
export const PRODUCT_VERSION: string = pkg.version;
