import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { addFavorite, getFavorites, removeFavorite } from "../services/favorites.service";

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

// این Context به جای اینکه یک هوکِ مستقل باشه که هر ProductCard جدا صداش
// بزنه، یک بار در کل اپ لود می‌شه. قبلاً چون useFavorites یک هوک ساده بود
// و مستقیم داخل ProductCard صدا زده می‌شد، با هر گرید محصولات (مثلاً ۱۲ کارت)
// همون تعداد درخواست جدا به GET /favorites زده می‌شد. حالا فقط یک درخواست
// در کل اپ زده می‌شه و همه‌ی کارت‌ها از همین state مشترک استفاده می‌کنن.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);

  // موقع تغییر وضعیت لاگین (فقط اگه کاربر لاگین باشه)، لیست علاقه‌مندی‌های
  // واقعی کاربر رو می‌گیریم تا قلب‌ها با وضعیت واقعی دیتابیس هماهنگ باشن
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

  async function toggleFavorite(productId: string) {
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
  }

  function isFavorite(productId: string) {
    return favorites.includes(productId);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites باید داخل FavoritesProvider استفاده شود");
  }
  return ctx;
}
