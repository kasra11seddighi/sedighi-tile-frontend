import { RefreshCw } from "lucide-react";
import Logo from "./components/Logo";
import NavLinks from "./components/NavLinks";
import CartIcon from "./components/CartIcon";
import FavoritesIcon from "./components/FavoritesIcon";
import CallButton from "./components/CallButton";
import AuthButton from "./components/AuthButton";
import MobileMenu from "./components/MobileMenu";
import MobileDrawer from "./components/MobileDrawer";
import SearchToggle from "./components/SearchToggle";

import { useHeader } from "./hooks/useHeader";
import { useScrolled } from "./hooks/useScrolled";
import { useSiteConfig } from "../../context/SiteConfigContext";
import type { HeaderData, NavItem } from "./types/header.types";

// اگه گرفتن دیتای هدر (لوگو/منو) از بک‌اند خطا خورد، به‌جای محو کردن کامل
// هدر (که یعنی کاربر دسترسی به ناوبری، سرچ، سبد خرید و ورود رو هم از دست
// می‌ده)، از همین دیتای پیش‌فرض استفاده می‌کنیم تا سایت قابل استفاده بمونه.
const FALLBACK_HEADER_DATA: HeaderData = {
  headerTitle: "فروشگاه تخصصی کاشی و سرامیک",
  headerSubtitle: "صدیقی",
  cartCount: 0,
  menu: [
    { _id: "fallback-home", title: "خانه", path: "/" },
    { _id: "fallback-products", title: "محصولات", path: "/products" },
    { _id: "fallback-magazine", title: "مجلات", path: "/magazine" },
    { _id: "fallback-about", title: "درباره ما", path: "/about" },
    { _id: "fallback-contact", title: "تماس با ما", path: "/contact" },
  ],
};

// اگه منوی واقعی از بک‌اند (یا حتی fallback) آیتم «مجلات» رو نداشت، خودمون
// اضافه‌اش می‌کنیم تا لینک مجلات همیشه توی هدر باشه - بدون اینکه لازم باشه
// همین الان از پنل ادمین این آیتم رو دستی اضافه کنی. بهتره یه روز این آیتم
// از همون پنل ادمین هم مدیریت بشه (ترتیب/عنوان قابل تغییر باشه)، ولی تا
// اون موقع این تضمین می‌کنه چیزی از قلم نیفته.
function ensureMagazineMenuItem(menu: NavItem[]): NavItem[] {
  const hasMagazine = menu.some(
    (item) => item.path === "/magazine" || item.title === "مجلات",
  );
  if (hasMagazine) return menu;

  const magazineItem: NavItem = {
    _id: "auto-magazine",
    title: "مجلات",
    path: "/magazine",
  };

  const productsIndex = menu.findIndex(
    (item) => item.path === "/products" || item.title === "محصولات",
  );

  // اگه آیتم محصولات پیدا شد، مجلات رو درست بعدش می‌ذاریم؛ وگرنه ته منو
  if (productsIndex === -1) return [...menu, magazineItem];

  const withMagazine = [...menu];
  withMagazine.splice(productsIndex + 1, 0, magazineItem);
  return withMagazine;
}

function Header() {
  const { data, loading, error, isMobileOpen, toggleMobileMenu, closeMobileMenu, retry } =
    useHeader();
  const { cartEnabled, contactPhone } = useSiteConfig();
  const isScrolled = useScrolled();

  if (loading) return null;

  // خطا هم بخوره، هدر با دیتای پیش‌فرض نمایش داده می‌شه تا کاربر گیر نیفته؛
  // فقط یک نوار کوچیک برای اطلاع و امکان تلاش مجدد نشون داده می‌شه.
  const rawHeaderData = data ?? FALLBACK_HEADER_DATA;
  const headerData: HeaderData = {
    ...rawHeaderData,
    menu: ensureMagazineMenuItem(rawHeaderData.menu),
  };

  return (
    <>
      <header
        className={`
          relative
          z-50
          mx-auto
          flex
          max-w-[1500px]
          items-center
          rounded-2xl
          border
          border-white/10
          px-4
          shadow-[0_10px_40px_rgba(0,0,0,.35)]
          backdrop-blur-2xl
          transition-all
          duration-300
          md:px-8
          ${isScrolled ? "h-16 bg-[#07111f]/95 sm:h-20" : "h-20 bg-[#07111f]/70 sm:h-24"}
        `}
      >
        <div className="flex w-full items-center justify-between gap-2">
          {/* بخش اکشن‌ها (سمت چپ) - در دسکتاپ فضای یکسان با لوگو می‌گیرد تا منو وسط بماند */}
          <div className="flex flex-1 items-center justify-start gap-2 sm:gap-4">
            {/* دکمه منوی همبرگری - فقط در موبایل و تبلت */}
            <div className="lg:hidden">
              <MobileMenu open={isMobileOpen} onClick={toggleMobileMenu} />
            </div>

            {/* دکمه تماس مستقیم - فقط دسکتاپ، و فقط اگه شماره‌ای ست شده باشه */}
            {contactPhone && (
              <div className="hidden lg:block">
                <CallButton phone={contactPhone} />
              </div>
            )}

            {/* جستجوی محصول */}
            <div className="hidden sm:block">
              <SearchToggle />
            </div>

            {/* آیکون علاقه‌مندی‌ها */}
            <div className="hidden sm:block">
              <FavoritesIcon />
            </div>

            {/* آیکون سبد خرید - فقط وقتی از تنظیمات ادمین فعال باشه */}
            {cartEnabled && <CartIcon />}

            {/* دکمه ورود - در موبایل‌های خیلی کوچک مخفی می‌شود تا هدر نشکند */}
            <div className="hidden sm:block">
              <AuthButton />
            </div>
          </div>

          {/* منوی اصلی - فقط در دسکتاپ (دقیقاً در وسط قرار می‌گیرد) */}
          <div className="hidden lg:block pr-40">
            <NavLinks items={headerData.menu} />
          </div>

          {/* لوگو (سمت راست) - در دسکتاپ فضای یکسان با اکشن‌ها می‌گیرد */}
          <div className="flex min-w-0 flex-1 items-center justify-end">
            <Logo
              title={headerData.headerTitle}
              subtitle={headerData.headerSubtitle}
              logoImage={headerData.logoImage}
            />
          </div>
        </div>
      </header>

      {/* اگه دیتای واقعی هدر لود نشد، یک نوار کوچیک برای اطلاع و تلاش مجدد */}
      {error && (
        <div className="relative z-40 mx-auto mt-2 flex max-w-[1500px] items-center justify-center gap-2 px-4">
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-300">
            <span>{error}</span>
            <button
              type="button"
              onClick={retry}
              className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <RefreshCw size={12} />
              تلاش مجدد
            </button>
          </div>
        </div>
      )}

      {/* دراور موبایل */}
      <MobileDrawer
        open={isMobileOpen}
        items={headerData.menu}
        onClose={closeMobileMenu}
      />
    </>
  );
}

export default Header;
