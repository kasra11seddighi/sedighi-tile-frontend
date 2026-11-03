import { useEffect, useState } from "react";
import api from "../../../api/axios";

export interface CategoryMenuItem {
  _id: string;
  name: string;
  slug: string;
}

// دسته‌بندی‌ها همون چیزیه که به عنوان «گروه محصول» استفاده می‌شه
// (مثلاً شیرآلات، کاشی و سرامیک، پارکت و...) و از بک‌اند میاد،
// پس اضافه‌کردن گروه جدید فقط با اضافه‌کردن یک دسته‌بندی جدید انجام می‌شه.
export function useCategoriesMenu() {
  const [categories, setCategories] = useState<CategoryMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await api.get("/categories");
        if (isMounted) setCategories(res.data.data ?? []);
      } catch {
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
