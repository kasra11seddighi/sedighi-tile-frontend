import { FileText } from "lucide-react";
import { useSeo } from "../hooks/useSeo";

const SECTIONS = [
  {
    title: "پذیرش شرایط",
    body: "استفاده از سایت و خدمات نمایندگی صدیقی به معنای پذیرش این شرایط و قوانین است. لطفاً پیش از ثبت سفارش، این صفحه را با دقت مطالعه کنید.",
  },
  {
    title: "ثبت سفارش و قیمت‌گذاری",
    body: "قیمت محصولات در سایت لحظه‌ای به‌روزرسانی می‌شود و ممکن است تا پیش از تأیید نهایی سفارش تغییر کند. ثبت سفارش به منزله‌ی تأیید قیمت و مشخصات نمایش داده‌شده در همان لحظه است.",
  },
  {
    title: "ارسال و تحویل",
    body: "زمان ارسال بسته به نوع محصول و موجودی انبار متفاوت است و پس از هماهنگی تلفنی با مشتری نهایی می‌شود.",
  },
  {
    title: "بازگشت و مرجوعی کالا",
    body: "در صورت مغایرت کالای دریافتی با سفارش ثبت‌شده، مشتری می‌تواند ظرف مدت مشخص از طریق تماس با پشتیبانی، درخواست بررسی و مرجوعی ثبت کند.",
  },
  {
    title: "حریم خصوصی",
    body: "اطلاعات شخصی مشتریان صرفاً برای پردازش سفارش و ارتباط با ایشان استفاده می‌شود. برای جزئیات بیشتر به صفحه‌ی حریم خصوصی مراجعه کنید.",
  },
];

export default function Terms() {
  useSeo({
    title: "شرایط و قوانین",
    description: "شرایط و قوانین استفاده از سایت و خدمات نمایندگی صدیقی.",
  });

  return (
    <div dir="rtl">
      <section className="relative overflow-hidden pb-10 pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <FileText size={13} />
            شرایط و قوانین
          </div>

          <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            شرایط و قوانین استفاده
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
