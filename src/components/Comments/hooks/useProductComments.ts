import { useCallback, useEffect, useState } from "react";
import { getProductComments } from "../services/comments.service";
import type { ProductComment } from "../types/comments.types";

export function useProductComments(productId: string | undefined) {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!productId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const data = await getProductComments(productId);
      setComments(data);
    } catch {
      setError("دریافت نظرات با خطا مواجه شد.");
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  return { comments, isLoading, error };
}
