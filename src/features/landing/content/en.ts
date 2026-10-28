import type { LandingContent } from './types';

export const en: LandingContent = {
  lang: { href: '/', label: 'PT', title: 'Versão em português' },
  nav: { project: 'The project', problem: 'The problem', flow: 'Workflow', features: 'Features', differentials: 'Capabilities', access: 'Access', tech: 'Technology', docs: 'Documentation', profile: 'About the author' },
  hero: {
    eyebrow: 'v1.0 · Portfolio project',
    title: 'School equipment management',
    lead: 'eduAssets records who took what, keeps stock up to date, tracks maintenance and breakage, and exports reports as CSV, Excel and PDF.',
    primary: 'Open the system',
    secondary: 'View code on GitHub',
    note: 'Opens in Guest Mode: read-only, no sign-up.'
  },
  flow: {
    eyebrow: 'Loan workflow',
    title: 'From loan to return in four steps',
    lead: 'Each step updates stock immediately, so available stock is always the real one.',
    steps: [
      { icon: 'edit_note', title: 'Register', text: 'Enter the requester, the person responsible, date and time, and items with quantities.' },
      { icon: 'block', title: 'Validate stock', text: 'If available stock is not enough, the record is blocked.' },
      { icon: 'assignment_return', title: 'Return', text: 'From the open loans list, confirm the return with date and time. Items go back to stock.' },
      { icon: 'history', title: 'Check the history', text: 'Every loan stays on record with Open or Returned status.' },
    ],
  },
  features: {
    eyebrow: 'Features',
    title: 'Each panel has one job',
    rows: [
      {
        icon: 'swap_horiz',
        title: 'Loans and returns',
        text: 'Register loans with several items and process returns from the list of open loans.',
        points: [
          'Items can be edited before the return',
          'Race-condition-safe, atomic stock updates',
          'Optional note on every loan',
        ],
        shot: { key: 'emprestimos', label: 'Returns panel screenshot', alt: 'eduAssets Returns screen showing open loans, pending equipment and a panel to confirm a return.', caption: 'Returns: open loans and details for the selected record.', hint: 'Open loans list and details panel' },
      },
      {
        icon: 'dashboard',
        title: 'Stock dashboard and history',
        text: 'Total, available, on loan, in maintenance and broken items in summary cards. Stock is listed by category and the history shows every loan.',
        points: [
          'Search by category, requester, person responsible or number',
          'Detailed summary per category',
          'Export of stock and history',
        ],
        shot: { key: 'dashboard', label: 'Stock dashboard screenshot', alt: 'eduAssets Dashboard screen on the Stock tab, with equipment summary indicators and a category table showing total, available and broken quantities.', caption: 'Stock dashboard: summary indicators and equipment availability by category.', hint: 'Summary cards and Stock tab' },
      },
      {
        icon: 'report',
        title: 'Issue tracking',
        text: 'Record observations, maintenance and broken equipment. When you resolve a record, describe the fix and the item goes back to stock.',
        points: [
          'Observations do not change stock',
          'Maintenance and breakage remove the item from available stock',
          'History of resolved records, with the measures taken',
        ],
        shot: { key: 'controle', label: 'Issue tracking panel screenshot', alt: 'eduAssets Control screen with summary indicators for observations, maintenance and broken equipment, followed by an issue list.', caption: 'Control: indicators and records for observations, maintenance and breakage.', hint: 'Open and resolved records' },
      },
    ],
    effects: {
      title: 'Where each item goes',
      lead: 'Stock changes with every action, with no manual editing.',
      items: [
        { icon: 'arrow_outward', tone: 'primary', action: 'Loan', effect: 'Available → On loan' },
        { icon: 'assignment_return', tone: 'success', action: 'Return', effect: 'On loan → Available' },
        { icon: 'build', tone: 'warning', action: 'Maintenance', effect: 'Available → In maintenance' },
        { icon: 'heart_broken', tone: 'error', action: 'Breakage', effect: 'Available → Broken' },
        { icon: 'task_alt', tone: 'success', action: 'Resolve record', effect: 'Maintenance or broken → Available' },
      ],
    },
  },
  differentials: {
    eyebrow: 'Also included',
    title: 'Project features',
    lead: 'Beyond the panels, what the system offers in daily use.',
    items: [
      { icon: 'visibility', title: 'Guest Mode', text: 'Anyone can explore the system in read-only mode, with no sign-up.' },
      { icon: 'lock', title: 'Backend permissions', text: 'Access levels do not rely on the interface alone: every write route validates the token.' },
      { icon: 'inventory_2', title: 'Consistent stock', text: 'Atomic, transaction-scoped updates and a blocked record when stock is short.' },
      { icon: 'contactless', title: 'Optional RFID', text: 'Card login with a Raspberry Pi or Arduino Nano. Password login stays available.' },
      { icon: 'download', title: 'Export', text: 'Loan history and inventory as CSV, Excel or PDF.' },
      { icon: 'translate', title: 'Portuguese and English', text: 'Interface in both languages, with light, dark or system theme.' },
    ],
  },
  access: {
    eyebrow: 'Access and security',
    title: 'Three access levels',
    lead: 'Restrictions exist in the interface and are enforced by the backend too.',
    levels: [
      { icon: 'visibility', name: 'Guest', can: 'Enters without login. Views Dashboard, history and stock. Cannot create, edit or delete.' },
      { icon: 'edit', name: 'Editor', can: 'Registers loans, processes returns and creates or edits Control records.' },
      { icon: 'admin_panel_settings', name: 'Administrator', can: 'Full access: Registers, record deletion, password change and RFID cards.' },
    ],
    securityTitle: 'Protections',
    security: [
      'JWT authentication and bcrypt password hashing',
      'Security headers (helmet) and login rate limiting',
      'Every write request validated with Zod',
      'Administrator sessions expire after 30 minutes of inactivity',
    ],
  },
  rfid: {
    eyebrow: 'Optional hardware',
    title: 'RFID card login',
    lead: 'Users tap their card on the reader and sign in without typing a password.',
    video: { key: 'rfid-login', label: 'RFID reader demonstration', alt: 'Silent video showing a hand bringing an RFID tag and card close to a sensor wired to a small computer.', caption: 'RFID reader test: tags are brought close to a sensor connected to the computer.', hint: 'RFID tag and card brought close to the sensor' },
    photos: [
    { alt: 'RFID reader board wired to a Raspberry Pi on a workbench.', caption: 'RFID hardware: reader, wiring and small computer.' },
    { alt: 'Computer lab bench with eduAssets open on a monitor and the RFID reader setup on the desk.', caption: 'Test bench with eduAssets and the RFID reader setup.' },
  ],
    steps: [
      { icon: 'badge', title: 'Card provisioning', text: 'The administrator generates a token under Registers → Users and writes it to the card. The server stores only the hash.' },
      { icon: 'sensors', title: 'Reading', text: 'A Python service on a Raspberry Pi or Arduino Nano reads the card and sends the token to the backend.' },
      { icon: 'login', title: 'Login', text: 'The backend validates the token and notifies open tabs over WebSocket. The session starts by itself.' },
    ],
    note: 'The reader plays distinct tones for card detected, success and error. RFID is never required.',
  },
  project: {
    eyebrow: 'Portfolio project',
    title: 'From operational challenge to full-stack implementation',
    lead: 'A full-stack web system for managing school equipment inventory, loans, returns and incidents.',
    challenge: { icon: 'description', title: 'The challenge', text: 'Schools often manage laptops, tablets and accessories through scattered spreadsheets, making it difficult to know what is available, borrowed, under maintenance or broken.', photo: { alt: 'Cart with laptops stored in numbered compartments.', caption: 'The scenario the system organizes: numbered equipment, borrowed and returned every day.' }, questionsTitle: 'The dashboard answers, no spreadsheets needed:', questions: [
      { icon: 'inventory_2', text: 'How many items exist and how many are available?' },
      { icon: 'swap_horiz', text: 'What is on loan, and to whom?' },
      { icon: 'build', text: 'What is in maintenance?' },
      { icon: 'heart_broken', text: 'What is broken?' },
      { icon: 'history', text: 'What was lent and returned recently?' }
    ] },
    solution: { icon: 'task_alt', title: 'The solution', text: 'eduAssets centralizes inventory, loans, returns, incidents, permissions and report exports in a web application.' },
    scopeTitle: 'What was built',
    scope: [
      { icon: 'code', title: 'Frontend', text: 'TypeScript, Vite and feature-first architecture.' },
      { icon: 'dns', title: 'REST API', text: 'Node.js, Express 5, Prisma and Zod.' },
      { icon: 'database', title: 'Persistence', text: 'Managed PostgreSQL on Neon.' },
      { icon: 'lock', title: 'Authentication', text: 'JWT and session control.' },
      { icon: 'admin_panel_settings', title: 'Permissions', text: 'Access levels for different responsibilities.' },
      { icon: 'description', title: 'Reports', text: 'CSV, Excel and PDF exports.' },
      { icon: 'contactless', title: 'Optional RFID', text: 'Integration with Raspberry Pi or Arduino Nano.' },
      { icon: 'fact_check', title: 'Quality', text: 'Unit and integration tests.' },
      { icon: 'cloud_done', title: 'Delivery', text: 'CI/CD, application and API deployment, and operational documentation.' }
    ],
    decisionsTitle: 'Architecture decisions',
    decisions: [
      { icon: 'database', title: 'Why is the database on Neon?', text: 'The Oracle VM has only 1 GB of RAM. Keeping PostgreSQL managed reduces memory usage, simplifies backups and separates database availability from the API machine.' },
      { icon: 'cloud', title: 'Why separate the frontend from the API?', text: 'The static frontend can be served globally by Cloudflare Pages, while the API remains on a VM with independent operational control.' },
      { icon: 'visibility', title: 'Why include Guest Mode?', text: 'To allow immediate evaluation and interaction without creating accounts or exposing administrator credentials.' },
      { icon: 'contactless', title: 'Why is RFID optional?', text: 'The system remains useful with conventional login and can receive hardware when hosted locally or when operations justify the investment.' }
    ]
  },
  tech: {
    eyebrow: 'Technology',
    title: 'Stack',
    rows: [
      { icon: 'web', area: 'Frontend', items: 'TypeScript, Vite, feature-first architecture, CSS custom properties' },
      { icon: 'dns', area: 'Backend', items: 'Node.js, Express 5, Prisma, Zod' },
      { icon: 'database', area: 'Database', items: 'Managed PostgreSQL on Neon' },
      { icon: 'memory', area: 'Optional hardware', items: 'Python, Raspberry Pi or Arduino Nano, RFID reader' },
      { icon: 'cloud', area: 'Hosting', items: 'Cloudflare Pages for the frontend, Oracle Cloud VM with Docker and Nginx for the API' },
    ],
  },
  docs: {
    eyebrow: 'Documentation',
    title: 'Project guides',
    lead: 'Browse the user, architecture, API, development, deployment, hosting and operations guides.',
    items: [
      { icon: 'description', title: 'README', file: 'README.md' },
      { icon: 'menu_book', title: 'User manual', file: 'USER_MANUAL.md' },
      { icon: 'architecture', title: 'Architecture', file: 'ARCHITECTURE.md' },
      { icon: 'database', title: 'Data model', file: 'DATA_MODEL.md' },
      { icon: 'description', title: 'API reference', file: 'API_REFERENCE.md' },
      { icon: 'code', title: 'Development guide', file: 'DEVELOPMENT.md' },
      { icon: 'cloud', title: 'Deployment guide', file: 'DEPLOYMENT.md' },
      { icon: 'menu_book', title: 'Hosting and operations', file: 'Hosting.md' },
      { icon: 'history', title: 'Operations and recovery', file: 'OPERATIONS_AND_RECOVERY.md' },
      { icon: 'history', title: 'Changelog', file: 'CHANGELOG_EN.md' },
      { icon: 'route', title: 'Roadmap', file: 'ROADMAP_EN.md' },
    ],
  },
  cta: {
    title: 'Explore the system',
    text: 'Open eduAssets in Guest Mode and browse every panel, no sign-up.',
    primary: 'Open the system',
    secondary: 'View code on GitHub',
  },
  profile: {
    eyebrow: 'Personal profile',
    title: 'About the author',
    lead: 'Developer, IT technician and Computer Engineering student.',
    name: 'Thiago da Silva',
    role: 'Developer · IT technician · Computer Engineering student',
    location: 'São Paulo, Brazil',
    github: 'https://github.com/dasilva-thiago'
  },
  footer: { status: 'Version 1.0', contact: 'thiagosilva785@gmail.com' },
};
