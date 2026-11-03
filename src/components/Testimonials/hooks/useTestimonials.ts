import { useEffect, useState } from "react";
import { getTestimonials } from "../services/testimonials.service";
import type { Testimonial } from "../types/testimonials.types";

export function useTestimonials(limit?: number) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getTestimonials(limit);
        if (isMounted) setTestimonials(data);
      } catch {
        if (isMounted) setError("دریافت نظرات مشتری‌ها با خطا مواجه شد.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { testimonials, isLoading, error };
}
