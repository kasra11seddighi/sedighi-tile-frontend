const STORAGE_KEY = "recently_viewed_products";
const MAX_ITEMS = 10;

// فقط شناسه‌ها رو ذخیره می‌کنیم (نه کل محصول)، چون قیمت/موجودی ممکنه
// عوض بشه و نگه‌داشتن دیتای قدیمی توی localStorage باعث نمایش اطلاعات
// نادرست می‌شه؛ هر بار که لازم شد، محصول با همون شناسه از سرور خونده می‌شه.
function readIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // مثلاً حالت خصوصی مرورگر که localStorage ممکنه پرتاب خطا کنه؛
    // بی‌خیالش می‌شیم، این فیچر ضروری نیست که کل صفحه رو خراب کنه
  }
}

// یه محصول رو به لیست «بازدیدهای اخیر» اضافه می‌کنه (جدیدترین همیشه اول
// لیست میاد؛ اگه قبلاً دیده شده بود، به جای تکرار میاد بالای لیست).
export function recordProductView(productId: string) {
  const current = readIds().filter((id) => id !== productId);
  const updated = [productId, ...current].slice(0, MAX_ITEMS);
  writeIds(updated);
}

// شناسه‌ی محصولاتی که کاربر قبلاً دیده، به‌جز شناسه‌ی اختیاری excludeId
// (برای اینکه توی خودِ صفحه‌ی همون محصول، خودش رو دوباره نشون نده).
export function getRecentlyViewedIds(excludeId?: string): string[] {
  return readIds().filter((id) => id !== excludeId);
}
