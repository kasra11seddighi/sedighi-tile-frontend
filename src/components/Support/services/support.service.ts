import api from "../../../api/axios";
import type { QuickSupportValues } from "../types/support.types";

// همون اندپوینتی که فرم تماس ازش استفاده می‌کنه (نگاه کن به
// Contact/services/contact.service.ts)؛ subject به‌صورت ثابت «درخواست
// پشتیبانی آنلاین» فرستاده می‌شه تا توی پنل مدیریت از پیام‌های صفحه‌ی
// تماس قابل‌تشخیص باشه. بک‌اند جدیدی لازم نداره.
export async function sendQuickSupportMessage(values: QuickSupportValues) {
  const response = await api.post("/contact-messages", {
    name: values.name,
    phone: values.phone,
    subject: "درخواست پشتیبانی آنلاین",
    message: values.message,
  });
  return response.data;
}
