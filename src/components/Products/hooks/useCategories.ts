import { useEffect, useState } from "react";
import { getCategoriesRequest } from "../services/products.service";
import type { Category } from "../types/products.types";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await getCategoriesRequest();
        if (isMounted) setCategories(data);
      } catch {
        // اگه دسته‌بندی‌ها لود نشد، فیلتر دسته‌بندی صرفاً نمایش داده نمی‌شود
        if (isMounted) setCategories([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, isLoading };
}
