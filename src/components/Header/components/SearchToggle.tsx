import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import HeaderSearchForm from "./HeaderSearchForm";

function SearchToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // با کلیک بیرون از باکس جستجو، یا زدن Escape، بسته می‌شه
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="جستجوی محصول"
        className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white"
      >
        {isOpen ? <X size={18} /> : <Search size={18} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-[#0d1b2e] p-3 shadow-2xl sm:w-80">
          <HeaderSearchForm autoFocus onSubmitted={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default SearchToggle;
