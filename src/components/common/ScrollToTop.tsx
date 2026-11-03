import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router به‌صورت پیش‌فرض موقع تغییر مسیر، موقعیت اسکرول رو حفظ می‌کنه
 * (مثلاً اگه پایین صفحه‌ی اصلی بودی و رفتی صفحه‌ی محصول، همون‌جای پایین می‌مونی).
 * این کامپوننت با هر تغییر مسیر، صفحه رو می‌بره بالا.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
