import { Building2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import Pagination from "../shared/Pagination";

import { useProjects } from "./hooks/useProjects";
import { useProjectCategories } from "./hooks/useProjectCategories";

import ProjectFiltersBar from "./components/ProjectFiltersBar";
import ProjectGrid from "./components/ProjectGrid";
import { useSeo } from "../../hooks/useSeo";

interface Props {
  initialCategory?: string;
}

export default function ProjectsSection({ initialCategory = "" }: Props) {
  const [, setSearchParams] = useSearchParams();
  const { categories } = useProjectCategories();

  const {
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
  } = useProjects(initialCategory);

  const selectedCategory = categories.find(
    (cat) => cat._id === filters.category,
  );

  useSeo({
    title: selectedCategory?.name || "پروژه‌ها",
    description: "نمونه‌کارها و پروژه‌های اجراشده‌ی نمایندگی صدیقی.",
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

  const title = selectedCategory
    ? `پروژه‌های ${selectedCategory.name}`
    : "پروژه‌های اجراشده";
  const description = selectedCategory
    ? `پروژه‌های اجراشده در دسته «${selectedCategory.name}» رو ببین.`
    : "نمونه‌ای از پروژه‌هایی که با کاشی، سرامیک و شیرآلات ما اجرا شدن.";

  return (
    <div dir="rtl">
      <section className="relative overflow-hidden pb-10 pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <Building2 size={13} />
            پروژه‌ها
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
        <ProjectFiltersBar
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {!isLoading && pagination && pagination.total > 0 && (
          <p className="mt-5 text-xs text-white/40">
            {pagination.total.toLocaleString("fa-IR")} پروژه پیدا شد
          </p>
        )}

        <div className="mt-6">
          <ProjectGrid projects={projects} isLoading={isLoading} error={error} />
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
