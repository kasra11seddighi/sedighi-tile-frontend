import { useEffect, useMemo, useState } from "react";

/**
 * منطق مشترک صفحه‌بندی روی یک آرایه‌ی سمت کلاینت.
 * وقتی تعداد آیتم‌های ورودی عوض بشه (مثلاً نتیجه یک فیلتر جدید)،
 * خودکار به صفحه‌ی ۱ برمی‌گرده.
 *
 * استفاده در: FilterStep، SizeSelector و ResultGrid (کاشی‌یاب) و ShiralatSection.
 */
export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, page, itemsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [items.length]);

  return { page, setPage, totalPages, paginatedItems };
}
