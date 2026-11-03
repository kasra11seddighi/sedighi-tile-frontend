import { useMemo, useState } from "react";
import { Sparkles, X, Loader2 } from "lucide-react";
import TileSwatch from "./TileSwatch";
import type { TileOption } from "../types/roomVisualizer.types";

interface Props {
  tiles: TileOption[];
  isLoadingTiles?: boolean;
  selectedTile?: TileOption;
  isSuggesting?: boolean;
  error?: string;
  onSelectTile: (tile: TileOption) => void;
  onRequestAiSuggestion: () => void;
  onApply: () => void;
  onClose: () => void;
}

export default function TileSelectModal({
  tiles,
  isLoadingTiles,
  selectedTile,
  isSuggesting,
  error,
  onSelectTile,
  onRequestAiSuggestion,
  onApply,
  onClose,
}: Props) {
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // فقط محصولات دسته‌بندی «کاشی» و «سرامیک»
  const tileProducts = useMemo(() => {
    return tiles.filter((tile) => tile.type.trim() === "کاشی و سرامیک");
  }, [tiles]);

  // دسته‌بندی‌های موجود بین کاشی و سرامیک
  const types = useMemo(() => {
    return [
      "all",
      ...Array.from(
        new Set(tileProducts.map((tile) => tile.type).filter(Boolean)),
      ),
    ];
  }, [tileProducts]);

  // اعمال فیلتر انتخاب‌شده
  const filteredTiles = useMemo(() => {
    return tileProducts.filter(
      (tile) => typeFilter === "all" || tile.type === typeFilter,
    );
  }, [tileProducts, typeFilter]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0E1219] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      >
        {/* هدر */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-white">انتخاب کاشی</h2>

            <p className="mt-0.5 text-xs text-slate-400">
              کاشی یا سرامیک مورد نظرت رو انتخاب کن
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* فیلتر دسته‌بندی */}
        {types.length > 1 && (
          <div className="flex flex-wrap gap-2 border-b border-white/10 px-6 py-4">
            {types.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(type)}
                className={`
                  rounded-full px-4 py-1.5 text-xs font-semibold
                  transition-colors duration-200
                  ${
                    typeFilter === type
                      ? "bg-white text-[#0B0F14]"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }
                `}
              >
                {type === "all" ? "همه" : type}
              </button>
            ))}
          </div>
        )}

        {/* پیشنهاد هوش مصنوعی */}
        <div className="px-6 pt-4">
          <button
            type="button"
            onClick={onRequestAiSuggestion}
            disabled={isSuggesting || tileProducts.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#8B5CF6]/40 bg-gradient-to-l from-[#4F46E5]/15 to-[#8B5CF6]/15 px-4 py-3 text-sm font-bold text-white transition-all hover:border-[#8B5CF6]/70 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles size={16} className="text-[#B4A6FF]" />

            {isSuggesting
              ? "در حال بررسی فضای شما..."
              : "پیشنهاد با هوش مصنوعی"}
          </button>
        </div>

        {/* گرید کاشی‌ها */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isLoadingTiles ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-slate-400">
              <Loader2 size={22} className="animate-spin" />

              <p className="text-sm">در حال دریافت کاشی‌ها...</p>
            </div>
          ) : filteredTiles.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-sm text-slate-400">
              کاشی یا سرامیکی برای نمایش پیدا نشد
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {filteredTiles.map((tile) => (
                <TileSwatch
                  key={tile.id}
                  tile={tile}
                  selected={selectedTile?.id === tile.id}
                  onSelect={onSelectTile}
                />
              ))}
            </div>
          )}
        </div>

        {/* پیام خطا */}
        {error && (
          <div className="mx-6 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* فوتر */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={onApply}
            disabled={!selectedTile}
            className="rounded-xl bg-gradient-to-l from-[#4F46E5] to-[#8B5CF6] px-7 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(124,58,237,0.35)] transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            اعمال تغییرات
          </button>
        </div>
      </div>
    </div>
  );
}
