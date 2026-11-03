import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Sparkles } from "lucide-react";
import CompareSlider from "./components/CompareSlider";
import UploadCard from "./components/UploadCard";
import ExampleRooms from "./components/ExampleRooms";
import TileSelectModal from "./components/TileSelectModal";
import { useRoomVisualizer } from "./hooks/useRoomVisualizer";
import { mockExamples } from "./data/mockExamples";

export default function RoomVisualizer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tileFromUrl = searchParams.get("tile") ?? undefined;
  const sectionRef = useRef<HTMLElement>(null);

  const {
    beforeImage,
    afterImage,
    tiles,
    isLoadingTiles,
    isModalOpen,
    selectedTile,
    isSuggesting,
    isApplying,
    error,
    handleFileSelect,
    selectExampleRoom,
    openTileModal,
    closeTileModal,
    selectTile,
    requestAiSuggestion,
    applyTile,
  } = useRoomVisualizer(tileFromUrl);

  // وقتی از یه کارت محصول با ?tile=... به این بخش اومدیم، بعد از انتخاب
  // خودکار کاشی، به این سکشن اسکرول می‌کنیم و پارامتر رو از URL پاک می‌کنیم
  // تا با رفرش صفحه دوباره مودال باز نشه
  useEffect(() => {
    if (!tileFromUrl || !selectedTile) return;

    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const next = new URLSearchParams(searchParams);
    next.delete("tile");
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTile]);

  return (
    <section
      id="room-visualizer"
      ref={sectionRef}
      dir="rtl"
      className="min-h-screen bg-[#05070C] px-4 py-10 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
        {/* ستون تصویر / مقایسه */}
        <div>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10141B] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            {/* بج AI */}
            <div className="absolute right-6 top-6 z-20 flex items-center gap-1 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] px-3 py-2 text-sm font-extrabold shadow-lg">
              AI
              <Sparkles size={14} className="text-white/80" />
            </div>

            <CompareSlider beforeImage={beforeImage} afterImage={afterImage} />
          </div>

          {/* دکمه‌های اقدام */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                selectExampleRoom(mockExamples[Math.floor(Math.random() * mockExamples.length)])
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-white transition-all hover:border-white/25 hover:bg-white/[0.06]"
            >
              اتاق نمونه
              <Box size={18} />
            </button>

            <button
              type="button"
              onClick={openTileModal}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#4F46E5] to-[#8B5CF6] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(124,58,237,0.35)] transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Sparkles size={18} />
              اعمال با هوش مصنوعی
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
        </div>

        {/* ستون متن / آپلود */}
        <div>
          <h1 className="text-3xl font-extrabold leading-[1.4] md:text-4xl">
            کاشی را در خانه خودتان تجربه کنید
          </h1>
          <p className="mt-4 text-slate-400">
            عکس فضای خود را آپلود کنید تا هوش مصنوعی کاشی انتخابی را روی دیوار و
            کف شما اعمال کند
          </p>

          <div className="mt-8">
            <UploadCard onFileSelect={handleFileSelect} />
          </div>

          <div className="mt-8">
            <ExampleRooms rooms={mockExamples} onSelect={selectExampleRoom} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TileSelectModal
          tiles={tiles}
          isLoadingTiles={isLoadingTiles}
          selectedTile={selectedTile}
          isSuggesting={isSuggesting}
          error={error}
          onSelectTile={selectTile}
          onRequestAiSuggestion={requestAiSuggestion}
          onApply={applyTile}
          onClose={closeTileModal}
        />
      )}

      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 text-white">
            <Sparkles size={32} className="animate-pulse text-[#B4A6FF]" />
            <p className="text-sm font-medium">در حال اعمال کاشی روی تصویر...</p>
          </div>
        </div>
      )}
    </section>
  );
}
