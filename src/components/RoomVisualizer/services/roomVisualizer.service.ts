import api from "../../../api/axios";

/**
 * ارسال عکس اتاق + شناسه کاشی انتخابی به بک‌اند تا تصویر نهایی با هوش مصنوعی تولید شود.
 * بک‌اند باید این مسیر را پیاده‌سازی و به سرویس تولید تصویر (مثلاً gapgpt.app) وصل کند.
 *
 * توجه: عمداً هدر Content-Type دستی ست نمی‌شود؛ چون داده از نوع FormData است،
 * خودِ axios/مرورگر باید Content-Type را با boundary درست تولید کند. ست کردن
 * دستی "multipart/form-data" (بدون boundary) باعث می‌شد پارس فرم در بک‌اند خراب بشه.
 */
export const applyTileToRoom = async (
  imageFile: File,
  tileId: string,
): Promise<{ resultImage: string }> => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("tileId", tileId);

  const res = await api.post("/room-visualizer/apply", formData);

  return res.data;
};

/**
 * دریافت پیشنهاد هوشمند کاشی بر اساس عکس اتاق کاربر.
 */
export const getAiTileSuggestion = async (
  imageFile: File,
): Promise<{ tileId: string }> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await api.post("/room-visualizer/suggest", formData);

  return res.data;
};
