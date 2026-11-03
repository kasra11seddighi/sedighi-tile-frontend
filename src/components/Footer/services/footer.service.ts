import api from "../../../api/axios";

import type { FooterData } from "../types/footer.types";

export async function getFooterData(): Promise<FooterData> {
  const response = await api.get("/settings/footer");

  return response.data.data;
}
