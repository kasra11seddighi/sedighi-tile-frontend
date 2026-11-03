import { useState } from "react";
import { Plus, MapPinOff } from "lucide-react";
import { useAddresses } from "../hooks/useAddresses";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import type { Address, AddressInput } from "../types/profile.types";

export default function AddressBook() {
  const { addresses, isLoading, error, addAddress, updateAddress, deleteAddress } =
    useAddresses();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleAdd(data: AddressInput) {
    await addAddress(data);
    setIsAdding(false);
  }

  async function handleEdit(addressId: string, data: AddressInput) {
    await updateAddress(addressId, data);
    setEditingId(null);
  }

  async function handleDelete(addressId: string) {
    if (!window.confirm("این آدرس حذف بشه؟")) return;
    await deleteAddress(addressId);
  }

  return (
    <div>
      {isLoading && (
        <p className="py-10 text-center text-sm text-white/40">در حال بارگذاری...</p>
      )}

      {!isLoading && error && (
        <p className="py-10 text-center text-sm text-red-400/80">{error}</p>
      )}

      {!isLoading && !error && (
        <div className="space-y-3">
          {addresses.length === 0 && !isAdding && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-16 text-white/35">
              <MapPinOff size={28} />
              <p className="text-sm">هنوز آدرسی ثبت نکردی.</p>
            </div>
          )}

          {addresses.map((address: Address) =>
            editingId === address._id ? (
              <AddressForm
                key={address._id}
                initial={address}
                onSubmit={(data) => handleEdit(address._id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <AddressCard
                key={address._id}
                address={address}
                onEdit={() => setEditingId(address._id)}
                onDelete={() => handleDelete(address._id)}
                onSetDefault={() => updateAddress(address._id, { isDefault: true })}
              />
            ),
          )}

          {isAdding ? (
            <AddressForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-3.5 text-xs font-bold text-white/60 transition hover:border-brand/40 hover:text-brand-light"
            >
              <Plus size={15} />
              افزودن آدرس جدید
            </button>
          )}
        </div>
      )}
    </div>
  );
}
