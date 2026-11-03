import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../api/axios";

interface SiteConfig {
  // سبد خرید/چک‌اوت سراسری؛ فعلاً پیش‌فرض false (مثل شیرآلات، هنوز فعال
  // نیست) و فقط از داشبورد ادمین (تنظیمات سایت) قابل روشن شدنه.
  cartEnabled: boolean;
  // آیا بخش «شیرآلات» در صفحه اصلی نمایش داده بشه؛ فقط از داشبورد ادمین
  // قابل روشن/خاموش شدنه.
  shiralatEnabled: boolean;
  contactPhone?: string;
  social: {
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
  };
  loading: boolean;
}

const defaultConfig: SiteConfig = {
  cartEnabled: false,
  shiralatEnabled: false,
  contactPhone: undefined,
  social: {},
  loading: true,
};

const SiteConfigContext = createContext<SiteConfig>(defaultConfig);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        // همون سند تنظیمات مشترک هدر/فوتر؛ cartEnabled و contact هم روش هستن
        const res = await api.get("/settings/footer");
        const data = res.data.data;

        if (isMounted) {
          setConfig({
            cartEnabled: Boolean(data?.cartEnabled),
            shiralatEnabled: Boolean(data?.shiralatEnabled),
            contactPhone: data?.contact?.phone || undefined,
            social: {
              instagram: data?.social?.instagram || undefined,
              telegram: data?.social?.telegram || undefined,
              whatsapp: data?.social?.whatsapp || undefined,
            },
            loading: false,
          });
        }
      } catch {
        // اگه تنظیمات نیومد، محافظه‌کارانه سبد خرید رو خاموش نگه می‌داریم
        if (isMounted) setConfig({ ...defaultConfig, loading: false });
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
