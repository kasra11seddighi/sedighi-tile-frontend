import { X, Heart } from "lucide-react";

import type { NavItem } from "../types/header.types";
import MobileDrawerFooter from "./MobileDrawerFooter";
import HeaderSearchForm from "./HeaderSearchForm";
import { useSiteConfig } from "../../../context/SiteConfigContext";
import { useAuth } from "../../../context/AuthContext";
import { useFavorites } from "../../../context/FavoritesContext";

interface Props {
  open: boolean;
  items: NavItem[];
  onClose: () => void;
}

function MobileDrawer({ open, items, onClose }: Props) {
  const { contactPhone, social } = useSiteConfig();
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const favoritesCount = isAuthenticated ? favorites.length : 0;
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[60]
          bg-black/60
          backdrop-blur-sm
          transition-opacity
          duration-300
          lg:hidden
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`
          fixed
          top-0
          right-0
          z-[70]
          h-full
          w-[300px]
          max-w-[86vw]
          bg-[#07111f]
          shadow-2xl
          transition-transform
          duration-500
          ease-out
          lg:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Header Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div className="text-right">
              <h2 className="text-lg font-black text-[#D8B28B]">منو</h2>

              <p className="mt-1 text-xs text-white/40">دسترسی سریع</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="بستن منو"
              className="
                rounded-xl
                bg-white/5
                p-2
                text-white/80
                transition
                duration-300
                hover:bg-white/10
                hover:text-white
              "
            >
              <X size={22} />
            </button>
          </div>

          {/* جستجوی محصول */}
          <div className="border-b border-white/10 p-4">
            <HeaderSearchForm onSubmitted={onClose} />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
            {items.map((item, index) => (
              <a
                key={item._id ?? `${item.path}-${index}`}
                href={item.path}
                onClick={onClose}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3.5
                  text-right
                  transition-all
                  duration-300
                  hover:bg-[#D8B28B]/10
                "
                style={{
                  transitionDelay: open ? `${index * 45}ms` : "0ms",
                  transform: open ? "translateX(0)" : "translateX(18px)",
                  opacity: open ? 1 : 0,
                }}
              >
                <span className="text-[16px] font-medium text-white/90 transition-colors group-hover:text-[#D8B28B]">
                  {item.title}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-[#D8B28B] opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}

            {/* لینک علاقه‌مندی‌ها - معادل موبایلِ آیکون قلب توی هدر دسکتاپ */}
            <a
              href={isAuthenticated ? "/profile?tab=favorites" : "/login"}
              onClick={onClose}
              className="
                group
                flex
                items-center
                justify-between
                rounded-2xl
                px-4
                py-3.5
                text-right
                transition-all
                duration-300
                hover:bg-[#D8B28B]/10
              "
            >
              <span className="flex items-center gap-2 text-[16px] font-medium text-white/90 transition-colors group-hover:text-[#D8B28B]">
                <Heart size={16} />
                علاقه‌مندی‌ها
              </span>

              {favoritesCount > 0 && (
                <span className="rounded-full bg-[#D8B28B]/15 px-2 py-0.5 text-[11px] font-bold text-[#D8B28B]">
                  {favoritesCount}
                </span>
              )}
            </a>
          </nav>

          {/* Footer جداشده - لینک‌های واقعی از تنظیمات سایت (نه دیگه هاردکد) */}
          <MobileDrawerFooter
            onClose={onClose}
            authLink="/login"
            instagramLink={social.instagram}
            telegramLink={social.telegram}
            phoneLink={contactPhone ? `tel:${contactPhone}` : undefined}
          />
        </div>
      </aside>
    </>
  );
}

export default MobileDrawer;
