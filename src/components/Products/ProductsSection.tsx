import { ShoppingBag } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import Pagination from "../shared/Pagination";

import { useProducts } from "./hooks/useProducts";
import { useCategories } from "./hooks/useCategories";
import { useBrands } from "../cards/hooks/useBrands";

import ProductFiltersBar from "./components/ProductFiltersBar";

import ProductGrid from "./components/ProductGrid";
import { useSeo } from "../../hooks/useSeo";

interface Props {
  initialCategory?: string;
  initialBrand?: string;
  initialSearch?: string;
}

export default function ProductsSection({
  initialCategory = "",
  initialBrand = "",
  initialSearch = "",
}: Props) {
  const [, setSearchParams] = useSearchParams();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    products,
    pagination,
    page,
    setPage,
    isLoading,
    error,
  } = useProducts(initialCategory, initialBrand, initialSearch);

  const selectedCategory = categories.find(
    (cat) => cat._id === filters.category,
  );
  const selectedBrand = brands.find((b) => b._id === filters.brand);

  // اگه فیلتر دسته/برند فعال باشه، توی عنوان هم منعکس می‌شه
  useSeo({
    title: selectedCategory?.name || selectedBrand?.name || "محصولات",
    description:
      "مشاهده و خرید محصولات کاشی، سرامیک و لوازم ساختمانی نمایندگی صدیقی.",
  });

  function handleCategoryChange(categoryId: string) {
    updateFilter("category", categoryId);
    setSearchParams(categoryId ? { category: categoryId } : {}, {
      replace: true,
    });
  }

  function handleFilterChange<K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K],
  ) {
    if (key === "category") {
      handleCategoryChange(value as string);
    } else {
      updateFilter(key, value);
    }
  }

  const title = initialSearch
    ? `نتایج جستجو برای «${initialSearch}»`
    : selectedCategory
      ? selectedCategory.name
      : selectedBrand
        ? `محصولات ${selectedBrand.name}`
        : "همه محصولات";
  const description = initialSearch
    ? "می‌تونی نتایج رو با دسته‌بندی، برند و بازه قیمتی هم فیلتر کنی."
    : selectedCategory
      ? `محصولات دسته «${selectedCategory.name}» رو با جستجو، بازه قیمتی و مرتب‌سازی فیلتر کن.`
      : selectedBrand
        ? `محصولات مخصوص برند «${selectedBrand.name}» رو ببین.`
        : "محصولات رو با جستجو، دسته‌بندی و بازه قیمتی فیلتر کن تا چیزی که دنبالشی رو سریع‌تر پیدا کنی.";

  return (
    <div dir="rtl">
      <section className="relative overflow-hidden pb-10 pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <ShoppingBag size={13} />
            محصولات
          </div>

          <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            {title}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/60">
            {description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <ProductFiltersBar
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {!isLoading && pagination && pagination.total > 0 && (
          <p className="mt-5 text-xs text-white/40">
            {pagination.total.toLocaleString("fa-IR")} محصول پیدا شد
          </p>
        )}

        <div className="mt-6">
          <ProductGrid
            products={products}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {pagination && (
          <Pagination
            page={page}
            pages={pagination.pages}
            onChange={setPage}
            variant="dark"
          />
        )}
      </section>
    </div>
  );
}
