import { MessageCircle } from "lucide-react";
import ContactForm from "../components/Contact/components/ContactForm";
import ContactInfoCard from "../components/Contact/components/ContactInfoCard";
import FaqSection from "../components/Contact/components/FaqSection";
import { useSeo } from "../hooks/useSeo";

export default function Contact() {
  useSeo({
    title: "تماس با ما",
    description: "راه‌های ارتباط با نمایندگی صدیقی؛ فرم تماس، آدرس، شماره تماس و سوالات متداول.",
  });

  return (
    <div dir="rtl">
      {/* هدر صفحه */}
      <section className="relative overflow-hidden pb-14 pt-16">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <MessageCircle size={13} />
            تماس با ما
          </div>

          <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            سوالی داری؟ در تماس باش
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/60">
            تیم ما آماده‌ی پاسخگویی به سوال‌ها، پیشنهادها و درخواست‌های
            مشاوره‌ی توئه.
          </p>
        </div>
      </section>

      {/* فرم + اطلاعات تماس */}
      <section className="pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <ContactInfoCard />
        </div>
      </section>

      {/* سوالات متداول */}
      <section
        id="faq"
        className="scroll-mt-28 border-t border-white/10 bg-white/[0.02] py-16"
      >
        <div className="mx-auto max-w-3xl px-4">
          <FaqSection />
        </div>
      </section>
    </div>
  );
}
