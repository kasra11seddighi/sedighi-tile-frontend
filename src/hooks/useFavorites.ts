import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addFavorite, getFavorites, removeFavorite } from "../services/favorites.service";

export function useFavorites() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);

  // موقع mount شدن (فقط اگه کاربر لاگین باشه)، لیست علاقه‌مندی‌های واقعی
  // کاربر رو می‌گیریم تا قلب‌ها با وضعیت واقعی دیتابیس هماهنگ باشن
  useEffect(() => {
    let isMounted = true;

    if (!isAuthenticated) {
      setFavorites([]);
      return;
    }

    async function loadFavorites() {
      try {
        const res = await getFavorites();
        const ids = (res.data ?? []).map(
          (fav: { product: { _id: string } | string }) =>
            typeof fav.product === "string" ? fav.product : fav.product._id,
        );
        if (isMounted) setFavorites(ids);
      } catch {
        // اگه خطایی پیش اومد، فقط قلب‌ها خالی می‌مونن
      }
    }

    loadFavorites();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const toggleFavorite = async (productId: string) => {
    // اگه کاربر لاگین نکرده، به‌جای زدن درخواست ناموفق به سرور می‌فرستیمش صفحه‌ی ورود
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const wasFavorite = favorites.includes(productId);

    // خوش‌بینانه آپدیت می‌کنیم تا کلیک حس فوری داشته باشه
    setFavorites((prev) =>
      wasFavorite ? prev.filter((id) => id !== productId) : [...prev, productId],
    );

    try {
      if (wasFavorite) {
        await removeFavorite(productId);
      } else {
        await addFavorite(productId);
      }
    } catch (error) {
      console.error("خطا در بروزرسانی علاقه‌مندی:", error);
      // اگه درخواست شکست خورد، تغییر رو برمی‌گردونیم
      setFavorites((prev) =>
        wasFavorite ? [...prev, productId] : prev.filter((id) => id !== productId),
      );
    }
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
