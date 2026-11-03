import { useEffect, useRef, useState } from "react";
import { getMagazineList } from "../services/magazine.service";
import type { MagazineListItem, MagazinePagination } from "../types/magazine.types";

const SEARCH_DEBOUNCE_MS = 400;

export interface MagazineFilters {
  search: string;
  tag: string;
}

const initialFilters: MagazineFilters = { search: "", tag: "" };

// limit: چند مقاله توی هر صفحه بیاد (صفحه اصلی 3 تا می‌خواد، صفحه کامل مجلات بیشتر)
export function useMagazineList(limit: number) {
  const [filters, setFilters] = useState<MagazineFilters>(initialFilters);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const [articles, setArticles] = useState<MagazineListItem[]>([]);
  const [pagination, setPagination] = useState<MagazinePagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // debounce روی جستجوی متنی تا با هر حرف تایپ، درخواست نره
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(filters.search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [filters.search]);

  // همون منطق useProducts: وقتی فیلتر عوض می‌شه صفحه برمی‌گرده به 1،
  // بدون اینکه دو تا فچ پشت‌سرهم (صفحه قدیمی + صفحه 1) اتفاق بیفته.
  const lastFetchedFiltersKey = useRef<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const filtersKey = JSON.stringify({ s: debouncedSearch, t: filters.tag });
    const filtersChanged =
      lastFetchedFiltersKey.current !== null &&
      lastFetchedFiltersKey.current !== filtersKey;
    const pageToFetch = filtersChanged ? 1 : page;

    if (filtersChanged && page !== 1) {
      setPage(1);
      return;
    }

    async function load() {
      try {
        setIsLoading(true);
        setError("");

        const res = await getMagazineList({
          search: debouncedSearch || undefined,
          tag: filters.tag || undefined,
          page: pageToFetch,
          limit,
        });

        if (!isCancelled) {
          lastFetchedFiltersKey.current = filtersKey;
          setArticles(res.articles);
          setPagination(res.pagination);
        }
      } catch {
        if (!isCancelled) {
          lastFetchedFiltersKey.current = filtersKey;
          setError("دریافت مقاله‌ها با خطا مواجه شد.");
          setArticles([]);
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
  }, [debouncedSearch, filters.tag, page, limit]);

  function updateFilter<K extends keyof MagazineFilters>(
    key: K,
    value: MagazineFilters[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  const hasActiveFilters = Boolean(filters.search) || Boolean(filters.tag);

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    articles,
    pagination,
    page,
    setPage,
    isLoading,
    error,
  };
}
