import { apiRoot } from "../../../api/axios";

import type { TileFinderStep } from "../types/tileFinder.types";

// مراحل ویزارد فایندر کاشی رو از بک‌اند می‌گیره - کاملاً داینامیک: هر مرحله‌ای
// که از پنل ادمین اضافه/حذف/فعال یا غیرفعال بشه، همین‌جا و بدون هیچ تغییر
// کدی منعکس می‌شه (شامل مراحل سفارشی مثل «کف یا دیوار»).
//
// توجه: بر خلاف بقیه‌ی مسیرهای /tile-finder/* (که آرایه‌ی خام برمی‌گردونن)،
// این مسیر از کنترلر مشترک با پنل ادمین (tileFinderStep.controller) استفاده
// می‌کنه و پاسخش به شکل { success, data } هست - پس اینجا باید data رو
// آنرپ کنیم.
export const getFinderSteps = async (): Promise<TileFinderStep[]> => {
  const res = await apiRoot.get<{ success: boolean; data: TileFinderStep[] }>(
    "/tile-finder/steps",
  );

  return res.data.data;
};
