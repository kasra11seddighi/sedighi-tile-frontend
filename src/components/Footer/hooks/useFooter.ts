import { useEffect, useState } from "react";

import { getFooterData } from "../services/footer.service";

import type { FooterData } from "../types/footer.types";

export function useFooter() {
  const [data, setData] = useState<FooterData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const result = await getFooterData();

        setData(result);
      } catch {
        setError("خطا در دریافت اطلاعات فوتر");
      } finally {
        setLoading(false);
      }
    }

    fetchFooter();
  }, []);

  return { data, loading, error };
}
