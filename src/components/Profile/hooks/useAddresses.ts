import { useCallback, useEffect, useState } from "react";
import {
  getAddressesRequest,
  addAddressRequest,
  updateAddressRequest,
  deleteAddressRequest,
} from "../services/profile.service";
import type { Address, AddressInput } from "../types/profile.types";

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getAddressesRequest();
      setAddresses(data);
    } catch {
      setError("دریافت آدرس‌ها با خطا مواجه شد.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addAddress(data: AddressInput) {
    const updated = await addAddressRequest(data);
    setAddresses(updated);
  }

  async function updateAddress(addressId: string, data: Partial<AddressInput>) {
    const updated = await updateAddressRequest(addressId, data);
    setAddresses(updated);
  }

  async function deleteAddress(addressId: string) {
    const updated = await deleteAddressRequest(addressId);
    setAddresses(updated);
  }

  return { addresses, isLoading, error, addAddress, updateAddress, deleteAddress };
}
