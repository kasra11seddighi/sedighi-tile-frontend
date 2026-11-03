import { useEffect, useState } from "react";

// برای افکت جمع‌شدن/تیره‌ترشدن هدر موقع اسکرول؛ فقط یک state boolean
// برمی‌گردونه که بعد از رد شدن از threshold، true می‌شه.
export function useScrolled(threshold = 12) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > threshold);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
