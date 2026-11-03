import { Sparkles } from "lucide-react";
import { useYardBanners } from "./hooks/useYardBanners";
import YardBannerCard from "./components/YardBannerCard";

export default function YardBannerSection() {
  const { banners, isLoading, error } = useYardBanners(4);

  // اگه چیزی برای نشون دادن نیست (لود نشده، خطا خورده یا ادمین هنوز
  // بنری نساخته)، این بخش کلاً از صفحه اصلی حذف می‌شه — دقیقاً مثل بخش
  // نظرات مشتری‌ها.
  if (isLoading || error || banners.length === 0) return null;

  return (
    <section dir="rtl" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-sm font-medium text-brand-light">
            <span className="h-px w-10 bg-brand-light/70" />
            <Sparkles size={15} />
            <span>بیرون از خانه</span>
            <span className="h-px w-10 bg-brand-light/70" />
          </div>
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            حیاط، استخر و فضای باز، با همون کیفیت داخل خونه
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {banners.map((banner) => (
            <YardBannerCard key={banner._id} banner={banner} />
          ))}
        </div>
      </div>
    </section>
  );
}
