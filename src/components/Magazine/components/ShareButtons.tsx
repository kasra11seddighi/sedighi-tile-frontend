import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

interface Props {
  title: string;
}

export default function ShareButtons({ title }: Props) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // اگه clipboard در دسترس نبود (مثلاً http غیرامن)، سکوت می‌کنیم؛
      // کاربر همچنان می‌تونه از دکمه‌های واتس‌اپ/تلگرام استفاده کنه
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-white/40">اشتراک‌گذاری:</span>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="اشتراک‌گذاری در واتس‌اپ"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <FaWhatsapp size={14} />
      </a>

      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="اشتراک‌گذاری در تلگرام"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <FaTelegramPlane size={13} />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="کپی لینک"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Link2 size={14} />}
      </button>
    </div>
  );
}
