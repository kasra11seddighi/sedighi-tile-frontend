import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import SupportWidget from "../components/Support/SupportWidget";

function MainLayout() {
  // توجه: قبلاً اینجا useHeader() و useHero() هم صدا زده می‌شدن تا کل
  // صفحه (هر روتی، از جمله محصولات/درباره‌ما/تماس) پشت یه اسپینر تمام‌صفحه
  // بمونه تا این دو دیتا لود بشن. این هم باعث دابل‌فچ می‌شد (چون خودِ
  // Header و خودِ Hero هم مستقل useHeader/useHero رو صدا می‌زنن و از قبل
  // حالت لودینگ‌شون رو خودشون مدیریت می‌کنن - هر دو موقع لودینگ فقط
  // return null می‌کنن) و هم باعث می‌شد صفحاتی که اصلاً به دیتای هیرو
  // نیازی ندارن (مثل محصولات) بی‌دلیل معطل اون بمونن.
  // به همین خاطر لودینگ گلوبال حذف شد؛ هر کامپوننت (Header/Hero) خودش
  // مسئول نمایش/مخفی‌کردن خودشه، و بقیه‌ی صفحه بلافاصله رندر می‌شه.
  return (
    <main className="relative min-h-screen bg-[#07111f]">
      <ScrollToTop />

      <div className="absolute top-0 left-0 right-0 z-50 pt-4 px-6">
        <Header />
      </div>

      <Outlet />

      <Footer />

      <SupportWidget />
    </main>
  );
}

export default MainLayout;
