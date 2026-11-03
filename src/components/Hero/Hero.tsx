import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { RefreshCw } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

import HeroSlide from "./components/HeroSlide";
import HeroContent from "./components/HeroContent";

import { useHero } from "./hooks/useHero";
import type { HeroData } from "./types/hero.types";
import heroFallbackImage from "../../assets/hero.png";

// اگه گرفتن دیتای هیرو از بک‌اند خطا بخوره، برخلاف قبل که کل بخش هیرو
// محو می‌شد و کاربر یه صفحه‌ی نصفه می‌دید (بدون هیچ عکس/عنوانی بالای
// صفحه)، حالا از همین محتوای پیش‌فرض استفاده می‌کنیم تا صفحه قابل
// استفاده بمونه — دقیقاً هم‌الگو با FALLBACK_HEADER_DATA توی هدر. عکس هم
// از asset لوکال پروژه‌ست (نه از بک‌اند) تا این فallback واقعاً مستقل از
// در دسترس بودن سرور باشه.
const FALLBACK_HERO_DATA: HeroData = {
  badge: "نمایندگی رسمی صدیقی",
  title: "کاشی و سرامیکی که",
  highlightTitle: "فضای رویاییت رو می‌سازه",
  description:
    "مجموعه‌ای از باکیفیت‌ترین برندهای کاشی، سرامیک و شیرآلات، همراه با مشاوره تخصصی رایگان و ارسال سریع به سراسر کشور.",
  primaryButton: { text: "مشاهده محصولات", link: "/products" },
  secondaryButton: { text: "مشاوره رایگان", link: "/contact" },
  slides: [],
  categories: [],
};

function Hero() {
  const { data, loading, error, retry } = useHero();

  if (loading) return null;

  // چه دیتا نیومده باشه چه خطا خورده باشه، به‌جای null برگردوندن از
  // فallback استفاده می‌کنیم تا هیرو همیشه چیزی نشون بده.
  const heroData = data ?? FALLBACK_HERO_DATA;
  const hasSlides = heroData.slides.length > 0;

  return (
    <section className="relative isolate min-h-[680px] h-[85vh] sm:h-[750px] md:h-[800px] overflow-hidden rounded-3xl">
      {hasSlides ? (
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={heroData.slides.length > 1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          speed={700}
          className="absolute inset-0 !z-0 h-full w-full"
        >
          {heroData.slides.map((slide, index) => (
            <SwiperSlide
              key={`${slide.image}-${index}`}
              className="h-full w-full"
            >
              <HeroSlide slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // دیتای واقعی نیومده (یا اسلایدی ثبت نشده) — به‌جای اسلایدر خالی،
        // یک عکس ثابت و لوکال به‌عنوان پس‌زمینه نشون داده می‌شه.
        <img
          src={heroFallbackImage}
          alt=""
          className="absolute inset-0 z-0 h-full w-full select-none object-cover object-center"
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-l from-[#07111f]/20 via-[#07111f]/75 to-[#07111f]/95" />

      <div className="absolute inset-0 z-20 mx-auto flex h-full max-w-[1500px] flex-col items-center justify-center gap-6 px-5 pt-16 sm:px-8 md:px-10">
        <HeroContent
          badge={heroData.badge}
          title={heroData.title}
          highlightTitle={heroData.highlightTitle}
          description={heroData.description}
          primaryButton={heroData.primaryButton}
          secondaryButton={heroData.secondaryButton}
        />

        {/* اگه دیتای واقعی هیرو لود نشد، یک نوار کوچیک برای اطلاع و تلاش مجدد */}
        {error && (
          <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 backdrop-blur">
            <span>{error}</span>
            <button
              type="button"
              onClick={retry}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 font-semibold text-white/80 transition hover:bg-white/20"
            >
              <RefreshCw size={12} />
              تلاش مجدد
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
