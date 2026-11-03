import { useEffect, useState } from "react";

import { getHeroData } from "../services/hero.service";

import type { HeroData } from "../types/hero.types";

export function useHero() {
  const [data, setData] = useState<HeroData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  async function fetchHero() {
    try {
      setLoading(true);
      setError(null);

      const result = await getHeroData();

      setData(result);
    } catch {
      setError("خطا در دریافت اطلاعات بخش هیرو");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHero();
  }, []);

  return { data, loading, error, retry: fetchHero };
}
