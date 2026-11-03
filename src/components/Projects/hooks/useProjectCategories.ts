import { useEffect, useState } from "react";
import { getProjectCategoriesRequest } from "../services/projects.service";
import type { ProjectCategory } from "../types/projects.types";

export function useProjectCategories() {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await getProjectCategoriesRequest();
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
