import { API_BASE_URL } from "../config/env";

/**
 * آدرس نهایی یک عکس رو می‌سازه.
 *
 * قبلاً همه‌ی عکس‌ها (محصول، برند، پروژه، ...) به‌صورت مسیر نسبی از
 * بک‌اند برمی‌گشتن (مثلاً "/uploads/products/xxx.jpg") و همه‌جا با
 * `${API_BASE_URL}${image}` به یه آدرس کامل تبدیل می‌شدن.
 *
 * بعد از مهاجرت آپلودها به Liara Object Storage، بک‌اند دیگه یه لینک
 * کاملاً مطلق برمی‌گردونه (مثلاً "https://xxxxx.parspack.net/bucket/...").
 * اگه بازم همون‌جوری API_BASE_URL رو جلوش بچسبونیم، یه رشته‌ی خراب مثل
 * "http://localhost:5000https://..." ساخته می‌شه و عکس لود نمی‌شه.
 *
 * این تابع تنها نقطه‌ای باید باشه که این تبدیل توش انجام می‌شه؛ هر جای
 * دیگه‌ی کد نباید مستقیم API_BASE_URL رو جلوی مسیر عکس بچسبونه.
 */
export function resolveImageUrl(image: string): string;
export function resolveImageUrl(image: string | null | undefined): string | undefined;
export function resolveImageUrl(image: string | null | undefined): string | undefined {
  if (!image) return undefined;
  return /^https?:\/\//i.test(image) ? image : `${API_BASE_URL}${image}`;
}
