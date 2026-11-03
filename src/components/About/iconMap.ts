import {
  Award,
  Users,
  Building2,
  PackageCheck,
  ShieldCheck,
  Headset,
  Truck,
  BadgeCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// نام آیکون از دیتابیس میاد (رشته)؛ اینجا به کامپوننت واقعی lucide نگاشت
// می‌شه. اگه آیکونی که ادمین وارد کرده وجود نداشت، یه آیکون پیش‌فرض
// نمایش داده می‌شه تا صفحه خراب نشه.
const ICONS: Record<string, LucideIcon> = {
  Award,
  Users,
  Building2,
  PackageCheck,
  ShieldCheck,
  Headset,
  Truck,
  BadgeCheck,
  Sparkles,
};

export function getAboutIcon(name?: string): LucideIcon {
  if (name && ICONS[name]) return ICONS[name];
  return Sparkles;
}
