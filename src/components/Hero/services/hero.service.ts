import api from "../../../api/axios";

import type { HeroData } from "../types/hero.types";

export async function getHeroData(): Promise<HeroData> {
  const response = await api.get("/home");

  return response.data.data.hero; // 👈 اضافه شد .hero
}
