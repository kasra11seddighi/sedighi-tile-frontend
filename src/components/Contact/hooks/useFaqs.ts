import { useEffect, useState } from "react";
import { getFaqs } from "../services/contact.service";
import type { Faq } from "../types/contact.types";

export function useFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch {
        // اگه سوالات متداول لود نشد، بخش FAQ صرفاً خالی نمایش داده می‌شود
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { faqs, loading };
}
