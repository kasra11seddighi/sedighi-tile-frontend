import { useEffect, useState } from "react";
import { getMagazineBySlug } from "../services/magazine.service";
import type { MagazineArticle } from "../types/magazine.types";

export function useMagazineDetail(slug: string | undefined) {
  const [article, setArticle] = useState<MagazineArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getMagazineBySlug(slug!);
        if (isMounted) setArticle(data);
      } catch {
        if (isMounted) setError("این مقاله پیدا نشد یا حذف شده.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { article, isLoading, error };
}
