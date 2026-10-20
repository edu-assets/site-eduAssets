export interface Shot { key: string; label: string; alt: string; hint: string }
export interface IconText { icon: string; text: string }
export interface IconItem { icon: string; title: string; text: string }
export interface LandingContent {
  lang: { href: string; label: string; title: string };
  nav: { problem: string; flow: string; features: string; differentials: string; access: string; tech: string; docs: string };
  hero: { eyebrow: string; title: string; lead: string; primary: string; secondary: string; note: string; chips: IconText[]; shot: Shot };
  problem: {
    eyebrow: string;
    title: string;
    lead: string;
    questionsTitle: string;
    photo: {
      alt: string;
      caption: string;
    };
    questions: IconText[]; 
  };
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
    photos: Array<{ alt: string; caption: string }>;
    steps: IconItem[];
    note: string;
  };
  tech: { eyebrow: string; title: string; rows: { icon: string; area: string; items: string }[] };
  docs: { eyebrow: string; title: string; lead: string; items: { icon: string; title: string; file: string }[] };
  cta: { title: string; text: string; primary: string; secondary: string };
  footer: { status: string };
}
