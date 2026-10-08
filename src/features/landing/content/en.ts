import type { LandingContent } from './types';

export const en: LandingContent = {
  nav: { features: 'Features', flow: 'How it works', access: 'Access and security', rfid: 'RFID card', tech: 'Technology', docs: 'Documentation' },
  hero: {
    title: 'Loan and inventory management for school equipment',
    lead: 'eduAssets records loans and returns, tracks stock and equipment issues, and exports reports as CSV, Excel and PDF.',
    primary: 'Open the system',
    secondary: 'View code on GitHub',
    note: 'It opens in Guest Mode: read-only, no login.',
    shot: { label: 'Dashboard', hint: 'Summary cards and Stock tab' },
  },
  features: {
    title: 'Features',
    rows: [
      {
        id: 'emprestimos',
        title: 'Loans and returns',
        text: 'Each loan records the requester, the person responsible, date and time, equipment and quantities. Returns are processed from the list of open loans.',
        points: [
          'Loan items can be edited before the return',
          'Registration is blocked when available stock is not enough',
          'Race-condition-safe, atomic stock updates',
        ],
        shot: { label: 'New loan / Returns', hint: 'Loan form and open loans list with details panel' },
      },
      {
        id: 'dashboard',
        title: 'Stock dashboard and history',
        text: 'Shows total, available, on loan, in maintenance and broken items. Stock is listed by category and the history shows every loan with Open or Returned status.',
        points: ['Search by category, requester, person responsible or number', 'Detailed summary per category'],
        shot: { label: 'Dashboard', hint: 'Stock and History tabs' },
      },
      {
        id: 'controle',
        title: 'Issue tracking',
        text: 'Records observations, maintenance and broken equipment. Maintenance and breakage remove the item from available stock; once resolved, the item returns automatically.',
        points: ['Observations do not change stock', 'History of resolved records, with the measures taken'],
        shot: { label: 'Control', hint: 'Open and resolved records' },
      },
    ],
    more: [
      { title: 'Export', text: 'Loan history and inventory as CSV, Excel or PDF.' },
      { title: 'Registers', text: 'Equipment, categories, responsible staff and users, in an administrator-only area.' },
      { title: 'Dark mode', text: 'Follows the operating system theme, with a manual Light, Dark or System option.' },
      { title: 'Portuguese and English', text: '[PLACEHOLDER: confirm languages available in the app interface]' },
    ],
  },
  flow: {
    title: 'How it works',
    steps: [
      { title: 'Register the loan', text: 'Enter the requester, the person responsible and the items with quantities.' },
      { title: 'Follow it on the dashboard', text: 'Available stock and history update with every record.' },
      { title: 'Return', text: 'Confirm the return with date and time; items go back to stock.' },
      { title: 'Record issues', text: 'Maintenance and breakage stay in Control until resolved.' },
    ],
  },
  access: {
    title: 'Access and security',
    lead: 'The system has three access levels. Restrictions exist in the interface and are enforced by the backend too.',
    headers: ['Level', 'What it can do'],
    levels: [
      { name: 'Guest', can: 'Enters without login. Views Dashboard, history and stock. Cannot create, edit or delete.' },
      { name: 'Editor', can: 'Registers loans, processes returns and creates or edits Control records.' },
      { name: 'Administrator', can: 'Full access: Registers, record deletion, password change and RFID cards.' },
    ],
    security: [
      'JWT authentication and bcrypt password hashing',
      'Security headers (helmet) and login rate limiting',
      'Every write request validated with Zod',
      'Administrator sessions expire after 30 minutes of inactivity',
    ],
  },
  rfid: {
    title: 'RFID card login',
    lead: 'Optional hardware feature: users tap their card on the reader and sign in without typing a password.',
    steps: [
      { title: 'Card provisioning', text: 'The administrator generates a token under Registers → Users and writes it to the card. The server stores only the token hash.' },
      { title: 'Reading', text: 'A Python service on a Raspberry Pi or Arduino Nano reads the card and sends the token to the backend.' },
      { title: 'Login', text: 'The backend validates the token and notifies every open tab over WebSocket; the session starts automatically.' },
    ],
    note: 'The reader plays distinct tones for card detected, success and error. RFID is never required: password login remains available.',
  },
  tech: {
    title: 'Technology',
    rows: [
      { area: 'Frontend', items: 'TypeScript, Vite, feature-first architecture, CSS custom properties' },
      { area: 'Backend', items: 'Node.js, Express 5, Prisma, Zod' },
      { area: 'Database', items: 'PostgreSQL (Supabase)' },
      { area: 'Optional hardware', items: 'Python, Raspberry Pi or Arduino Nano, RFID reader' },
      { area: 'Hosting', items: '[PLACEHOLDER: confirm public hosting text]' },
    ],
  },
  docs: {
    title: 'Documentation',
    lead: 'Project documentation lives in the repository.',
    items: [
      { title: 'README', file: 'README.md' },
      { title: 'User manual', file: 'USER_MANUAL.md' },
      { title: 'Architecture', file: 'ARCHITECTURE.md' },
      { title: 'Data model', file: 'DATA_MODEL.md' },
      { title: 'Changelog', file: 'CHANGELOG_EN.md' },
      { title: 'Roadmap', file: 'ROADMAP_EN.md' },
    ],
  },
  cta: {
    title: 'Explore the system',
    text: 'Open eduAssets in Guest Mode and browse every panel, no sign-up.',
    primary: 'Open the system',
    secondary: 'View code on GitHub',
  },
  footer: { status: 'Beta version 0.9.9', contact: '[PLACEHOLDER: contact]', github: 'GitHub' },
};
