import api from "../../../api/axios";

import type { HeaderData } from "../types/header.types";

export async function getHeaderData(): Promise<HeaderData> {
  const response = await api.get("/settings/header");

  return response.data.data;
}
