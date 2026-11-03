import { ShieldCheck } from "lucide-react";
import { useSeo } from "../hooks/useSeo";

const SECTIONS = [
  {
    title: "اطلاعاتی که جمع‌آوری می‌کنیم",
    body: "هنگام ثبت‌نام، ورود یا ثبت سفارش، اطلاعاتی مانند نام، شماره تماس و آدرس دریافت می‌شود که صرفاً برای ارائه‌ی خدمات استفاده می‌گردد.",
  },
  {
    title: "نحوه‌ی استفاده از اطلاعات",
    body: "اطلاعات شما برای پردازش سفارش، اطلاع‌رسانی وضعیت خرید و بهبود کیفیت خدمات استفاده می‌شود و در اختیار اشخاص ثالث قرار نمی‌گیرد.",
  },
  {
    title: "امنیت اطلاعات",
    body: "برای محافظت از اطلاعات کاربران، از روش‌های استاندارد امنیتی در ذخیره‌سازی و انتقال داده استفاده می‌شود.",
  },
  {
    title: "تماس با ما",
    body: "برای هر گونه سوال درباره‌ی نحوه‌ی استفاده از اطلاعاتتان، می‌توانید از طریق صفحه‌ی تماس با ما با پشتیبانی در ارتباط باشید.",
  },
];

export default function Privacy() {
  useSeo({
    title: "حریم خصوصی",
    description: "نحوه‌ی جمع‌آوری و استفاده از اطلاعات شما در نمایندگی صدیقی.",
  });

  return (
    <div dir="rtl">
      <section className="relative overflow-hidden pb-10 pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <ShieldCheck size={13} />
            حریم خصوصی
          </div>

          <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            حریم خصوصی
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-base font-bold text-white">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-8 text-white/60">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
