import { Link } from "react-router-dom";
import { ImageOff, Heart } from "lucide-react";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import type { FavoriteProduct } from "../types/profile.types";

interface Props {
  product: FavoriteProduct;
  onRemove: (productId: string) => void;
}

export default function FavoriteProductCard({ product, onRemove }: Props) {
  const hasDiscount =
    Boolean(product.discountPrice) && product.discountPrice! < product.price;
  const image = product.images?.[0];
  const outOfStock = product.stock <= 0;

  return (
    <div
      dir="rtl"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
    >
      <button
        type="button"
        onClick={() => onRemove(product._id)}
        title="حذف از علاقه‌مندی‌ها"
        className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-brand-light backdrop-blur transition hover:bg-black/70"
      >
        <Heart size={16} fill="currentColor" />
      </button>

      <Link to={`/products/${product.slug}`} className="contents">
        <div className="relative aspect-square w-full overflow-hidden bg-white/5">
          {image ? (
            <img
              src={resolveImageUrl(image)}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white/20">
              <ImageOff size={32} />
            </div>
          )}

          {hasDiscount && (
            <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-2.5 py-1 text-[11px] font-bold text-white">
              تخفیف
            </span>
          )}

          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                ناموجود
              </span>
            </div>
          )}
        </div>

        <div className="flex grow flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">
            {product.name}
          </h3>

          <div className="mt-auto flex items-end justify-between pt-3">
            <span className="text-xs font-bold text-white/50">
              برای قیمت تماس بگیرید
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
