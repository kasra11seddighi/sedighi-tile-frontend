import { Search, X, SlidersHorizontal } from "lucide-react";
import { useCategories } from "../hooks/useCategories";
import { useSortOptions } from "../hooks/useSortOptions";
import { useProductFilterOptions } from "../hooks/useProductFilterOptions";
import type { ProductFilters } from "../hooks/useProducts";

interface Props {
  filters: ProductFilters;
  hasActiveFilters: boolean;
  onChange: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K],
  ) => void;
  onReset: () => void;
}

const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-brand/50 focus:bg-white/[0.06] [&>option]:bg-zinc-900 [&>option]:text-white";

export default function ProductFiltersBar({
  filters,
  hasActiveFilters,
  onChange,
  onReset,
}: Props) {
  const { categories } = useCategories();
  useSortOptions();
  const { sizes, styles, colors } = useProductFilterOptions();

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
            فیلتر محصولات
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
          placeholder="جستجوی محصول..."
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          className={`${inputClass} h-12 pr-11`}
        />
      </div>

      {/* Filters */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Category */}
        <div>
          <label className="mb-1.5 block text-[11px] text-white/35">
            دسته‌بندی
          </label>

          <select
            value={filters.category}
            onChange={(e) => onChange("category", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-zinc-900 text-white">
              همه دسته‌بندی‌ها
            </option>

            {categories.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
                className="bg-zinc-900 text-white"
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="mb-1.5 block text-[11px] text-white/35">سایز</label>

          <select
            value={filters.size}
            onChange={(e) => onChange("size", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-zinc-900 text-white">
              همه سایزها
            </option>

            {sizes.map((size) => (
              <option
                key={size._id}
                value={size._id}
                className="bg-zinc-900 text-white"
              >
                {size.name}
              </option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
          <label className="mb-1.5 block text-[11px] text-white/35">رنگ</label>

          <select
            value={filters.color}
            onChange={(e) => onChange("color", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-zinc-900 text-white">
              همه رنگ‌ها
            </option>

            {colors.map((color) => (
              <option
                key={color._id}
                value={color._id}
                className="bg-zinc-900 text-white"
              >
                {color.name}
              </option>
            ))}
          </select>
        </div>

        {/* Style */}
        <div>
          <label className="mb-1.5 block text-[11px] text-white/35">
            استایل
          </label>

          <select
            value={filters.style}
            onChange={(e) => onChange("style", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-zinc-900 text-white">
              همه استایل‌ها
            </option>

            {styles.map((style) => (
              <option
                key={style._id}
                value={style._id}
                className="bg-zinc-900 text-white"
              >
                {style.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        {/* <div>
          <label className="mb-1.5 block text-[11px] text-white/35">
            مکان مصرف
          </label>

          <select
            value={filters.location}
            onChange={(e) => onChange("location", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-zinc-900 text-white">
              همه مکان‌ها
            </option>

            {locations.map((location) => (
              <option
                key={location._id}
                value={location._id}
                className="bg-zinc-900 text-white"
              >
                {location.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* Min Price */}
        {/* <div>
          <label className="mb-1.5 block text-[11px] text-white/35">
            حداقل قیمت
          </label>

          <input
            type="number"
            min={0}
            placeholder="مثلاً ۵۰۰٬۰۰۰"
            value={filters.minPrice}
            onChange={(e) => onChange("minPrice", e.target.value)}
            className={inputClass}
          />
        </div> */}

        {/* Max Price */}
        {/* <div>
          <label className="mb-1.5 block text-[11px] text-white/35">
            حداکثر قیمت
          </label>

          <input
            type="number"
            min={0}
            placeholder="مثلاً ۱۰٬۰۰۰٬۰۰۰"
            value={filters.maxPrice}
            onChange={(e) => onChange("maxPrice", e.target.value)}
            className={inputClass}
          />
        </div> */}

        {/* Sort */}
        {/* <div>
          <label className="mb-1.5 block text-[11px] text-white/35">
            مرتب‌سازی
          </label>

          <select
            value={filters.sort}
            onChange={(e) => onChange("sort", e.target.value as SortOption)}
            className={`${inputClass} cursor-pointer`}
          >
            {sortOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-zinc-900 text-white"
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div> */}
      </div>
    </div>
  );
}
