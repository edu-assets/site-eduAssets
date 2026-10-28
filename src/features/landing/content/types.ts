export interface Shot { key: string; label: string; alt: string; caption: string; hint: string }
export interface IconText { icon: string; text: string }
export interface IconItem { icon: string; title: string; text: string }
type RfidPhoto = { alt: string; caption: string };
export interface LandingContent {
  lang: { href: string; label: string; title: string };
  nav: { project: string; problem: string; flow: string; features: string; differentials: string; access: string; tech: string; docs: string; profile: string };
  hero: { eyebrow: string; title: string; lead: string; primary: string; secondary: string; note: string };
  flow: { eyebrow: string; title: string; lead: string; steps: IconItem[] };
  features: {
    eyebrow: string; title: string;
    rows: { icon: string; title: string; text: string; points: string[]; shot: Shot }[];
    effects: { title: string; lead: string; items: { icon: string; tone: 'primary' | 'success' | 'warning' | 'error'; action: string; effect: string }[] };
  };
  differentials: { eyebrow: string; title: string; lead: string; items: IconItem[] };
  access: { eyebrow: string; title: string; lead: string; levels: { icon: string; name: string; can: string }[]; securityTitle: string; security: string[] };
  rfid: {
    eyebrow: string;
    title: string;
    lead: string;
    video: Shot;
    photos: [RfidPhoto, RfidPhoto];
    steps: IconItem[];
    note: string;
  };
  project: {
    eyebrow: string;
    title: string;
    lead: string;
    challenge: { icon: string; title: string; text: string; photo: { alt: string; caption: string }; questionsTitle: string; questions: IconText[] };
    solution: { icon: string; title: string; text: string };
    scopeTitle: string;
    scope: { icon: string; title: string; text: string }[];
    decisionsTitle: string;
    decisions: { icon: string; title: string; text: string }[];
  };
  tech: { eyebrow: string; title: string; groups: { area: string; items: { name: string; brand?: string; icon?: string }[] }[] };
  docs: { eyebrow: string; title: string; lead: string; groups: { title: string; items: { icon: string; title: string; file: string }[] }[] };
  cta: { title: string; text: string; primary: string; secondary: string };
  profile: {
    eyebrow: string;
    title: string;
    lead: string;
    name: string;
    role: string;
    location: string;
    photoAlt: string;
    github: string;
  };
  footer: { status: string; contact: string };
}
