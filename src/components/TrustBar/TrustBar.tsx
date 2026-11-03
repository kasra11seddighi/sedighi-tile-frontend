import { useAboutContent } from "../About/hooks/useAboutContent";
import { FALLBACK_ABOUT_DATA } from "../About/fallback";
import { getAboutIcon } from "../About/iconMap";

// نسخه‌ی خلاصه‌ی بخش «چرا نمایندگی صدیقی» که توی صفحه‌ی About هست، درست
// زیر هیروی صفحه‌ی اصلی. عمداً محتوای جدا تعریف نمی‌کنیم و از همون
// useAboutContent + fallback استفاده می‌کنیم؛ یعنی اگه ادمین این آیتم‌ها رو
// از پنل ویرایش کنه، هم صفحه‌ی About و هم این نوار به‌روز می‌شن.
function TrustBar() {
  const { data } = useAboutContent();

  const items = (data ?? FALLBACK_ABOUT_DATA).values.items.slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section dir="rtl" className="py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 sm:grid-cols-4 sm:gap-3 sm:px-6">
          {items.map(({ icon, title }) => {
            const Icon = getAboutIcon(icon);
            return (
              <div
                key={title}
                className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-right"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gradient-from/20 to-brand-gradient-to/20 text-brand-light">
                  <Icon size={18} />
                </span>
                <span className="text-xs font-bold leading-5 text-white/85 sm:text-sm">
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
