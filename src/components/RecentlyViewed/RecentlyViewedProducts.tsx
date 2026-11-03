import { useRecentlyViewedProducts } from "./hooks/useRecentlyViewedProducts";
import { toCardProduct } from "../Products/utils/toCardProduct";
import { isTileCategory } from "../../utils/isTileCategory";
import { useSiteConfig } from "../../context/SiteConfigContext";
import ProductCard from "../shared/ProductCard";

interface Props {
  /** توی صفحه‌ی خود محصول، شناسه‌ی همون محصول رو بده تا خودش رو توی لیست نبینه */
  excludeId?: string;
  className?: string;
}

// بازدیدهای اخیر کاربر (بر اساس localStorage - نه سرور)؛ هم توی صفحه‌ی
// اصلی و هم پایین صفحه‌ی جزئیات محصول استفاده می‌شه. اگه کاربر هنوز
// محصولی ندیده باشه، خودش چیزی رندر نمی‌کنه.
export default function RecentlyViewedProducts({ excludeId, className }: Props) {
  const { products, isLoading } = useRecentlyViewedProducts(excludeId);
  const { cartEnabled, contactPhone } = useSiteConfig();

  if (isLoading || products.length === 0) return null;

  return (
    <section dir="rtl" className={className ?? "mx-auto max-w-6xl px-4 py-12"}>
      <h2 className="mb-6 text-lg font-black text-white sm:text-xl">
        بازدیدهای اخیر شما
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={toCardProduct(product)}
            showPrice={false}
            cartEnabled={cartEnabled}
            contactPhone={contactPhone}
            aiVisualizerHref={
              isTileCategory(product.category?.name)
                ? `/?tile=${product._id}#room-visualizer`
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
