import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "../types/header.types";
import ProductsNavItem from "./ProductsNavItem";

interface Props {
  items: NavItem[];
}

function isProductsItem(item: NavItem) {
  return item.path === "/products" || item.title === "محصولات";
}

// آیتم فعال (صفحه‌ی فعلی) رو تشخیص می‌ده تا توی منو هایلایت بشه؛ برای
// مسیرهای غیر از خانه، زیرمسیرها (مثلاً /magazine/فلان-مقاله) هم بخشی از
// همون آیتم حساب می‌شن.
function useIsActivePath() {
  const location = useLocation();

  return (path: string) => {
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };
}

function NavLinks({ items }: Props) {
  const isActivePath = useIsActivePath();

  return (
    <nav
      className="
hidden
lg:flex
items-center
gap-8
font-iran
"
    >
      {items.map((item) =>
        isProductsItem(item) ? (
          <ProductsNavItem
            key={item._id ?? item.path}
            title={item.title}
            fallbackPath={item.path}
          />
        ) : (
          <Link
            key={item._id ?? item.path}
            to={item.path}
            aria-current={isActivePath(item.path) ? "page" : undefined}
            className={`
      relative
      font-medium
      text-[15px]
      transition-all
      duration-300
      after:absolute
      after:left-0
      after:-bottom-2
      after:h-[2px]
      after:bg-brand
      after:transition-all
      hover:text-brand
      hover:after:w-full
      ${
        isActivePath(item.path)
          ? "text-brand after:w-full"
          : "text-white/90 after:w-0"
      }
    `}
          >
            {item.title}
          </Link>
        ),
      )}
    </nav>
  );
}

export default NavLinks;
