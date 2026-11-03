import api from "../../../api/axios";
import type { ShiralatCategory, ShiralatProduct } from "../types/shiralat.types";

export const getCategories = async (): Promise<ShiralatCategory[]> => {
  const res = await api.get("/categories");
  return res.data.data;
};

export const getProductsByCategory = async (
  categoryId: string,
): Promise<ShiralatProduct[]> => {
  const res = await api.get("/products", {
    params: { category: categoryId, limit: 24, sort: "-createdAt" },
  });
  return res.data.products;
};
