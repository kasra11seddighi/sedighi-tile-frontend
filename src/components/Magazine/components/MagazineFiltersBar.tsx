import { Search, X, SlidersHorizontal } from "lucide-react";
import { useMagazineTags } from "../hooks/useMagazineTags";
import type { MagazineFilters } from "../hooks/useMagazineList";

interface Props {
  filters: MagazineFilters;
  hasActiveFilters: boolean;
  onChange: <K extends keyof MagazineFilters>(
    key: K,
    value: MagazineFilters[K],
  ) => void;
  onReset: () => void;
}

const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-brand/50 focus:bg-white/[0.06] [&>option]:bg-zinc-900 [&>option]:text-white";

export default function MagazineFiltersBar({
  filters,
  hasActiveFilters,
  onChange,
  onReset,
}: Props) {
  const { tags } = useMagazineTags();

  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-white/10 bg-white/2.5 p-4 sm:p-5"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-brand" />

          <span className="text-sm font-medium text-white/80">
            فیلتر مقاله‌ها
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

      {/* Search */}
      <div className="relative">
        <Search
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/25"
        />

        <input
          type="text"
          placeholder="جستجوی عنوان مقاله..."
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          className={`${inputClass} h-12 pr-11`}
        />
      </div>

      {/* Tag - فقط اگه تگی توی بک‌اند ثبت شده باشه نشون داده می‌شه */}
      {tags.length > 0 && (
        <div className="mt-3">
          <label className="mb-1.5 block text-[11px] text-white/35">
            تگ
          </label>

          <select
            value={filters.tag}
            onChange={(e) => onChange("tag", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-zinc-900 text-white">
              همه تگ‌ها
            </option>

            {tags.map((tag) => (
              <option key={tag} value={tag} className="bg-zinc-900 text-white">
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
