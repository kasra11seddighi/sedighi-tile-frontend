import { Link } from "react-router-dom";
import { Newspaper, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useMagazineList } from "./hooks/useMagazineList";
import MagazineCard from "./components/MagazineCard";

// تعداد مقاله‌هایی که برای اسلایدر می‌گیریم (فقط جدیدترین‌ها - صفحه‌بندی
// واقعی/فیلتر اینجا لازم نیست، اون‌ها فقط توی صفحه کامل مجلات هستن)
const HOME_SLIDER_SIZE = 9;

export default function MagazineHomeSection() {
  const { articles, pagination, isLoading, error } =
    useMagazineList(HOME_SLIDER_SIZE);

  // اولین بارگذاری هنوز کامل نشده -> چیزی نشون نده تا صفحه اصلی چشمک نزنه
  if (!pagination && isLoading) return null;

  // اگه اصلاً مقاله‌ای نیست یا بار اول خطا خورده، کل بخش از صفحه اصلی حذف می‌شه
  if (!isLoading && (error || articles.length === 0)) return null;

  // برای اینکه حالت لوپ سوییپر درست کار کنه (بدون پرش/تکرار عجیب)، حداقل
  // باید به اندازه‌ی دو برابر تعداد اسلاید قابل‌نمایش (۳ تا) مقاله داشته
  // باشیم؛ وگرنه لوپ رو غیرفعال می‌کنیم تا خرابی بصری نده.
  const canLoop = articles.length >= 6;

  return (
    <section dir="rtl" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-brand-light">
              <Newspaper size={14} />
              <span>مجله صدیقی</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              راهنما و نکات کاشی و سرامیک
            </h2>
          </div>

          <Link
            to="/magazine"
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-brand-light transition-colors hover:text-[#e3b27e]"
          >
            مشاهده همه مقاله‌ها
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.15}
            loop={canLoop}
            grabCursor={true}
            speed={600}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".magazine-next",
              prevEl: ".magazine-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-10"
          >
            {articles.map((article) => (
              <SwiperSlide key={article._id}>
                <MagazineCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* دکمه قبلی */}
          <button
            type="button"
            aria-label="مقاله قبلی"
            className="magazine-prev absolute -right-4 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white backdrop-blur transition hover:bg-brand lg:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* دکمه بعدی */}
          <button
            type="button"
            aria-label="مقاله بعدی"
            className="magazine-next absolute -left-4 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white backdrop-blur transition hover:bg-brand lg:flex"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
