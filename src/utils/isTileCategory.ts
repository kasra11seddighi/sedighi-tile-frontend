const TILE_KEYWORDS = ["کاشی", "سرامیک"];

/**
 * تشخیص می‌ده که آیا یک نام دسته‌بندی به «کاشی و سرامیک» مربوطه یا نه؛
 * برای تصمیم‌گیری در مورد نمایش دکمه‌ی «دیدن در خانه خود» (هوش مصنوعی) روی کارت محصول.
 */
export function isTileCategory(categoryName?: string | null): boolean {
  if (!categoryName) return false;
  return TILE_KEYWORDS.some((keyword) => categoryName.includes(keyword));
}
