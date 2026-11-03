import api from "../../../api/axios";

import type { AboutData } from "../types/about.types";

export async function getAboutData(): Promise<AboutData | null> {
  const response = await api.get("/about");

  return response.data.data;
}
