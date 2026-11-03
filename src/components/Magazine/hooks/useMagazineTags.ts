import { useEffect, useState } from "react";
import { getMagazineTagsRequest } from "../services/magazine.service";

export function useMagazineTags() {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await getMagazineTagsRequest();
        if (isMounted) setTags(data);
      } catch {
        // اگه تگ‌ها لود نشد، فیلتر تگ صرفاً نمایش داده نمی‌شود
        if (isMounted) setTags([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { tags, isLoading };
}
