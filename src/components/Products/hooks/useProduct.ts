import { useEffect, useState } from "react";
import { getProductByIdRequest } from "../services/products.service";
import type { Product } from "../types/products.types";

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError("شناسه محصول نامعتبر است.");
      return;
    }

    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError("");

        const res = await getProductByIdRequest(id as string);

        if (!isCancelled) {
          if (res) {
            setProduct(res);
          } else {
            setProduct(null);
            setError("محصول مورد نظر پیدا نشد.");
          }
        }
      } catch {
        if (!isCancelled) {
          setProduct(null);
          setError("دریافت اطلاعات محصول با خطا مواجه شد. دوباره تلاش کنید.");
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

  return { product, isLoading, error };
}
