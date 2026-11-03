export interface NavItem {
  _id: string;
  title: string;
  path: string;
}

export interface HeaderData {
  /** عنوان اصلی لوگو (مثلاً «فروشگاه تخصصی کاشی و سرامیک») - از تنظیمات سایت */
  headerTitle: string;
  /** زیرعنوان کوچک زیر عنوان اصلی (مثلاً «صدیقی») - از تنظیمات سایت */
  headerSubtitle: string;
  /** عکس لوگو (اختیاری) - اگه خالی باشه، دایره‌ی طلایی پیش‌فرض با حرف «ک» نشون داده می‌شه */
  logoImage?: string;
  menu: NavItem[];
  cartCount: number;
}
