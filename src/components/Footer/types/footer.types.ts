export interface FooterLink {
  title: string;
  path: string;
}

export interface FooterSocial {
  instagram?: string;
  telegram?: string;
  whatsapp?: string;
}

export interface FooterContact {
  phone?: string;
  email?: string;
  address?: string;
}

export interface FooterData {
  logo: string;
  // عکس لوگو (اختیاری) - همون فیلد logoImage که توی هدر هم استفاده می‌شه
  // (یک تنظیمات مشترک برای کل سایت). اگه خالی باشه، دایره‌ی طلایی پیش‌فرض
  // با حرف «ک» جایگزینش می‌شه.
  logoImage?: string;
  description?: string;
  quickLinks?: FooterLink[];
  helpLinks?: FooterLink[];
  social?: FooterSocial;
  contact?: FooterContact;
}
