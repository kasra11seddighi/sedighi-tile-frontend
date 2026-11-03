import api from "../../../api/axios";

export interface ProductCategoryDto {
  _id: string;
  name: string;
  slug: string;
}

export interface TileProductDto {
  _id: string;
  name: string;
  images: string[];
  category?: ProductCategoryDto | string;
}

/**
 * دریافت لیست کاشی‌ها از کاتالوگ واقعی محصولات (MongoDB) برای نمایش در مدال انتخاب کاشی.
 * از همون endpoint عمومی محصولات استفاده می‌کنیم؛ فقط دسته و تصویر لازم داریم.
 */
export const getTileProducts = async (): Promise<TileProductDto[]> => {
  const res = await api.get("/products", {
    params: { limit: 100, sort: "-createdAt" },
  });

  return res.data.products;
};
