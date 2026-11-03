import axios from "axios";
import { API_BASE_URL, API_URL } from "../config/env";
import { getToken } from "../utils/authToken";

// عمداً هدر Content-Type ثابت اینجا ست نمی‌شه (نگاه کن به توضیح مشابه در
// پنل ادمین)؛ چون این باعث می‌شه آپلودهای احتمالی آینده (FormData) هم
// با هدر اشتباه application/json ارسال بشن و بک‌اند نتونه فایل رو بخونه.
//
// احراز هویت با هدر Authorization انجام می‌شه: بک‌اند توکن رو توی بدنه‌ی
// پاسخ verify-otp برمی‌گردونه (نه کوکی)، ما همونو توی localStorage نگه
// می‌داریم (src/utils/authToken.ts) و این اینترسپتور خودش هر ریکوئست رو
// با "Authorization: Bearer <token>" می‌فرسته. نیازی به withCredentials
// نیست چون کوکی‌ای درکار نیست.
function attachAuthHeader(instance: ReturnType<typeof axios.create>) {
  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

const api = axios.create({
  baseURL: API_URL,
});
attachAuthHeader(api);

// نمونه‌ی جدا برای مسیرهایی که عمداً بدون پیشوند /api روی بک‌اند mount
// شدن (فعلاً فقط ماژول tile-finder — نگاه کن به app.ts بک‌اند:
// `app.use("/tile-finder", tileFinderRoutes)`). اگه بعداً این مسیر هم
// زیر /api رفت، همین‌جا کافیه baseURL رو به API_URL تغییر بدیم.
export const apiRoot = axios.create({
  baseURL: API_BASE_URL,
});
attachAuthHeader(apiRoot);

export default api;
