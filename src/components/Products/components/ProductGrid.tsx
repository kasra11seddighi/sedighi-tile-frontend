import { PackageX, AlertCircle } from "lucide-react";
import ProductCard from "../../shared/ProductCard";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import { isTileCategory } from "../../../utils/isTileCategory";
import { useSiteConfig } from "../../../context/SiteConfigContext";
import type { Product } from "../types/products.types";

interface Props {
  products: Product[];
  isLoading: boolean;
  error: string;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="aspect-square w-full bg-white/5" />

      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 rounded bg-white/5" />
        <div className="h-4 w-4/5 rounded bg-white/5" />
        <div className="h-4 w-1/2 rounded bg-white/5" />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, isLoading, error }: Props) {
  const { cartEnabled, contactPhone } = useSiteConfig();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 py-16 text-center"
      >
        <AlertCircle size={28} className="text-red-300" />

        <p className="text-sm text-red-300">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] py-16 text-center"
      >
        <PackageX size={28} className="text-white/25" />

        <p className="text-sm text-white/50">محصولی با این فیلترها پیدا نشد.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={{
            id: product._id,
            slug: product.slug,
            name: product.name,
            image: product.images?.[0]
              ? resolveImageUrl(product.images[0])
              : undefined,
            price: product.price,
            discountPrice: product.discountPrice,
            categoryName: product.category?.name,
            brandName: product.brand?.name,
            inStock: product.stock > 0,
            saleUnit: product.saleUnit,
            pricePerM2: product.pricePerM2,
            pricePerCarton: product.pricePerCarton,
          }}
          showPrice={false}
          cartEnabled={cartEnabled}
          contactPhone={contactPhone}
          aiVisualizerHref={
            isTileCategory(product.category?.name)
              ? `/?tile=${product._id}#room-visualizer`
              : undefined
          }
        />
      ))}
    </div>
  );
}
