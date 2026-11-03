import { useState } from "react";
import { MessageCircle, X, Headset } from "lucide-react";
import SupportQuickLinks from "./components/SupportQuickLinks";
import SupportForm from "./components/SupportForm";

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div dir="rtl" className="fixed bottom-5 left-5 z-[60] sm:bottom-7 sm:left-7">
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-[calc(100vw-2.5rem)] max-w-[320px] rounded-2xl border border-white/10 bg-[#0b1522] p-4 shadow-2xl shadow-black/40 sm:bottom-[4.25rem]">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 text-brand">
                <Headset size={16} />
              </span>
              <div>
                <p className="text-sm font-bold text-white">پشتیبانی آنلاین</p>
                <p className="text-[11px] text-white/40">معمولاً زیر یک ساعت پاسخ می‌دیم</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="بستن پشتیبانی"
              className="text-white/40 transition-colors hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <SupportQuickLinks />

          <div className="my-3 h-px w-full bg-white/10" />

          <SupportForm />
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "بستن پشتیبانی آنلاین" : "باز کردن پشتیبانی آنلاین"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-[#07111f] shadow-lg shadow-brand/30 transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
