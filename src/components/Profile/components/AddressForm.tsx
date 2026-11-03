import { useState } from "react";
import { AlertCircle } from "lucide-react";
import type { Address, AddressInput } from "../types/profile.types";
import { IRAN_CITIES } from "../../../data/iranCities";

interface Props {
  initial?: Address;
  onSubmit: (data: AddressInput) => Promise<void>;
  onCancel: () => void;
}

export default function AddressForm({ initial, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<AddressInput>({
    label: initial?.label ?? "",
    fullName: initial?.fullName ?? "",
    phone: initial?.phone ?? "",
    landlinePhone: initial?.landlinePhone ?? "",
    address: initial?.address ?? "",
    city: initial?.city ?? "",
    postalCode: initial?.postalCode ?? "",
    isDefault: initial?.isDefault ?? false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange<K extends keyof AddressInput>(key: K, value: AddressInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "ثبت آدرس با خطا مواجه شد.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          placeholder="عنوان آدرس (مثلاً خانه، محل کار)"
          value={values.label}
          onChange={(e) => handleChange("label", e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand/50"
        />
        <input
          type="text"
          required
          placeholder="نام گیرنده"
          value={values.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand/50"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="tel"
          required
          dir="ltr"
          placeholder="شماره موبایل گیرنده"
          value={values.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-right text-sm text-white placeholder:text-white/30 outline-none focus:border-brand/50"
        />
        <input
          type="tel"
          dir="ltr"
          placeholder="تلفن ثابت (اختیاری)"
          value={values.landlinePhone}
          onChange={(e) => handleChange("landlinePhone", e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-right text-sm text-white placeholder:text-white/30 outline-none focus:border-brand/50"
        />
      </div>

      <textarea
        required
        rows={2}
        placeholder="آدرس کامل"
        value={values.address}
        onChange={(e) => handleChange("address", e.target.value)}
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand/50"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select
          required
          value={values.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none [color-scheme:dark] focus:border-brand/50"
        >
          <option value="" disabled className="bg-[#0d1b2e]">
            انتخاب شهر
          </option>
          {IRAN_CITIES.map((c) => (
            <option key={c} value={c} className="bg-[#0d1b2e]">
              {c}
            </option>
          ))}
        </select>
        <input
          type="text"
          required
          dir="ltr"
          placeholder="کد پستی"
          value={values.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-right text-sm text-white placeholder:text-white/30 outline-none focus:border-brand/50"
        />
      </div>

      <label className="flex w-fit items-center gap-2 text-xs text-white/60">
        <input
          type="checkbox"
          checked={values.isDefault}
          onChange={(e) => handleChange("isDefault", e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-white/5 accent-brand"
        />
        آدرس پیش‌فرض باشه
      </label>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-5 py-2.5 text-xs font-bold text-[#07111f] transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "در حال ثبت..." : initial ? "ذخیره تغییرات" : "افزودن آدرس"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-medium text-white/60 transition hover:border-white/25 hover:text-white/85"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
