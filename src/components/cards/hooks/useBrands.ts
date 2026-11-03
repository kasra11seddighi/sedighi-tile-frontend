import { useEffect, useState } from "react";
import { getBrands } from "../services/brands.service";
import type { Brand } from "../types/brands.types";

// اضافه کردن یک پارامتر اختیاری برای تعیین محدودیت تعداد
export const useBrands = (limit?: number) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getBrands();

        // اگر limit تعریف شده بود، آرایه را برش بده
        if (limit) {
          setBrands(data.slice(0, limit));
        } else {
          setBrands(data);
        }
      } catch (err) {
        console.error("Failed to fetch brands:", err);
        setError("خطا در دریافت برندها");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [limit]); // اگر limit تغییر کرد، دوباره fetch انجام شود

  return { brands, loading, error };
};
