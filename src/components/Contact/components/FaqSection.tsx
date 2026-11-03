import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { useFaqs } from "../hooks/useFaqs";
import FaqAccordionItem from "./FaqAccordionItem";

export default function FaqSection() {
  const { faqs, loading } = useFaqs();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div dir="rtl">
      <div className="mb-6 flex items-center gap-3 text-sm font-medium text-brand-light">
        <span className="h-px w-10 bg-brand-light/70" />
        <HelpCircle size={15} />
        <span>سوالات متداول</span>
      </div>

      <h2 className="mb-6 text-xl font-black text-white sm:text-2xl">
        پرتکرارترین سوال‌ها
      </h2>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-14 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
            />
          ))}
        </div>
      ) : faqs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center text-sm text-white/40">
          فعلاً سوال متداولی ثبت نشده است
        </p>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FaqAccordionItem
              key={faq._id}
              faq={faq}
              isOpen={openId === faq._id}
              onToggle={() => setOpenId(openId === faq._id ? null : faq._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
