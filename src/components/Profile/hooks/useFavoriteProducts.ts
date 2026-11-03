import { useEffect, useState } from "react";
import {
  getFavoritesRequest,
  removeFavoriteRequest,
} from "../services/profile.service";
import type { FavoriteItem } from "../types/profile.types";

export function useFavoriteProducts(enabled: boolean = true) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState("");

  useEffect(() => {
    // اگه کاربر لاگین نباشه، اصلاً درخواستی به سرور نمی‌فرستیم (که قراره با خطای ۴۰۱ برگرده)
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getFavoritesRequest();
        if (isMounted) setFavorites(data);
      } catch {
        if (isMounted) {
          setError("دریافت محصولات مورد علاقه با خطا مواجه شد.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [enabled]);

  async function removeFavorite(productId: string) {
    // بهینه‌بینانه از لیست حذف می‌کنیم؛ اگه درخواست خطا داد برش می‌گردونیم
    const prev = favorites;
    setFavorites((list) => list.filter((f) => f.product._id !== productId));

    try {
      await removeFavoriteRequest(productId);
    } catch {
      setFavorites(prev);
    }
  }

  return { favorites, isLoading, error, removeFavorite };
}
