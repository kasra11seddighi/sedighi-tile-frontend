// کلید ذخیره‌سازی توکن JWT توی localStorage. همه‌جای اپ باید از همین سه
// تابع استفاده کنه، نه مستقیم از localStorage، تا این کلید فقط یک‌جا
// تعریف شده باشه.
const TOKEN_KEY = "auth_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
