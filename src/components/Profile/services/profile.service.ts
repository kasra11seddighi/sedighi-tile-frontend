import api from "../../../api/axios";
import type { FavoriteItem, Address, AddressInput } from "../types/profile.types";

export const getFavoritesRequest = async (): Promise<FavoriteItem[]> => {
  const res = await api.get("/favorites");
  return res.data.data;
};

export const removeFavoriteRequest = async (
  productId: string,
): Promise<void> => {
  await api.delete(`/favorites/${productId}`);
};

export const getAddressesRequest = async (): Promise<Address[]> => {
  const res = await api.get("/auth/me/addresses");
  return res.data.data;
};

export const addAddressRequest = async (
  data: AddressInput,
): Promise<Address[]> => {
  const res = await api.post("/auth/me/addresses", data);
  return res.data.data;
};

export const updateAddressRequest = async (
  addressId: string,
  data: Partial<AddressInput>,
): Promise<Address[]> => {
  const res = await api.put(`/auth/me/addresses/${addressId}`, data);
  return res.data.data;
};

export const deleteAddressRequest = async (addressId: string): Promise<Address[]> => {
  const res = await api.delete(`/auth/me/addresses/${addressId}`);
  return res.data.data;
};
