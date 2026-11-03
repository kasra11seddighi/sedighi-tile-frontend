import { useEffect, useState } from "react";
import { getCategories, getProductsByCategory } from "../services/shiralat.service";
import type { ShiralatProduct } from "../types/shiralat.types";

// چون هنوز فیلد اختصاصی برای دسته «شیرآلات» در بک‌اند نداریم،
// دسته‌بندی مرتبط رو از روی نام‌های محتمل پیدا می‌کنیم.
const FAUCET_KEYWORDS = ["شیرآلات", "شیرالات", "شیر آلات", "شیر"];

export function useShiralat() {
  const [products, setProducts] = useState<ShiralatProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFound, setCategoryFound] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);

      const categories = await getCategories();
      const faucetCategory = categories.find((category) =>
        FAUCET_KEYWORDS.some((keyword) => category.name.includes(keyword)),
      );

      if (!faucetCategory) {
        setCategoryFound(false);
        setProducts([]);
        return;
      }

      setCategoryFound(true);
      const data = await getProductsByCategory(faucetCategory._id);
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  return { products, loading, categoryFound };
}
