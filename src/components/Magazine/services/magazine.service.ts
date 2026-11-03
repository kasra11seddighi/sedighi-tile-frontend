import api from "../../../api/axios";
import type {
  MagazineArticle,
  MagazineListResponse,
  MagazineQuery,
} from "../types/magazine.types";

export async function getMagazineList(
  query: MagazineQuery = {},
): Promise<MagazineListResponse> {
  const response = await api.get("/magazine", { params: query });
  // پاسخ بک‌اند مستقیم شامل data (آرایه مقاله‌ها) و pagination است
  return { articles: response.data.data, pagination: response.data.pagination };
}

// TODO: مسیر واقعی رو با بک‌اند هماهنگ کن اگه چیزی غیر از این بود.
export async function getMagazineTagsRequest(): Promise<string[]> {
  const response = await api.get("/magazine/tags");
  return response.data.data;
}

export async function getMagazineBySlug(slug: string): Promise<MagazineArticle> {
  const response = await api.get(`/magazine/${slug}`);
  return response.data.data;
}
