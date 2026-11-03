import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useCategoriesMenu } from "../hooks/useCategoriesMenu";

interface Props {
  title: string;
  fallbackPath: string;
}

export default function ProductsNavItem({ title, fallbackPath }: Props) {
  const { categories, isLoading } = useCategoriesMenu();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname.startsWith("/products");

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to={fallbackPath}
        aria-current={isActive ? "page" : undefined}
        className={`
          relative
          flex
          items-center
          gap-1
          text-[15px]
          font-medium
          transition-colors
          duration-300
          after:absolute
          after:left-0
          after:-bottom-2
          after:h-[2px]
          after:bg-brand
          after:transition-all
          hover:text-brand
          hover:after:w-full
          ${isActive ? "text-brand after:w-full" : "text-white/90 after:w-0"}
        `}
      >
        {title}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      {isOpen && (
        <div
          dir="rtl"
          className="absolute right-0 top-full z-50 min-w-[190px] rounded-2xl border border-white/10 bg-[#0b1522] p-2 shadow-[0_20px_50px_rgba(0,0,0,.5)]"
        >
          {isLoading && (
            <p className="px-3 py-2 text-xs text-white/40">در حال بارگذاری...</p>
          )}

          {!isLoading && categories.length === 0 && (
            <p className="px-3 py-2 text-xs text-white/40">دسته‌بندی‌ای یافت نشد.</p>
          )}

          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${category._id}`}
              className="block rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-brand-light"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
