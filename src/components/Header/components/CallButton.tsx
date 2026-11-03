import { Phone } from "lucide-react";

interface Props {
  phone: string;
}

// دکمه‌ی تماس مستقیم توی هدر (فقط دسکتاپ) - برای مشتری‌هایی که ترجیح
// می‌دن به‌جای پیمایش سایت، مستقیم زنگ بزنن.
function CallButton({ phone }: Props) {
  return (
    <a
      href={`tel:${phone}`}
      dir="ltr"
      className="
        flex
        h-12
        items-center
        gap-2
        rounded-xl
        border
        border-white/10
        bg-[#101c2d]
        px-4
        text-sm
        font-bold
        text-white
        transition
        hover:border-brand
        hover:text-brand
      "
    >
      <Phone size={17} />
      {phone}
    </a>
  );
}

export default CallButton;
