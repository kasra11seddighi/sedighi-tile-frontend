import { Search, X, SlidersHorizontal } from "lucide-react";
import { useProjectCategories } from "../hooks/useProjectCategories";
import type { ProjectFilters } from "../hooks/useProjects";
import type { ProjectSortOption } from "../types/projects.types";

interface Props {
  filters: ProjectFilters;
  hasActiveFilters: boolean;
  onChange: <K extends keyof ProjectFilters>(
    key: K,
    value: ProjectFilters[K],
  ) => void;
  onReset: () => void;
}

// چون پروژه‌ها قیمت ندارن، فعلاً فقط «جدیدترین/قدیمی‌ترین» معنی داره؛
// اگه بعداً بک‌اند اندپوینت قابل‌ویرایش برای این لیست اضافه کرد،
// می‌شه مثل useSortOptions توی Products از سرور خوندش.
const SORT_OPTIONS: { value: ProjectSortOption; label: string }[] = [
  { value: "-createdAt", label: "جدیدترین" },
  { value: "createdAt", label: "قدیمی‌ترین" },
];

const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-brand/50 focus:bg-white/[0.06]";

export default function ProjectFiltersBar({
  filters,
  hasActiveFilters,
  onChange,
  onReset,
}: Props) {
  const { categories } = useProjectCategories();

  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-white/10 bg-white/2.5 p-4 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-brand" />
          <span className="text-sm font-medium text-white/80">
            فیلتر پروژه‌ها
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-brand-light"
          >
            <X size={13} />
            پاک کردن فیلترها
          </button>
        )}
      </div>

      <div className="relative">
        <Search
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/25"
        />

        <input
          type="text"
          placeholder="جستجوی پروژه..."
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          className={`${inputClass} h-12 pr-11`}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[11px] text-white/35">
            دسته‌بندی
          </label>

          <select
            value={filters.category}
            onChange={(e) => onChange("category", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">همه دسته‌بندی‌ها</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] text-white/35">
            مرتب‌سازی
          </label>

          <select
            value={filters.sort}
            onChange={(e) =>
              onChange("sort", e.target.value as ProjectSortOption)
            }
            className={`${inputClass} cursor-pointer`}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
