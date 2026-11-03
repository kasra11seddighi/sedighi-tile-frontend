// اسکریپت تولید sitemap.xml — چون این یه SPA هست (نه یه سایت با صفحات
// استاتیک از قبل مشخص)، مسیرهای داینامیک (محصولات/مقالات/پروژه‌ها) رو
// باید از خود API بگیریم، نه اینکه دستی لیست کنیم. این اسکریپت مستقل از
// Vite اجرا می‌شه (با node عادی)، پس import.meta.env در دسترس نیست و
// آدرس‌ها از process.env خونده می‌شن.
//
// استفاده:
//   API_BASE_URL=https://api.your-domain.example SITE_URL=https://your-domain.example node scripts/generate-sitemap.mjs
//
// پیشنهاد: توی package.json یه اسکریپت اضافه کن که قبل/بعد از build صداش بزنه:
//   "scripts": { "generate:sitemap": "node scripts/generate-sitemap.mjs", "postbuild": "npm run generate:sitemap" }
// (و مطمئن شو که output توی public/ باشه تا هم موقع dev هم بعد از build سرو بشه)

import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api`;
const SITE_URL = (
  process.env.SITE_URL || "https://your-domain.example"
).replace(/\/$/, "");

// مسیرهای ثابت (بدون نیاز به دیتای داینامیک)
const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/products", priority: "0.9", changefreq: "daily" },
  { path: "/brands", priority: "0.6", changefreq: "weekly" },
  { path: "/projects", priority: "0.6", changefreq: "weekly" },
  { path: "/magazine", priority: "0.6", changefreq: "weekly" },
  { path: "/about", priority: "0.4", changefreq: "monthly" },
  { path: "/contact", priority: "0.4", changefreq: "monthly" },
];

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

// همه‌ی صفحات /products رو (به‌جای فرض کردن یه تعداد ثابت) با پیمایش
// pagination.pages می‌گیریم تا اگه محصول جدید اضافه شد، sitemap خودش کامل بمونه.
async function getAllProductUrls() {
  const urls = [];
  let page = 1;
  const limit = 100;

  while (true) {
    const data = await fetchJson(
      `${API_URL}/products?limit=${limit}&page=${page}`,
    );
    const products = data.products ?? [];
    for (const p of products) {
      urls.push({
        path: `/products/${p.slug}`,
        priority: "0.7",
        changefreq: "weekly",
        lastmod: p.updatedAt || p.createdAt,
      });
    }

    const totalPages = data.pagination?.pages ?? 1;
    if (page >= totalPages || products.length === 0) break;
    page += 1;
  }

  return urls;
}

async function getAllMagazineUrls() {
  try {
    const articles = await fetchJson(`${API_URL}/magazine`);
    const list = Array.isArray(articles) ? articles : (articles.data ?? []);
    return list.map((a) => ({
      path: `/magazine/${a.slug}`,
      priority: "0.5",
      changefreq: "monthly",
      lastmod: a.updatedAt || a.createdAt,
    }));
  } catch (err) {
    console.warn("[sitemap] رد شدن از مقالات مجله:", err.message);
    return [];
  }
}

async function getAllProjectUrls() {
  try {
    const data = await fetchJson(`${API_URL}/projects?limit=100`);
    const projects = data.projects ?? [];
    return projects.map((p) => ({
      path: `/projects/${p._id}`,
      priority: "0.5",
      changefreq: "monthly",
      lastmod: p.updatedAt || p.createdAt,
    }));
  } catch (err) {
    // اندپوینت /projects هنوز ممکنه توی بک‌اند پیاده نشده باشه (نگاه کن
    // به یادداشت TODO(backend) توی src/components/Projects/services) -
    // در این صورت این بخش رو ساکت رد می‌کنیم تا کل اسکریپت خراب نشه.
    console.warn("[sitemap] رد شدن از پروژه‌ها:", err.message);
    return [];
  }
}

function toXml(urls) {
  const items = urls
    .map((u) => {
      const loc = `${SITE_URL}${u.path}`;
      const lastmod = u.lastmod
        ? `\n    <lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod>`
        : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmod}\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

async function main() {
  console.log(
    `[sitemap] در حال ساخت sitemap از ${API_URL} برای ${SITE_URL} ...`,
  );

  const [productUrls, magazineUrls, projectUrls] = await Promise.all([
    getAllProductUrls().catch((err) => {
      console.warn("[sitemap] رد شدن از محصولات:", err.message);
      return [];
    }),
    getAllMagazineUrls(),
    getAllProjectUrls(),
  ]);

  const allUrls = [
    ...STATIC_ROUTES,
    ...productUrls,
    ...magazineUrls,
    ...projectUrls,
  ];
  const xml = toXml(allUrls);

  const outPath = resolve(process.cwd(), "public/sitemap.xml");
  await writeFile(outPath, xml, "utf-8");

  console.log(`[sitemap] ${allUrls.length} آدرس نوشته شد توی ${outPath}`);
}

main().catch((err) => {
  console.error("[sitemap] ساخت sitemap با خطا مواجه شد:", err);
  process.exitCode = 1;
});
