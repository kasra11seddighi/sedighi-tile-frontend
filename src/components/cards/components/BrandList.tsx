import BrandCard from "./BrandCard";
import type { Brand } from "../types/brands.types";

type BrandListProps = {
  brands: Brand[];
  loading: boolean;
  error: string;
};

const BrandList = ({ brands, loading, error }: BrandListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl bg-slate-800"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!brands.length) {
    return <p className="text-sm text-gray-500">برندی یافت نشد.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {brands.map((brand) => (
        <BrandCard key={brand._id} brand={brand} />
      ))}
    </div>
  );
};

export default BrandList;
