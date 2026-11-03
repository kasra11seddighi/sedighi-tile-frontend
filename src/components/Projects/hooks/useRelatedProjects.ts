import { useEffect, useState } from "react";
import { getProjectsRequest } from "../services/projects.service";
import type { Project } from "../types/projects.types";

// چند پروژه‌ی دیگه از همون دسته‌بندی، برای «پروژه‌های مشابه» پایین صفحه‌ی
// جزئیات پروژه؛ خود پروژه‌ی فعلی از نتیجه حذف می‌شه.
export function useRelatedProjects(
  categoryId: string | undefined,
  excludeId: string | undefined,
) {
  const [projects, setProjects] = useState<Project[]>([]);
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
        const res = await getProjectsRequest({
          category: categoryId,
          limit: 4,
          sort: "-createdAt",
        });
        if (isMounted) {
          setProjects(res.projects.filter((p) => p._id !== excludeId).slice(0, 3));
        }
      } catch {
        if (isMounted) setProjects([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [categoryId, excludeId]);

  return { projects, isLoading };
}
