import { useEffect, useState } from "react";

import { getAboutData } from "../services/about.service";

import type { AboutData } from "../types/about.types";

export function useAboutContent() {
  const [data, setData] = useState<AboutData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const result = await getAboutData();

        setData(result);
      } catch {
        setError("خطا در دریافت محتوای صفحه درباره ما");
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  return { data, loading, error };
}
