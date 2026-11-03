import { Navigate } from "react-router-dom";

// ورود و ثبت‌نام یکی شده (با شماره موبایل + کد تایید)
// این صفحه فقط برای سازگاری با لینک‌های قدیمی نگه داشته شده
export default function Register() {
  return <Navigate to="/login" replace />;
}
