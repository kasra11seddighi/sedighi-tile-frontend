import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useQuickSupportForm } from "../hooks/useQuickSupportForm";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-right text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand/50";

export default function SupportForm() {
  const {
    values,
    isSubmitting,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useQuickSupportForm();

  if (successMessage) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-6 text-center">
        <CheckCircle2 size={22} className="text-emerald-400" />
        <p className="text-xs leading-6 text-emerald-300">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-2.5"
    >
      <input
        type="text"
        required
        placeholder="نام شما"
        value={values.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className={inputClass}
      />

      <input
        type="tel"
        required
        dir="ltr"
        placeholder="شماره تماس"
        value={values.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        className={`${inputClass} text-right`}
      />

      <textarea
        required
        rows={3}
        placeholder="سوالت رو بنویس..."
        value={values.message}
        onChange={(e) => handleChange("message", e.target.value)}
        className={`${inputClass} resize-none`}
      />

      {errorMessage && (
        <div className="flex items-start gap-1.5 text-[11px] text-red-300">
          <AlertCircle size={13} className="mt-0.5 shrink-0" />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-bold text-[#07111f] transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Send size={15} />
        )}
        ارسال پیام
      </button>
    </form>
  );
}
