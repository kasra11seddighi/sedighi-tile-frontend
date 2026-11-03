import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useRelatedProducts } from "../hooks/useRelatedProducts";
import { toCardProduct } from "../utils/toCardProduct";
import { isTileCategory } from "../../../utils/isTileCategory";
import { useSiteConfig } from "../../../context/SiteConfigContext";
import ProductCard from "../../shared/ProductCard";
import type { Category } from "../types/products.types";

interface Props {
  categoryId: string | undefined;
  category: Category | undefined | null;
  excludeId: string | undefined;
}

// Cross-sell روی خود صفحه‌ی محصول: چند محصول دیگه از همون دسته‌بندی، زیر
// مشخصات فنی. با «نظرات کاربران» فرق داره - اونجا نظر بقیه رو می‌بینی،
// اینجا محصولات مشابه رو. خودش وقتی محصول مشابهی نباشه چیزی رندر نمی‌کنه.
export default function RelatedProducts({ categoryId, category, excludeId }: Props) {
  const { products, isLoading } = useRelatedProducts(categoryId, excludeId);
  const { cartEnabled, contactPhone } = useSiteConfig();

  if (isLoading || products.length === 0) return null;

  return (
    <div className="mt-4 border-t border-white/10 pt-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-lg font-black text-white sm:text-xl">
          شاید این‌ها رو هم دوست داشته باشی
        </h2>
        {category && (
          <Link
            to={`/products?category=${category.slug}`}
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-brand-light transition-colors hover:text-[#e3b27e]"
          >
            دیدن همه‌ی این دسته
            <ArrowLeft size={14} />
          </Link>
        )}
      </div>

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
    </div>
  );
}
