import { useEffect, useState } from "react";
import { getRecentlyViewedIds } from "../../../hooks/useRecentlyViewed";
import { getProductByIdRequest } from "../../Products/services/products.service";
import type { Product } from "../../Products/types/products.types";

// اندپوینت جمعی «چند محصول با این شناسه‌ها» نداریم، پس محصولات ذخیره‌شده
// توی localStorage رو موازی (هر کدوم جدا) از /products/:id می‌گیریم؛
// تعدادشون کمه (حداکثر همون MAX_ITEMS توی useRecentlyViewed) پس مشکلی
// نداره. اگه محصولی حذف/غیرفعال شده باشه (خطا برگردونه)، بی‌سروصدا از
// نتیجه حذف می‌شه.
export function useRecentlyViewedProducts(excludeId?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ids = getRecentlyViewedIds(excludeId);
    if (ids.length === 0) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        const results = await Promise.allSettled(ids.map((id) => getProductByIdRequest(id)));
        if (!isMounted) return;

        const found = results
          .filter((r): r is PromiseFulfilledResult<Product> => r.status === "fulfilled" && Boolean(r.value))
          .map((r) => r.value);

        // ترتیب «جدیدترین بازدید اول» رو همون‌طور که توی localStorage
        // ذخیره شده حفظ می‌کنیم (Promise.allSettled ترتیب ورودی رو حفظ می‌کنه)
        setProducts(found);
      } catch {
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excludeId]);

  return { products, isLoading };
}
