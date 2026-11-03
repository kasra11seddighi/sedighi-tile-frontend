import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useContactForm } from "../hooks/useContactForm";

export default function ContactForm() {
  const {
    values,
    isSubmitting,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <div
      dir="rtl"
      className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <h2 className="text-lg font-bold text-white">ارسال پیام</h2>
      <p className="mt-1 text-sm text-white/50">
        سوال، پیشنهاد یا درخواست مشاوره داری؟ برامون بنویس.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-6 space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            required
            placeholder="نام و نام خانوادگی"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand/50"
          />
          <input
            type="tel"
            placeholder="شماره تماس (اختیاری)"
            dir="ltr"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand/50"
          />
        </div>

        <input
          type="email"
          required
          placeholder="ایمیل"
          dir="ltr"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand/50"
        />

        <input
          type="text"
          placeholder="موضوع (اختیاری)"
          value={values.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand/50"
        />

        <textarea
          required
          rows={5}
          placeholder="پیام شما..."
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand/50"
        />

        {successMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2 size={16} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle size={16} />
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-3.5 text-sm font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
