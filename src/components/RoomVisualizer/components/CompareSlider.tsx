import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function CompareSlider({
  beforeImage,
  afterImage,
  beforeLabel = "قبل",
  afterLabel = "بعد",
}: Props) {
  const [percent, setPercent] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPercent((x / rect.width) * 100);
  }

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    }
    function handleUp() {
      draggingRef.current = false;
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-[1.75rem] md:aspect-[16/11]"
      onPointerDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
    >
      {/* لایه‌ی «قبل» - تمام عرض */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* لایه‌ی «بعد» - فقط سمت راست خط جداکننده نمایش داده می‌شود */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
      >
        <img
          src={afterImage}
          alt={afterLabel}
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>

      {/* خط جداکننده و دستگیره */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white/80"
        style={{ left: `${percent}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0B0F14] shadow-lg">
          <ChevronLeft size={14} strokeWidth={3} />
          <ChevronRight size={14} strokeWidth={3} className="-mr-1.5" />
        </div>
      </div>

      {/* برچسب‌ها */}
      <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  );
}
