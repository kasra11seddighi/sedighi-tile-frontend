import FilterOption from "./FilterOption";
import Pagination from "../../shared/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import type { FinderOption } from "../types/tileFinder.types";

interface Props {
  title: string;
  options: FinderOption[];
  selected?: string;
  onSelect: (value: string) => void;
}

const ITEMS_PER_PAGE = 6;

export default function FilterStep({
  title,
  options,
  selected,
  onSelect,
}: Props) {
  const { page, setPage, totalPages, paginatedItems } = usePagination(
    options,
    ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-6" dir="rtl">
      <h2 className="text-center text-2xl font-bold text-[#2A241D] md:text-right">
        {title}
      </h2>

      {options.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#E7DECD] bg-[#FBF8F2] p-8 text-center text-sm text-[#8C8174]">
          گزینه‌ای برای نمایش وجود ندارد
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {paginatedItems.map((option) => (
              <FilterOption
                key={option.id}
                option={option}
                selected={selected === option.value}
                onSelect={onSelect}
              />
            ))}
          </div>

          {options.length > ITEMS_PER_PAGE && (
            <Pagination page={page} pages={totalPages} onChange={setPage} />
          )}
        </>
      )}
    </div>
  );
}
