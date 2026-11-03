export interface HeroSlideItem {
  id: number;
  image: string;
  alt: string;
}

export interface HeroButton {
  text: string;
  link: string;
}

export interface HeroCategoryItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  icon: string;
  link: string;
}

export interface HeroData {
  badge: string;
  title: string;
  highlightTitle: string;
  description: string;
  primaryButton: HeroButton;
  secondaryButton: HeroButton;
  slides: HeroSlideItem[];
  categories: HeroCategoryItem[];
}
