import { useEffect, useState } from "react";
import { getMagazineList } from "../services/magazine.service";
import type { MagazineListItem } from "../types/magazine.types";

// اینجا نیازی به فیلتر سمت سرور نداریم؛ یه صفحه‌ی بزرگ (limit: 50) می‌گیریم
// و خودمون بر اساس تگ‌های مشترک فیلتر می‌کنیم؛ اگه مقاله‌ای با تگ مشترک
// نبود، جدیدترین مقاله‌های دیگه (به‌جز خود مقاله‌ی فعلی) رو نشون می‌دیم تا
// بخش خالی نمونه. اگه یه روز تعداد مقاله‌ها از 50 تا بیشتر شد، بهتره یه
// اندپوینت اختصاصی «مقالات مرتبط» توی بک‌اند اضافه بشه.
export function useRelatedArticles(currentSlug: string | undefined, tags: string[]) {
  const [articles, setArticles] = useState<MagazineListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        const { articles: all } = await getMagazineList({ limit: 50 });
        if (!isMounted) return;

        const others = all.filter((a) => a.slug !== currentSlug);
        const sameTag = others.filter((a) => a.tags?.some((t) => tags.includes(t)));
        const rest = others.filter((a) => !sameTag.includes(a));

        setArticles([...sameTag, ...rest].slice(0, 3));
      } catch {
        if (isMounted) setArticles([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug, tags.join(",")]);

  return { articles, isLoading };
}
