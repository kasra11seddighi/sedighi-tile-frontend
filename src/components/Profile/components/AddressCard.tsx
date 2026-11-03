import { MapPin, Star, Pencil, Trash2 } from "lucide-react";
import type { Address } from "../types/profile.types";

interface Props {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <MapPin size={14} />
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-bold text-white">
              {address.label}
              {address.isDefault && (
                <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-semibold text-brand-light">
                  پیش‌فرض
                </span>
              )}
            </p>
            <p className="text-xs text-white/40">{address.fullName}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            aria-label="ویرایش آدرس"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white/80"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="حذف آدرس"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs leading-6 text-white/55">
        {address.city}، {address.address}
      </p>
      <p className="mt-1 text-[11px] text-white/35" dir="ltr">
        {address.phone} — کد پستی: {address.postalCode}
      </p>

      {!address.isDefault && (
        <button
          type="button"
          onClick={onSetDefault}
          className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-light hover:underline"
        >
          <Star size={12} />
          انتخاب به‌عنوان آدرس پیش‌فرض
        </button>
      )}
    </div>
  );
}
