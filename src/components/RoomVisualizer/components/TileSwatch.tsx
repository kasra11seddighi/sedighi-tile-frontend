import { Check, Image as ImageIcon } from "lucide-react";
import type { TileOption } from "../types/roomVisualizer.types";

interface Props {
  tile: TileOption;
  selected: boolean;
  onSelect: (tile: TileOption) => void;
}

export default function TileSwatch({ tile, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(tile)}
      className={`
        group flex flex-col overflow-hidden rounded-2xl border text-right transition-all duration-200
        ${
          selected
            ? "border-[#8B5CF6] bg-white/[0.06] shadow-[0_0_0_3px_rgba(139,92,246,0.25)]"
            : "border-white/10 bg-white/[0.02] hover:border-white/20"
        }
      `}
    >
      <span className="relative block h-20 w-full overflow-hidden bg-white/5">
        {tile.image ? (
          <img
            src={tile.image}
            alt={tile.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-slate-600">
            <ImageIcon size={20} />
          </span>
        )}

        {selected && (
          <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#8B5CF6] text-white">
            <Check size={14} strokeWidth={3} />
          </span>
        )}
      </span>

      <span className="flex flex-col gap-0.5 px-3 py-2.5">
        <span className="line-clamp-1 text-xs font-bold text-white">{tile.title}</span>
        <span className="text-[11px] text-slate-400">{tile.type}</span>
      </span>
    </button>
  );
}
