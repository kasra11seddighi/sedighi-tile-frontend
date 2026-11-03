import api from "../../../api/axios";
import type { Testimonial } from "../types/testimonials.types";

// TODO(backend): این اندپوینت هنوز توی بک‌اند پیاده نشده. الگوی پاسخ
// عمداً هم‌شکل بقیه‌ی ماژول‌های محتوایی سایته (مثل /magazine):
//   GET /testimonials?limit=  ->  { data: Testimonial[] }
// تا وقتی بک‌اند آماده بشه، useTestimonials با خطا مواجه می‌شه و بخش
// نظرات مشتری‌ها (دقیقاً مثل بخش مجله وقتی مقاله‌ای نیست) از صفحه اصلی
// خودش رو مخفی می‌کنه؛ صفحه خراب نمی‌شه.
export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  const res = await api.get("/testimonials", { params: limit ? { limit } : undefined });
  return res.data.data;
}
