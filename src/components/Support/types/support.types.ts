// «پیام سریع پشتیبانی» - از همون اندپوینت /contact-messages استفاده می‌کنه
// (نگاه کن به Contact/services/contact.service.ts) پس بک‌اند جدیدی لازم نداره؛
// فقط subject به‌صورت پیش‌فرض «درخواست پشتیبانی آنلاین» ست می‌شه.
export interface QuickSupportValues {
  name: string;
  phone: string;
  message: string;
}
