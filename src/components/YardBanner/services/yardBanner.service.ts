import api from "../../../api/axios";
import type { YardBanner } from "../types/yardBanner.types";

// اندپوینت عمومی بک‌اند - فقط بنرهای فعال، مرتب‌شده بر اساس order:
//   GET /yard-banners?limit= -> { data: YardBanner[] }
export async function getYardBanners(limit?: number): Promise<YardBanner[]> {
  const res = await api.get("/yard-banners", {
    params: limit ? { limit } : undefined,
  });
  return res.data.data;
}
