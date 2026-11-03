import { useEffect, useState } from "react";
import { getProjectByIdRequest } from "../services/projects.service";
import type { Project } from "../types/projects.types";

export function useProject(id: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError("شناسه پروژه نامعتبر است.");
      return;
    }

    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError("");

        const res = await getProjectByIdRequest(id as string);

        if (!isCancelled) {
          if (res) {
            setProject(res);
          } else {
            setProject(null);
            setError("پروژه مورد نظر پیدا نشد.");
          }
        }
      } catch {
        if (!isCancelled) {
          setProject(null);
          setError("دریافت اطلاعات پروژه با خطا مواجه شد. دوباره تلاش کنید.");
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [id]);

  return { project, isLoading, error };
}
