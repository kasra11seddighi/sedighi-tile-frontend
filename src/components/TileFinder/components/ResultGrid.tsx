import ProductCard from "../../shared/ProductCard";
import Pagination from "../../shared/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import { useSiteConfig } from "../../../context/SiteConfigContext";
import type { Product } from "../types/tileFinder.types";

interface Props {
  products: Product[];
}

const ITEMS_PER_PAGE = 8;

export default function ResultGrid({ products }: Props) {
  const { page, setPage, totalPages, paginatedItems } = usePagination(
    products,
    ITEMS_PER_PAGE,
  );
  const { contactPhone } = useSiteConfig();

  return (
    <div dir="rtl">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {paginatedItems.map((product) => (
          <ProductCard
            key={product._id}
            theme="light"
            showPrice={false}
            product={{
              id: product._id,
              slug: product.slug,
              name: product.title,

              image: product.images
                ? resolveImageUrl(product.images)
                : undefined,
              price: product.price,
              brandName: product.brand?.name,
            }}
            // این بخش (کاشی‌یاب) همیشه دکمه‌ی «تماس بگیرید» رو نشون می‌ده،
            // مستقل از فعال بودن سبد خرید در تنظیمات سراسری سایت
            cartEnabled={false}
            contactPhone={contactPhone}
            aiVisualizerHref={`/?tile=${product._id}#room-visualizer`}
          />
        ))}
      </div>

      {products.length > ITEMS_PER_PAGE && (
        <Pagination page={page} pages={totalPages} onChange={setPage} />
      )}
    </div>
  );
}
