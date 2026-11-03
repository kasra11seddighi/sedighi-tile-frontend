import { useEffect, useState } from "react";
import { getSortOptionsRequest } from "../services/products.service";
import type { SortOptionItem } from "../types/products.types";

// اگه بک‌اند در دسترس نبود یا هنوز اندپوینتش پیاده نشده، همین لیست پیش‌فرض
// نمایش داده میشه تا فیلتر مرتب‌سازی از کار نیفته.
const FALLBACK_SORT_OPTIONS: SortOptionItem[] = [
  { value: "-createdAt", label: "جدیدترین" },
  { value: "createdAt", label: "قدیمی‌ترین" },
  { value: "price", label: "ارزان‌ترین" },
  { value: "-price", label: "گران‌ترین" },
];

export function useSortOptions() {
  const [sortOptions, setSortOptions] =
    useState<SortOptionItem[]>(FALLBACK_SORT_OPTIONS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await getSortOptionsRequest();
        if (isMounted && data.length > 0) {
          setSortOptions(data);
        }
      } catch {
        // در صورت خطا، همون لیست پیش‌فرض باقی می‌مونه
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { sortOptions, isLoading };
}
