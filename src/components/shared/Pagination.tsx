interface Props {
  page: number;
  pages: number;
  onChange: (page: number) => void;
  /** "light" برای بخش‌های روشن مثل کاشی‌یاب، "dark" برای بخش‌های تیره مثل شیرالات */
  variant?: "light" | "dark";
}

/**
 * دکمه‌های صفحه‌بندی مشترک - قبلاً OptionPagination بود و فقط داخل TileFinder
 * استفاده می‌شد. حالا به شکل مشترک منتقل شده تا کنار usePagination
 * توی TileFinder و ShiralatSection هم استفاده بشه.
 */
export default function Pagination({ page, pages, onChange, variant = "light" }: Props) {
  if (pages <= 1) return null;

  const isDark = variant === "dark";

  return (
    <div className="mt-8 flex justify-center gap-2" dir="rtl">
      {Array.from({ length: pages }).map((_, index) => {
        const number = index + 1;
        const isActive = page === number;

        return (
          <button
            key={number}
            type="button"
            onClick={() => onChange(number)}
            aria-current={isActive ? "true" : undefined}
            className={`
              h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition-colors duration-200
              ${
                isDark
                  ? isActive
                    ? "bg-brand text-[#07111f]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  : isActive
                    ? "bg-[#AD5A34] text-white shadow-sm"
                    : "bg-[#F1ECE2] text-[#8C8174] hover:bg-[#E7DECD] hover:text-[#2A241D]"
              }
            `}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}
