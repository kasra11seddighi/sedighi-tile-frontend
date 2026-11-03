import { useBrands } from "./hooks/useBrands";
import BrandList from "./components/BrandList";
import BrandSlider from "./components/BrandSlider";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Brands = () => {
  const { brands, loading, error } = useBrands();

  if (!loading && !error && !brands.length) return null;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            برندهای منتخب
          </h2>

          <Link
            to="/brands"
            className="group flex shrink-0 items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white sm:text-base"
          >
            دیدن تمام برندها
            <ArrowLeft
              size={19}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
          </Link>
        </div>

        {/* Desktop & Tablet */}
        <div className="hidden md:block">
          <BrandList brands={brands} loading={loading} error={error} />
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          {loading ? (
            <BrandList brands={brands} loading={loading} error={error} />
          ) : error ? (
            <BrandList brands={brands} loading={loading} error={error} />
          ) : (
            <BrandSlider brands={brands} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Brands;
