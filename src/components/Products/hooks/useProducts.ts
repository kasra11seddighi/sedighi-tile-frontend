import { useEffect, useRef, useState } from "react";
import { getProductsRequest } from "../services/products.service";
import type { Pagination, Product, SortOption } from "../types/products.types";

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 400;

export interface ProductFilters {
  search: string;
  category: string; // "" یعنی همه دسته‌بندی‌ها
  brand: string; // "" یعنی همه برندها
  size: string; // "" یعنی همه سایزها
  style: string; // "" یعنی همه استایل‌ها
  color: string; // "" یعنی همه رنگ‌ها
  location: string; // "" یعنی همه مکان‌ها (کف/دیوار و ...)
  minPrice: string; // به‌صورت رشته نگه داشته می‌شود تا اینپوت خالی مجاز باشد
  maxPrice: string;
  sort: SortOption;
}

const initialFilters: ProductFilters = {
  search: "",
  category: "",
  brand: "",
  size: "",
  style: "",
  color: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  sort: "-createdAt",
};

export function useProducts(
  initialCategory: string = "",
  initialBrand: string = "",
  initialSearch: string = "",
) {
  const [filters, setFilters] = useState<ProductFilters>({
    ...initialFilters,
    category: initialCategory,
    brand: initialBrand,
    search: initialSearch,
  });
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch.trim());
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // debounce روی جستجوی متنی تا با هر حرف تایپ، درخواست نره
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(filters.search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [filters.search]);

  // یک ref که آخرین ترکیب فیلترهایی که واقعاً فچ شده رو نگه می‌داره.
  // با این، توی خودِ افکت اصلی تشخیص می‌دیم که آیا این تغییر به‌خاطر
  // عوض‌شدن فیلترهاست (که باید صفحه رو بی‌قید و شرط ۱ در نظر بگیریم)
  // یا صرفاً تغییر صفحه‌ست. این‌طوری هیچ‌وقت دو تا فچ پشت‌سرهم
  // (یکی با صفحه‌ی قدیمی، یکی با صفحه‌ی ۱) اتفاق نمی‌افته.
  const lastFetchedFiltersKey = useRef<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const filtersKey = JSON.stringify({
      s: debouncedSearch,
      c: filters.category,
      b: filters.brand,
      sz: filters.size,
      st: filters.style,
      co: filters.color,
      lo: filters.location,
      min: filters.minPrice,
      max: filters.maxPrice,
      sort: filters.sort,
    });

    const filtersChanged = lastFetchedFiltersKey.current !== null && lastFetchedFiltersKey.current !== filtersKey;
    const pageToFetch = filtersChanged ? 1 : page;

    // اگه فیلتر عوض شده و صفحه‌ی فعلی از قبل ۱ نبوده، فقط state رو آپدیت
    // می‌کنیم؛ همین تغییرِ page باعث اجرای دوباره‌ی همین افکت با
    // pageToFetch === page می‌شه و از اونجا فچ واقعی انجام می‌گیره.
    if (filtersChanged && page !== 1) {
      setPage(1);
      return;
    }

    async function load() {
      try {
        setIsLoading(true);
        setError("");

        const minPrice = filters.minPrice ? Number(filters.minPrice) : undefined;
        const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : undefined;

        const res = await getProductsRequest({
          search: debouncedSearch || undefined,
          category: filters.category || undefined,
          brand: filters.brand || undefined,
          size: filters.size || undefined,
          style: filters.style || undefined,
          color: filters.color || undefined,
          location: filters.location || undefined,
          minPrice,
          maxPrice,
          sort: filters.sort,
          page: pageToFetch,
          limit: PAGE_SIZE,
        });

        if (!isCancelled) {
          lastFetchedFiltersKey.current = filtersKey;
          setProducts(res.products);
          setPagination(res.pagination);
        }
      } catch {
        if (!isCancelled) {
          lastFetchedFiltersKey.current = filtersKey;
          setError("دریافت محصولات با خطا مواجه شد. دوباره تلاش کنید.");
          setProducts([]);
          setPagination(null);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [
    debouncedSearch,
    filters.category,
    filters.brand,
    filters.size,
    filters.style,
    filters.color,
    filters.location,
    filters.minPrice,
    filters.maxPrice,
    filters.sort,
    page,
  ]);

  function updateFilter<K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters({
      ...initialFilters,
      category: initialCategory,
      brand: initialBrand,
      search: initialSearch,
    });
  }

  const hasActiveFilters =
    filters.search !== initialSearch ||
    filters.category !== initialCategory ||
    filters.brand !== initialBrand ||
    Boolean(filters.size) ||
    Boolean(filters.style) ||
    Boolean(filters.color) ||
    Boolean(filters.location) ||
    Boolean(filters.minPrice) ||
    Boolean(filters.maxPrice) ||
    filters.sort !== initialFilters.sort;

  return {
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
  };
}
