import { useEffect, useState } from "react";

import { getHeaderData } from "../services/header.service";

import type { HeaderData } from "../types/header.types";

export function useHeader() {
  const [data, setData] = useState<HeaderData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  async function fetchHeader() {
    try {
      setLoading(true);
      setError(null);

      const result = await getHeaderData();

      setData(result);
    } catch {
      setError("خطا در دریافت اطلاعات هدر");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHeader();
  }, []);

  function toggleMobileMenu() {
    setIsMobileOpen((prev) => !prev);
  }

  function closeMobileMenu() {
    setIsMobileOpen(false);
  }

  return {
    data,
    loading,
    error,
    isMobileOpen,
    toggleMobileMenu,
    closeMobileMenu,
    retry: fetchHeader,
  };
}
