import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, ArrowUpLeft } from "lucide-react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { useFooter } from "./hooks/useFooter";
import type { FooterLink } from "./types/footer.types";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const DEFAULT_QUICK_LINKS: FooterLink[] = [
  { title: "خانه", path: "/" },
  { title: "محصولات", path: "/products" },
  { title: "برندها", path: "/brands" },
  { title: "پروژه‌ها", path: "/projects" },
  { title: "کاشی‌یاب هوشمند", path: "/#tile-finder" },
  { title: "شیرآلات", path: "/#shiralat" },
  { title: "سبد خرید", path: "/cart" },
];

const DEFAULT_HELP_LINKS: FooterLink[] = [
  { title: "درباره ما", path: "/about" },
  { title: "تماس با ما", path: "/contact" },
  { title: "شرایط و قوانین", path: "/terms" },
  { title: "حریم خصوصی", path: "/privacy" },
  { title: "سوالات متداول", path: "/contact#faq" },
];

// لینک‌های داخلی (مسیرهای SPA) با Link رندر می‌شن تا بدون رفرش کامل صفحه
// ناوبری بشن؛ لینک‌های خارجی/هش-فقط با <a> معمولی.
function isInternalRoute(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

const DEFAULT_DESCRIPTION =
  "تأمین‌کننده‌ی تخصصی کاشی، سرامیک و شیرآلات با گزینه‌های متنوع از برندهای معتبر؛ از انتخاب تا نصب، همراه شما هستیم.";

function Footer() {
  const { data } = useFooter();

  // تا وقتی دیتای بک‌اند نیومده (یا خطا خورده)، از مقادیر پیش‌فرض استفاده می‌کنیم
  // تا فوتر هیچ‌وقت خالی یا شکسته دیده نشه
  const logoText = data?.logo || "نمایندگی صدیقی";
  const description = data?.description || DEFAULT_DESCRIPTION;
  const quickLinks = data?.quickLinks?.length
    ? data.quickLinks
    : DEFAULT_QUICK_LINKS;
  const helpLinks = data?.helpLinks?.length
    ? data.helpLinks
    : DEFAULT_HELP_LINKS;
  const social = data?.social;
  const contact = data?.contact;

  return (
    <footer dir="rtl" className="relative mt-24 overflow-hidden bg-[#050b14]">
      {/* خط نوری بالای فوتر - هم‌راستا با هویت طلایی سایت */}
      <div className="h-px w-full bg-gradient-to-l from-transparent via-brand/50 to-transparent" />

      <div className="mx-auto max-w-[1500px] px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
          {/* معرفی برند */}
          <div>
            <div className="flex flex-row-reverse items-center justify-end gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to text-lg font-black text-white shadow-lg shadow-brand-gradient-via/30">
                {data?.logoImage ? (
                  <img
                    src={resolveImageUrl(data.logoImage)}
                    alt={logoText}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "ک"
                )}
              </div>
              <h2 className="text-2xl font-black text-[#D8B28B]">{logoText}</h2>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-8 text-white/60">
              {description}
            </p>

            {(social?.instagram || social?.telegram || social?.whatsapp) && (
              <div className="mt-6 flex items-center gap-3">
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="اینستاگرام"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    <FaInstagram size={17} />
                  </a>
                )}
                {social.telegram && (
                  <a
                    href={social.telegram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="تلگرام"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    <FaTelegramPlane size={17} />
                  </a>
                )}
                {social.whatsapp && (
                  <a
                    href={social.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="واتس‌اپ"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                )}
              </div>
            )}

            {/* نماد اعتماد الکترونیکی (اینماد) */}
            <div className="mt-6">
              <a
                referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=7650287&Code=3SMEhcdh49gqrJ6PFYvdHVcXILZ5937Y"
              >
                <img
                  referrerPolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=7650287&Code=3SMEhcdh49gqrJ6PFYvdHVcXILZ5937Y"
                  alt="نماد اعتماد الکترونیکی"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="text-sm font-bold text-white">دسترسی سریع</h3>
            <ul className="mt-5 space-y-3.5">
              {quickLinks.map((link) => {
                const linkClass =
                  "group flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-brand";
                const linkContent = (
                  <>
                    <ArrowUpLeft
                      size={13}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                    {link.title}
                  </>
                );

                return (
                  <li key={link.path}>
                    {isInternalRoute(link.path) ? (
                      <Link to={link.path} className={linkClass}>
                        {linkContent}
                      </Link>
                    ) : (
                      <a href={link.path} className={linkClass}>
                        {linkContent}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* راهنما */}
          <div>
            <h3 className="text-sm font-bold text-white">راهنما</h3>
            <ul className="mt-5 space-y-3.5">
              {helpLinks.map((link) => {
                const linkClass =
                  "group flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-brand";
                const linkContent = (
                  <>
                    <ArrowUpLeft
                      size={13}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                    {link.title}
                  </>
                );

                return (
                  <li key={link.path}>
                    {isInternalRoute(link.path) ? (
                      <Link to={link.path} className={linkClass}>
                        {linkContent}
                      </Link>
                    ) : (
                      <a href={link.path} className={linkClass}>
                        {linkContent}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* تماس */}
          <div>
            <h3 className="text-sm font-bold text-white">تماس با ما</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              {contact?.phone && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand">
                    <Phone size={15} />
                  </span>
                  <span dir="ltr" className="pt-1.5">
                    {contact.phone}
                  </span>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand">
                    <Mail size={15} />
                  </span>
                  <span className="pt-1.5">{contact.email}</span>
                </li>
              )}
              {contact?.address && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand">
                    <MapPin size={15} />
                  </span>
                  <span className="pt-1.5 leading-7">{contact.address}</span>
                </li>
              )}
              {!contact?.phone && !contact?.email && !contact?.address && (
                <li className="text-white/30">
                  اطلاعات تماس هنوز ثبت نشده است
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* نوار پایانی */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/40 sm:flex-row md:px-10">
          <p>
            © {new Date().getFullYear()} {logoText}. تمامی حقوق محفوظ است.
          </p>
          <p>طراحی و توسعه با ❤ برای عاشقان کاشی و سرامیک</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
