import { Newspaper } from "lucide-react";
import Pagination from "../shared/Pagination";
import { useMagazineList } from "./hooks/useMagazineList";
import MagazineCard from "./components/MagazineCard";
import MagazineFiltersBar from "./components/MagazineFiltersBar";

const PAGE_SIZE = 9;

export default function MagazineListSection() {
  const {
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
  } = useMagazineList(PAGE_SIZE);

  return (
    <div dir="rtl">
      <section className="relative overflow-hidden pb-10 pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <Newspaper size={13} />
            مجله صدیقی
          </div>

          <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            راهنما، ترندها و نکات کاشی و سرامیک
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/60">
            قبل از خرید کاشی، سرامیک یا شیرآلات، این مقاله‌ها رو بخون تا
            انتخابت آگاهانه‌تر باشه.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <MagazineFiltersBar
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onChange={updateFilter}
          onReset={resetFilters}
        />

        {!isLoading && pagination && pagination.total > 0 && (
          <p className="mt-5 text-xs text-white/40">
            {pagination.total.toLocaleString("fa-IR")} مقاله پیدا شد
          </p>
        )}

        <div className="mt-6">
          {isLoading && (
            <p className="py-16 text-center text-sm text-white/40">
              در حال بارگذاری مقاله‌ها...
            </p>
          )}

          {!isLoading && error && (
            <p className="py-16 text-center text-sm text-red-300">{error}</p>
          )}

          {!isLoading && !error && articles.length === 0 && (
            <p className="py-16 text-center text-sm text-white/40">
              {hasActiveFilters
                ? "مقاله‌ای با این فیلتر پیدا نشد."
                : "هنوز مقاله‌ای منتشر نشده."}
            </p>
          )}

          {!isLoading && !error && articles.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <MagazineCard key={article._id} article={article} />
              ))}
            </div>
          )}
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
