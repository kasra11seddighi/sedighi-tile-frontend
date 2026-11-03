import api from "../../../api/axios";
import type { Brand } from "../types/brands.types";

type BrandsResponse =
  | {
      success: true;
      data: {
        brands: Brand[];
      };
    }
  | {
      success: true;
      data: Brand[];
    };

export const getBrands = async (): Promise<Brand[]> => {
  const { data } = await api.get<BrandsResponse>("/brands");

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return data.data.brands;
};
