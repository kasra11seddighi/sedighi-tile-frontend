import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "../config/env";

interface SeoOptions {
  /** عنوان همین صفحه؛ نام سایت خودکار بهش اضافه می‌شه (لازم نیست خودت اضافه کنی) */
  title: string;
  description?: string;
  /** آدرس کامل تصویر (برای Open Graph/Twitter)؛ اگه نسبی بود قبلش API_BASE_URL رو خودت اضافه کن */
  image?: string;
  /** مسیر صفحه برای canonical/og:url، مثلاً "/products/123". اگه ندی از آدرس فعلی مرورگر خونده می‌شه */
  path?: string;
  /** صفحاتی مثل سبد خرید/چک‌اوت/پروفایل که نباید توی نتایج گوگل بیان */
  noIndex?: boolean;
  type?: "website" | "article" | "product";
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// این پروژه SPA خالصه (بدون SSR/prerender)، پس این تگ‌ها فقط بعد از اجرای
// جاوااسکریپت روی صفحه ست می‌شن. گوگل خودش جاوااسکریپت رو اجرا می‌کنه و
// این مقدار رو می‌بینه، ولی برای ایندکس فوری‌تر/بدون وابستگی به رندر شدن
// جاوااسکریپت، قدم بعدی معمولاً SSR یا prerender (مثل vite-plugin-prerender)ه.
export function useSeo({
  title,
  description,
  image,
  path,
  noIndex,
  type = "website",
}: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    setMeta("property", "og:title", fullTitle);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }

    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }

    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    setCanonical(url);
    setMeta("property", "og:url", url);

    // متای robots فقط وقتی لازمه که توی DOM باشه (صفحات noindex)؛ بقیه‌ی
    // صفحات نباید هیچ محدودیتی داشته باشن، پس اگه از یه صفحه‌ی noindex به
    // یه صفحه‌ی معمولی می‌ریم، باید حذفش کنیم نه اینکه مقدارش رو عوض کنیم.
    const existingRobots = document.head.querySelector('meta[name="robots"]');
    if (noIndex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else if (existingRobots) {
      existingRobots.remove();
    }
  }, [title, description, image, path, noIndex, type]);
}
