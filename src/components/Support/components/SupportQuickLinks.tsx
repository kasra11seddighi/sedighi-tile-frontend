import { Phone } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { useFooter } from "../../Footer/hooks/useFooter";

// دیتای تماس/شبکه‌های اجتماعی از همون تنظیمات فوتر میاد (/settings/footer)
// که یه‌بار دیگه هم توی Footer.tsx فچ می‌شه؛ به‌جای ساختن اندپوینت جدید یا
// pass‌کردن prop از لایه‌ی بالاتر، همون هوک موجود دوباره صدا زده می‌شه
// (هر کدوم مستقل لود/کش می‌شن، دقیقاً مثل الگوی Header/Hero توی MainLayout).
export default function SupportQuickLinks() {
  const { data } = useFooter();
  const social = data?.social;
  const phone = data?.contact?.phone;

  const hasAny = phone || social?.whatsapp || social?.telegram;
  if (!hasAny) return null;

  return (
    <div className="flex items-center gap-2">
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-brand/50 hover:text-brand"
          aria-label="تماس تلفنی"
        >
          <Phone size={16} />
        </a>
      )}
      {social?.whatsapp && (
        <a
          href={social.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-[#25D366]/50 hover:text-[#25D366]"
          aria-label="واتس‌اپ"
        >
          <FaWhatsapp size={17} />
        </a>
      )}
      {social?.telegram && (
        <a
          href={social.telegram}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-[#229ED9]/50 hover:text-[#229ED9]"
          aria-label="تلگرام"
        >
          <FaTelegramPlane size={16} />
        </a>
      )}
    </div>
  );
}
