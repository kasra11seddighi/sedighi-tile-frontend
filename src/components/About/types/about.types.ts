export interface AboutHero {
  badge: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  description: string;
}

export interface AboutStat {
  icon: string;
  value: string;
  label: string;
}

export interface AboutStory {
  badge: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
  experienceValue: string;
  experienceLabel: string;
}

export interface AboutValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface AboutValues {
  badge: string;
  title: string;
  items: AboutValueItem[];
}

export interface AboutCTA {
  title: string;
  description: string;
}

export interface AboutData {
  hero: AboutHero;
  stats: AboutStat[];
  story: AboutStory;
  values: AboutValues;
  cta: AboutCTA;
}
