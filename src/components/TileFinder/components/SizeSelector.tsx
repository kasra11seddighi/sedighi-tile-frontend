import type { FinderOption } from "../types/tileFinder.types";
import Pagination from "../../shared/Pagination";
import { usePagination } from "../../../hooks/usePagination";

interface Props {
  sizes: FinderOption[];
  selected?: string;
  onSelect: (value: string) => void;
}

const ITEMS_PER_PAGE = 16;

export default function SizeSelector({ sizes, selected, onSelect }: Props) {
  const { page, setPage, totalPages, paginatedItems } = usePagination(
    sizes,
    ITEMS_PER_PAGE,
  );

  return (
    <div dir="rtl">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {paginatedItems.map((size) => {
          const isSelected = selected === size.value;

          return (
            <button
              key={size.id}
              type="button"
              onClick={() => onSelect(size.value)}
              className={`
                flex min-h-[100px] items-center justify-center rounded-2xl
                border p-5 text-center font-extrabold transition-all duration-300
                active:scale-95
                ${
                  isSelected
                    ? "scale-[1.02] border-[#AD5A34] bg-white text-[#AD5A34] shadow-[0_10px_30px_rgba(173,90,52,0.18)]"
                    : "border-[#E7DECD] bg-white text-[#2A241D] shadow-sm hover:border-[#D8C7B2]"
                }
              `}
            >
              {size.title}
            </button>
          );
        })}
      </div>

      <Pagination page={page} pages={totalPages} onChange={setPage} />
    </div>
  );
}
