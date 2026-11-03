import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { updateProfileRequest } from "../../Auth/services/auth.service";

export default function EditProfileForm() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (name.trim().length < 2) {
      setErrorMessage("نام باید حداقل ۲ کاراکتر باشد.");
      return;
    }

    try {
      setIsSubmitting(true);
      const updated = await updateProfileRequest(name.trim());
      updateUser(updated);
      setSuccessMessage("پروفایل با موفقیت به‌روزرسانی شد.");
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "ویرایش پروفایل با خطا مواجه شد.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
    >
      <div>
        <label className="mb-1.5 block text-xs font-bold text-white/60">نام</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-brand/50"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold text-white/60">
          شماره موبایل
        </label>
        <input
          type="text"
          value={user?.phone ?? ""}
          disabled
          dir="ltr"
          className="w-full cursor-not-allowed rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-right text-sm text-white/40 outline-none"
        />
        <p className="mt-1.5 text-[11px] text-white/30">
          شماره موبایل قابل تغییر نیست.
        </p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
          <CheckCircle2 size={14} />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
          <AlertCircle size={14} />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-5 py-2.5 text-xs font-bold text-[#07111f] transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </form>
  );
}
