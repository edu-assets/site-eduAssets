export interface Cta { label: string; href: string }
export interface Shot { label: string; hint: string }
export interface FeatureRow { id: string; title: string; text: string; points: string[]; shot: Shot }
export interface LandingContent {
  nav: { features: string; flow: string; access: string; rfid: string; tech: string; docs: string };
  hero: { title: string; lead: string; primary: string; secondary: string; note: string; shot: Shot };
  features: { title: string; rows: FeatureRow[]; more: { title: string; text: string }[] };
  flow: { title: string; steps: { title: string; text: string }[] };
  access: { title: string; lead: string; headers: [string, string]; levels: { name: string; can: string }[]; security: string[] };
  rfid: { title: string; lead: string; steps: { title: string; text: string }[]; note: string };
  tech: { title: string; rows: { area: string; items: string }[] };
  docs: { title: string; lead: string; items: { title: string; file: string }[] };
  cta: { title: string; text: string; primary: string; secondary: string };
  footer: { status: string; contact: string; github: string };
}
