import {
  Phone,
  ShieldCheck,
  AlertCircle,
  User,
  ArrowRight,
} from "lucide-react";
import { useOtpAuthForm } from "../hooks/useOtpAuthForm";

export default function OtpAuthForm() {
  const {
    step,
    phone,
    code,
    name,
    isNewUser,
    isSubmitting,
    errorMessage,
    cooldown,
    setPhone,
    setCode,
    setName,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
    editPhone,
  } = useOtpAuthForm();

  return (
    <div
      dir="rtl"
      className="mx-auto w-full max-w-md rounded-[1.75rem] border border-white/10 bg-white/3 p-6 sm:p-8"
    >
      {step === "phone" ? (
        <>
          <h2 className="text-lg font-bold text-white">ورود یا ثبت‌نام</h2>
          <p className="mt-1 text-sm text-white/50">
            شماره موبایلت رو وارد کن تا کد تایید برات پیامک بشه.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendOtp();
            }}
            className="mt-6 space-y-4"
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-brand/50">
              <Phone size={16} className="text-white/40" />
              <input
                type="tel"
                inputMode="numeric"
                required
                dir="ltr"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-right text-sm text-white placeholder:text-white/30 outline-none"
              />
            </div>

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
              {isSubmitting ? "در حال ارسال کد..." : "دریافت کد تایید"}
            </button>
          </form>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={editPhone}
            className="mb-4 flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-brand-light"
          >
            <ArrowRight size={14} />
            ویرایش شماره
          </button>

          <h2 className="text-lg font-bold text-white">کد تایید رو وارد کن</h2>
          <p className="mt-1 text-sm text-white/50">
            کد ارسال‌شده به{" "}
            <span dir="ltr" className="text-white/80">
              {phone}
            </span>{" "}
            را وارد کنید.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyOtp();
            }}
            className="mt-6 space-y-4"
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-brand/50">
              <ShieldCheck size={16} className="text-white/40" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={12}
                required
                dir="ltr"
                placeholder="کد تایید پیامک‌شده"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-transparent text-center text-lg tracking-[0.4em] text-white placeholder:text-sm placeholder:tracking-normal placeholder:text-white/30 outline-none"
              />
            </div>

            {isNewUser && (
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-brand/50">
                <User size={16} className="text-white/40" />
                <input
                  type="text"
                  required
                  placeholder="نام و نام خانوادگی"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                />
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
              {isSubmitting ? "در حال بررسی..." : "تایید و ورود"}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={cooldown > 0 || isSubmitting}
              className="w-full text-center text-xs font-medium text-white/50 transition-colors hover:text-brand-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cooldown > 0
                ? `ارسال مجدد کد تا ${cooldown} ثانیه دیگر`
                : "ارسال مجدد کد"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
