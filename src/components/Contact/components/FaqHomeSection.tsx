import { Link } from "react-router-dom";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useFaqs } from "../hooks/useFaqs";
import FaqAccordionItem from "./FaqAccordionItem";

const HOME_FAQ_LIMIT = 4;

// نسخه‌ی خلاصه‌ی FaqSection برای پایین صفحه‌ی اصلی؛ همون useFaqs و
// FaqAccordionItem صفحه‌ی تماس رو دوباره استفاده می‌کنه (بدون تعریف مجدد
// محتوا)، فقط ۳-۴ تای اول رو نشون می‌ده و لینک «دیدن همه‌ی سوالات» به
// صفحه‌ی تماس می‌ده. اگه سوالی ثبت نشده یا لود نشه، بخش کلاً مخفی می‌شه.
export default function FaqHomeSection() {
  const { faqs, loading } = useFaqs();
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading || faqs.length === 0) return null;

  const preview = faqs.slice(0, HOME_FAQ_LIMIT);

  return (
    <section dir="rtl" className="border-t border-white/10 bg-white/[0.02] py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-brand-light">
              <HelpCircle size={15} />
              <span>سوالات متداول</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              پرتکرارترین سوال‌ها
            </h2>
          </div>

          <Link
            to="/contact#faq"
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-brand-light transition-colors hover:text-[#e3b27e]"
          >
            دیدن همه‌ی سوالات
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {preview.map((faq) => (
            <FaqAccordionItem
              key={faq._id}
              faq={faq}
              isOpen={openId === faq._id}
              onToggle={() => setOpenId(openId === faq._id ? null : faq._id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
