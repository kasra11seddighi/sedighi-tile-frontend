import Brands from "../components/cards/Brands";
import Hero from "../components/Hero/Hero";
import YardBannerSection from "../components/YardBanner/YardBannerSection";
import TrustBar from "../components/TrustBar/TrustBar";
import TileFinder from "../components/TileFinder/TileFinder";
import RoomVisualizer from "../components/RoomVisualizer/RoomVisualizer";
import ShiralatSection from "../components/Shiralat/ShiralatSection";
import ProjectsHomeSection from "../components/Projects/ProjectsHomeSection";
import TestimonialsSection from "../components/Testimonials/TestimonialsSection";
import MagazineHomeSection from "../components/Magazine/MagazineHomeSection";
import FaqHomeSection from "../components/Contact/components/FaqHomeSection";
import RecentlyViewedProducts from "../components/RecentlyViewed/RecentlyViewedProducts";
import { useSiteConfig } from "../context/SiteConfigContext";
import { useSeo } from "../hooks/useSeo";

const Home = () => {
  const { shiralatEnabled } = useSiteConfig();
  useSeo({
    title: "نمایندگی کاشی و سرامیک صدیقی",
    description:
      "نمایندگی صدیقی؛ عرضه انواع کاشی و سرامیک با تنوع طرح، سایز و برند، همراه با مشاوره برای انتخاب مناسب‌ترین محصول.",
    path: "/",
  });

  return (
    <>
      <Hero />
      {/* نوار اعتماد/تضمین‌ها - نسخه‌ی خلاصه‌ی «چرا ما»ی صفحه‌ی About */}
      <TrustBar />
      {/* سایر سکشن‌ها */}
      <Brands />
      {/* بنرهای «بیرون از خانه» - خودش وقتی بنری نباشه چیزی رندر نمی‌کنه */}

      <TileFinder />

      <RoomVisualizer />
      <YardBannerSection />
      {/* فقط وقتی از پنل ادمین فعال شده باشه نمایش داده می‌شه */}
      {shiralatEnabled && <ShiralatSection />}
      {/* پیش‌نمایش پروژه‌های اجراشده - خودش وقتی پروژه‌ای نباشه چیزی رندر نمی‌کنه */}
      <ProjectsHomeSection />
      {/* بازدیدهای اخیر کاربر - خودش وقتی محصولی توی تاریخچه نباشه چیزی رندر نمی‌کنه */}
      <RecentlyViewedProducts />
      {/* نظرات مشتری‌ها - خودش وقتی نظری نباشه چیزی رندر نمی‌کنه */}
      <TestimonialsSection />
      {/* بخش مجله - خودش وقتی مقاله‌ای نباشه چیزی رندر نمی‌کنه */}
      <MagazineHomeSection />
      {/* سوالات پرتکرار - خودش وقتی سوالی نباشه چیزی رندر نمی‌کنه */}
      <FaqHomeSection />
    </>
  );
};

export default Home;
