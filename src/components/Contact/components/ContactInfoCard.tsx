import { Phone, Mail, MapPin } from "lucide-react";
import { useFooter } from "../../Footer/hooks/useFooter";

export default function ContactInfoCard() {
  const { data } = useFooter();
  const contact = data?.contact;

  const hasAnyInfo = contact?.phone || contact?.email || contact?.address;

  return (
    <div
      dir="rtl"
      className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <h3 className="text-lg font-bold text-white">راه‌های ارتباطی</h3>
      <p className="mt-1 text-sm text-white/50">
        از این راه‌ها هم می‌تونی مستقیم با ما در ارتباط باشی.
      </p>

      <ul className="mt-6 space-y-5 text-sm text-white/70">
        {contact?.phone && (
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand">
              <Phone size={16} />
            </span>
            <span dir="ltr" className="pt-2">
              {contact.phone}
            </span>
          </li>
        )}

        {contact?.email && (
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand">
              <Mail size={16} />
            </span>
            <span dir="ltr" className="pt-2">
              {contact.email}
            </span>
          </li>
        )}

        {contact?.address && (
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand">
              <MapPin size={16} />
            </span>
            <span className="pt-2 leading-7">{contact.address}</span>
          </li>
        )}

        {!hasAnyInfo && (
          <li className="text-white/30">اطلاعات تماس هنوز ثبت نشده است</li>
        )}
      </ul>
    </div>
  );
}
