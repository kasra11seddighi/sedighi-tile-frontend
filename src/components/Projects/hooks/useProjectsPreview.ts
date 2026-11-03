import { useEffect, useState } from "react";
import { getProjectsRequest } from "../services/projects.service";
import type { Project } from "../types/projects.types";

// نسخه‌ی سبک useProjects، مخصوص پیش‌نمایش صفحه‌ی اصلی: بدون فیلتر/جستجو/
// صفحه‌بندی، فقط چند تا از جدیدترین پروژه‌ها. همون اندپوینتی که
// ProjectsSection استفاده می‌کنه (نگاه کن به TODO(backend) توی
// projects.service.ts).
export function useProjectsPreview(limit: number = 3) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const res = await getProjectsRequest({ limit, sort: "-createdAt" });
        if (isMounted) setProjects(res.projects);
      } catch {
        if (isMounted) setError("دریافت پروژه‌ها با خطا مواجه شد.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { projects, isLoading, error };
}
