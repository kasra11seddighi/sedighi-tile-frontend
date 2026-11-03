import { useEffect, useState } from "react";
import { getYardBanners } from "../services/yardBanner.service";
import type { YardBanner } from "../types/yardBanner.types";

export function useYardBanners(limit?: number) {
  const [banners, setBanners] = useState<YardBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getYardBanners(limit);
        if (isMounted) setBanners(data);
      } catch {
        if (isMounted) setError("دریافت بنرهای بیرون از خانه با خطا مواجه شد.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { banners, isLoading, error };
}
