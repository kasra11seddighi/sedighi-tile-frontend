import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import type { FinderOption } from "../types/tileFinder.types";

interface Props {
  option: FinderOption;
  selected: boolean;
  onSelect: (value: string) => void;
}

export default function FilterOption({ option, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={`
        group relative flex w-full flex-col overflow-hidden
        rounded-2xl border transition-all duration-300
        min-h-[160px] md:min-h-[180px]
        ${
          selected
            ? "border-[#AD5A34] bg-white shadow-[0_10px_30px_rgba(173,90,52,0.18)]"
            : "border-[#E7DECD] bg-white shadow-sm hover:border-[#D8C7B2]"
        }
        active:scale-[0.97]
      `}
    >
      {/* تصویر - فقط در صورت وجود */}
      {option.image && (
        <div className="h-32 w-full overflow-hidden bg-[#F1ECE2]">
          <img
            src={resolveImageUrl(option.image)}
            alt={option.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* محتوا */}
      <div
        className={`
          flex w-full flex-grow flex-col items-center justify-center gap-3 p-4
          ${!option.image ? "min-h-[160px]" : "min-h-[80px]"}
        `}
      >
        {(option.icon || option.hex) && (
          <div className="flex items-center justify-center gap-2">
            {option.icon && (
              <span
                className={`text-2xl ${selected ? "text-[#AD5A34]" : "text-[#2A241D]"}`}
              >
                {option.icon}
              </span>
            )}
            {option.hex && (
              <span
                className="h-6 w-6 rounded-full border border-[#E7DECD] shadow-sm"
                style={{ backgroundColor: option.hex }}
              />
            )}
          </div>
        )}

        <p
          className={`
            m-0 text-center text-base font-bold leading-tight md:text-lg
            ${selected ? "text-[#AD5A34]" : "text-[#2A241D]"}
          `}
        >
          {option.title}
        </p>
      </div>

      {/* نشانگر انتخاب */}
      {selected && (
        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#AD5A34]" />
      )}
    </button>
  );
}
