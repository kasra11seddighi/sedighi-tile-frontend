import { useMemo, useState } from "react";
import { Award, Search, X } from "lucide-react";
import { useBrands } from "./hooks/useBrands";
import BrandList from "./components/BrandList";

// اندپوینت /brands لیست کامل رو یک‌جا برمی‌گردونه (بدون صفحه‌بندی/کوئری)،
// پس جستجو اینجا سمت کلاینت انجام می‌شه؛ اگه تعداد برندها خیلی زیاد شد،
// می‌شه مثل useProjects/useProducts این‌رو به سرور منتقل کرد.
export default function BrandsSection() {
  const { brands, loading, error } = useBrands();
  const [search, setSearch] = useState("");

  const filteredBrands = useMemo(() => {
    const query = search.trim();
    if (!query) return brands;
    return brands.filter((brand) => brand.name.includes(query));
  }, [brands, search]);

  return (
    <div dir="rtl">
      <section className="relative overflow-hidden pb-10 pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <Award size={13} />
            برندها
          </div>

          <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            تمام برندهای همکار
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/60">
            کاشی، سرامیک و شیرآلات از برندهای معتبر و منتخب که با آن‌ها همکاری
            می‌کنیم.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        {!loading && !error && brands.length > 0 && (
          <div className="relative mb-6">
            <Search
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/25"
            />

            <input
              type="text"
              placeholder="جستجوی برند..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-11 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-brand/50 focus:bg-white/[0.06]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="پاک کردن جستجو"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-brand-light"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {!loading && !error && brands.length > 0 && (
          <p className="mb-5 text-xs text-white/40">
            {filteredBrands.length.toLocaleString("fa-IR")} برند پیدا شد
          </p>
        )}

        <BrandList brands={filteredBrands} loading={loading} error={error} />
      </section>
    </div>
  );
}
