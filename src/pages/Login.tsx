import { LogIn } from "lucide-react";
import OtpAuthForm from "../components/Auth/components/OtpAuthForm";
import { useSeo } from "../hooks/useSeo";

export default function Login() {
  // صفحه‌ی ورود ارزش سئویی نداره و نباید توی نتایج جستجو بیاد
  useSeo({ title: "ورود / ثبت‌نام", noIndex: true });

  return (
    <div dir="rtl">
      <section className="relative overflow-hidden pb-16 pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <LogIn size={13} />
            ورود / ثبت‌نام
          </div>

          <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            خوش اومدی
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/60">
            برای دسترسی به علاقه‌مندی‌ها، سبد خرید و سفارش‌هات، فقط کافیه شماره
            موبایلت رو تایید کنی.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <OtpAuthForm />
      </section>
    </div>
  );
}
