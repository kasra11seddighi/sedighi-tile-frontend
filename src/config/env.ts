// آدرس بک‌اند: از متغیر محیطی Vite خونده می‌شه (در .env: VITE_API_URL=https://api.example.com)
// و اگه ست نشده باشه (مثلاً موقع توسعه‌ی لوکال بدون فایل .env)، مقدار پیش‌فرض لوکال استفاده می‌شه.
// این تنها منبع صحت برای آدرس سرور در کل پروژه‌ست؛ جای دیگه نباید این مقدار هاردکد یا دوباره تعریف بشه.
const envUrl = import.meta.env.VITE_API_URL;

if (!envUrl && import.meta.env.PROD) {
  // توی بیلد پروداکشن، نبودِ VITE_API_URL نباید بی‌صدا (یا فقط با یه لاگ
  // کنسول که خیلی‌ها اصلاً چک نمی‌کنن) روی localhost فال‌بک کنه؛ چون این
  // یعنی کل سایت پروداکشن سایلنت به یه سرور لوکال که وجود نداره وصل بشه.
  // به‌جاش همون لحظه‌ی import (یعنی موقع بالا اومدن اپ) کرش می‌کنیم تا
  // مشکل بلافاصله توی مرحله‌ی بیلد/دیپلوی/QA دیده بشه، نه دستِ کاربر نهایی.
  throw new Error(
    "[env] VITE_API_URL برای بیلد پروداکشن تعریف نشده — .env.production را بررسی کنید.",
  );
}

export const API_BASE_URL = envUrl || "http://localhost:5000";

// baseURL نمونه‌ی axios (شامل پیشوند /api) که همه‌ی درخواست‌های REST باید ازش استفاده کنن
export const API_URL = `${API_BASE_URL}/api`;

// نام سایت که توی <title> هر صفحه و تگ‌های Open Graph استفاده می‌شه (useSeo).
export const SITE_NAME = "نمایندگی صدیقی";

// آدرس عمومی سایت (فرانت، نه بک‌اند) برای canonical/og:url و ساخت sitemap.xml.
// در .env: VITE_SITE_URL=https://your-domain.com — بدون اسلش آخر.
// TODO: قبل از دیپلوی، این پیش‌فرض رو با دامنه‌ی واقعی سایت عوض کن (یا .env رو ست کن).
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://your-domain.example";
