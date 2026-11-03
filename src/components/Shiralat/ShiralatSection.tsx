import { ArrowLeft, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { useShiralat } from "./hooks/useShiralat";
import ProductCard from "../shared/ProductCard";
import Pagination from "../shared/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useSiteConfig } from "../../context/SiteConfigContext";

const ITEMS_PER_PAGE = 8;

export default function ShiralatSection() {
  const { products, loading, categoryFound } = useShiralat();
  const { page, setPage, totalPages, paginatedItems } = usePagination(
    products,
    ITEMS_PER_PAGE,
  );
  const { contactPhone } = useSiteConfig();

  const isEmpty = !loading && (!categoryFound || products.length === 0);

  return (
    <section id="shiralat" dir="rtl" className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* هدر سکشن */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-sm font-medium text-brand-light">
              <span className="h-px w-10 bg-brand-light/70" />
              <Droplets size={15} />
              <span>شیرآلات لوکس</span>
            </div>

            <h2 className="text-2xl font-black text-white sm:text-3xl">
              کیفیت و ظرافت در هر قطره
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
              مجموعه‌ای منتخب از شیرآلات آشپزخانه و حمام با طراحی مدرن و
              پوشش‌های ضدخوردگی برای فضایی شیک و ماندگار.
            </p>
          </div>

          {!isEmpty && (
            <Link
              to="/products"
              className="group flex shrink-0 items-center gap-2 self-start text-sm font-medium text-gray-300 transition-colors hover:text-white sm:self-auto"
            >
              مشاهده همه شیرآلات
              <ArrowLeft
                size={18}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
            </Link>
          )}
        </div>

        {/* گرید محصولات */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[3/4.2] animate-pulse rounded-3xl border border-white/10 bg-white/3"
              />
            ))}
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center gap-3 rounded-[1.75rem] border border-dashed border-white/10 bg-white/2 px-6 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-brand">
              <Droplets size={22} />
            </span>
            <p className="text-sm font-medium text-white/70">
              هنوز محصولی در دسته «شیرآلات» ثبت نشده است
            </p>
            <p className="max-w-md text-xs leading-6 text-white/40">
              برای نمایش این بخش، از پنل مدیریت یک دسته‌بندی با نام «شیرآلات»
              بساز و چند محصول به آن اضافه کن؛ این سکشن خودکار پر می‌شود.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {paginatedItems.map((product) => (
                <ProductCard
                  key={product._id}
                  showPrice={false}
                  product={{
                    id: product._id,
                    name: product.name,
                    slug: product.slug,
                    image: product.images?.[0]
                      ? resolveImageUrl(product.images[0])
                      : undefined,
                    price: product.price,
                    discountPrice: product.discountPrice,
                    brandName: product.brand?.name,
                  }}
                  // بخش شیرآلات همیشه دکمه‌ی «تماس بگیرید» رو نشون می‌ده،
                  // مستقل از فعال بودن سبد خرید در تنظیمات سراسری سایت
                  cartEnabled={false}
                  contactPhone={contactPhone}
                />
              ))}
            </div>

            {products.length > ITEMS_PER_PAGE && (
              <Pagination
                page={page}
                pages={totalPages}
                onChange={setPage}
                variant="dark"
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
