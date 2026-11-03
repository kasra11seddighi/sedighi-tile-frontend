import { useEffect, useState } from "react";
import { getProductsRequest } from "../services/products.service";
import type { Product } from "../types/products.types";

// چند محصول دیگه از همون دسته‌بندی، برای بخش «شاید این‌ها رو هم دوست
// داشته باشی» زیر مشخصات فنی صفحه‌ی جزئیات محصول؛ خود محصول فعلی از
// نتیجه حذف می‌شه. دقیقاً هم‌الگو با useRelatedProjects.
export function useRelatedProducts(
  categoryId: string | undefined,
  excludeId: string | undefined,
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        const res = await getProductsRequest({
          category: categoryId,
          limit: 9,
          sort: "-createdAt",
        });
        if (isMounted) {
          setProducts(res.products.filter((p) => p._id !== excludeId).slice(0, 8));
        }
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
  }, [categoryId, excludeId]);

  return { products, isLoading };
}
