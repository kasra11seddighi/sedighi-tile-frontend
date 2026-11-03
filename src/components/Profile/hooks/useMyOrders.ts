import { useEffect, useState } from "react";
import { getMyOrdersRequest } from "../../../services/orders.service";
import type { ApiOrder } from "../../../services/orders.service";

export function useMyOrders(enabled: boolean = true) {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState("");

  useEffect(() => {
    // اگه کاربر لاگین نباشه، اصلاً درخواستی به سرور نمی‌فرستیم (که قراره با خطای ۴۰۱ برگرده)
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getMyOrdersRequest();
        if (isMounted) setOrders(data);
      } catch {
        if (isMounted) {
          setError("دریافت سفارش‌ها با خطا مواجه شد.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [enabled]);

  // بعد از لغو موفق یه سفارش، بدون رفرش کامل لیست، همون آیتم رو توی state جایگزین می‌کنیم
  function updateOrderInPlace(updated: ApiOrder) {
    setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
  }

  return { orders, isLoading, error, updateOrderInPlace };
}
