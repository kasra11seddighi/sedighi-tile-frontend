import { useEffect, useRef, useState } from "react";
import { getProjectsRequest } from "../services/projects.service";
import type {
  Project,
  ProjectsPagination,
  ProjectSortOption,
} from "../types/projects.types";

const PAGE_SIZE = 9;
const SEARCH_DEBOUNCE_MS = 400;

export interface ProjectFilters {
  search: string;
  category: string; // "" یعنی همه دسته‌بندی‌ها
  sort: ProjectSortOption;
}

const initialFilters: ProjectFilters = {
  search: "",
  category: "",
  sort: "-createdAt",
};

// همون الگوی useProducts (نگاه کن به Products/hooks/useProducts.ts) اما
// بدون فیلتر بازه‌ی قیمت، چون پروژه‌ها قیمت ندارن.
export function useProjects(initialCategory: string = "") {
  const [filters, setFilters] = useState<ProjectFilters>({
    ...initialFilters,
    category: initialCategory,
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<ProjectsPagination | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(filters.search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [filters.search]);

  const lastFetchedFiltersKey = useRef<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const filtersKey = JSON.stringify({
      s: debouncedSearch,
      c: filters.category,
      sort: filters.sort,
    });

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

        const res = await getProjectsRequest({
          search: debouncedSearch || undefined,
          category: filters.category || undefined,
          sort: filters.sort,
          page: pageToFetch,
          limit: PAGE_SIZE,
        });

        if (!isCancelled) {
          lastFetchedFiltersKey.current = filtersKey;
          setProjects(res.projects);
          setPagination(res.pagination);
        }
      } catch {
        if (!isCancelled) {
          lastFetchedFiltersKey.current = filtersKey;
          setError("دریافت پروژه‌ها با خطا مواجه شد. دوباره تلاش کنید.");
          setProjects([]);
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
  }, [debouncedSearch, filters.category, filters.sort, page]);

  function updateFilter<K extends keyof ProjectFilters>(
    key: K,
    value: ProjectFilters[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters({ ...initialFilters, category: initialCategory });
  }

  const hasActiveFilters =
    Boolean(filters.search) ||
    filters.category !== initialCategory ||
    filters.sort !== initialFilters.sort;

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    projects,
    pagination,
    page,
    setPage,
    isLoading,
    error,
  };
}
