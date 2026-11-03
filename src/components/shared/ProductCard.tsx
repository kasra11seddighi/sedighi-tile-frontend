import { Link } from "react-router-dom";
import {
  Heart,
  ImageOff,
  Sparkles,
  ShoppingCart,
  Check,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

export interface SharedProductCardData {
  id: string;
  slug: string;
  name: string;
  image?: string; // آدرس کامل و نهایی تصویر (پیشوند API از قبل اضافه شده باشه)
  price: number;
  discountPrice?: number;
  brandName?: string;
  categoryName?: string;
  inStock?: boolean; // اگه مشخص نباشه، موجود در نظر گرفته می‌شه

  // --- فروش متری/کارتنی (فقط محصولات کاشی/سرامیک) ---
  saleUnit?: "m2" | "carton" | "both";
  pricePerM2?: number;
  pricePerCarton?: number;
}

interface Props {
  product: SharedProductCardData;
  /** لینک صفحه‌ی جزئیات محصول (پیش‌فرض: /products/:id) */
  href?: string;
  /** اگه پر بشه، دکمه‌ی «دیدن در خانه خود» (اعمال با هوش مصنوعی) نمایش داده می‌شه */
  aiVisualizerHref?: string;
  /** پس‌زمینه‌ی تیره (بقیه‌ی سایت) یا روشن (بخش کاشی‌یاب) */
  theme?: "dark" | "light";
  showFavorite?: boolean;
  /** اگه false باشه، به‌جای قیمت یه دکمه‌ی «تماس بگیرید» نشون داده می‌شه */
  showPrice?: boolean;
  /** اگه false باشه، به‌جای افزودن به سبد، دکمه‌ی تماس نشون داده می‌شه */
  cartEnabled?: boolean;
  /** شماره‌ی تماس برای دکمه‌ی «تماس بگیرید» وقتی قیمت/سبد غیرفعاله */
  contactPhone?: string;
}

const themeStyles = {
  dark: {
    card: "border-white/10 bg-white/[0.03] hover:border-brand/40",
    imageBg: "bg-white/5",
    imagePlaceholder: "text-white/20",
    metaText: "text-white/40",
    title: "text-white",
    price: "text-white",
    discountPrice: "text-brand-light",
    strikePrice: "text-white/35",
    viewButton:
      "border-white/15 text-white/80 hover:border-brand/60 hover:text-brand",
    favoriteButton: "bg-black/40 text-white/70 hover:scale-110",
    favoriteActive: "text-red-500",
  },
  light: {
    card: "border-[#E7DECD] bg-white shadow-[0_6px_20px_rgba(42,36,29,0.06)] hover:border-[#D8C7B2] hover:shadow-[0_14px_32px_rgba(42,36,29,0.12)]",
    imageBg: "bg-[#F1ECE2]",
    imagePlaceholder: "text-[#B7AA98]",
    metaText: "text-[#8C8174]",
    title: "text-[#2A241D]",
    price: "text-[#2A241D]",
    discountPrice: "text-[#B5622F]",
    strikePrice: "text-[#8C8174]",
    viewButton:
      "border-[#2A241D] text-[#2A241D] hover:bg-[#2A241D] hover:text-white",
    favoriteButton: "bg-white text-[#8C8174] shadow-md hover:scale-110",
    favoriteActive: "text-red-500",
  },
} as const;

export default function ProductCard({
  product,
  href,
  aiVisualizerHref,
  theme = "dark",
  showFavorite = true,
  showPrice = true,
  cartEnabled = true,
  contactPhone,
}: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const t = themeStyles[theme];

  const detailsHref = href ?? `/products/${product.slug}`;
  const hasDiscount =
    Boolean(product.discountPrice) && product.discountPrice! < product.price;
  const outOfStock = product.inStock === false;
  const favorite = isFavorite(product.id);
  const inCart = isInCart(product.id);
  const isTileSale = Boolean(product.saleUnit); // نیاز به انتخاب متر/کارتن داره

  function handleFavoriteClick(e: React.MouseEvent) {
    e.preventDefault();
    toggleFavorite(product.id);
  }

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock || isTileSale) return; // محصول متری/کارتنی از خود صفحه محصول اضافه می‌شه

    await addToCart({ productId: product.id, quantity: 1 });

    // یه فیدبک کوتاه بصری که کاربر مطمئن بشه اضافه شد
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div
      dir="rtl"
      className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${t.card}`}
    >
      <div
        className={`relative aspect-square w-full overflow-hidden ${t.imageBg}`}
      >
        <Link to={detailsHref}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center ${t.imagePlaceholder}`}
            >
              <ImageOff size={32} />
            </div>
          )}
        </Link>

        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-2.5 py-1 text-[11px] font-bold text-white">
            تخفیف
          </span>
        )}

        {outOfStock && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
              ناموجود
            </span>
          </div>
        )}

        {showFavorite && (
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label="افزودن به علاقه‌مندی"
            className={`absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition-all ${t.favoriteButton} ${
              favorite ? t.favoriteActive : ""
            }`}
          >
            <Heart size={17} fill={favorite ? "currentColor" : "none"} />
          </button>
        )}
      </div>

      <div className="flex grow flex-col gap-2 p-4">
        {(product.categoryName || product.brandName) && (
          <span className={`text-[11px] font-medium ${t.metaText}`}>
            {product.categoryName ?? product.brandName}
          </span>
        )}

        <Link to={detailsHref}>
          <h3
            className={`line-clamp-2 text-sm font-bold leading-snug ${t.title}`}
          >
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between pt-3">
          {!showPrice ? (
            <span className={`text-xs font-bold ${t.metaText}`}>
              برای قیمت تماس بگیرید
            </span>
          ) : isTileSale ? (
            <div className="flex flex-col gap-0.5">
              {(product.saleUnit === "m2" || product.saleUnit === "both") &&
                product.pricePerM2 && (
                  <span className={`text-sm font-extrabold ${t.price}`}>
                    {product.pricePerM2.toLocaleString("fa-IR")}
                    <span
                      className={`mr-1 text-[11px] font-normal ${t.metaText}`}
                    >
                      تومان / متر
                    </span>
                  </span>
                )}
              {(product.saleUnit === "carton" || product.saleUnit === "both") &&
                product.pricePerCarton && (
                  <span className={`text-sm font-extrabold ${t.price}`}>
                    {product.pricePerCarton.toLocaleString("fa-IR")}
                    <span
                      className={`mr-1 text-[11px] font-normal ${t.metaText}`}
                    >
                      تومان / کارتن
                    </span>
                  </span>
                )}
            </div>
          ) : hasDiscount ? (
            <div className="flex flex-col">
              <span className={`text-xs line-through ${t.strikePrice}`}>
                {product.price.toLocaleString("fa-IR")}
              </span>
              <span className={`text-base font-extrabold ${t.discountPrice}`}>
                {product.discountPrice!.toLocaleString("fa-IR")}
                <span className={`mr-1 text-[11px] font-normal ${t.metaText}`}>
                  تومان
                </span>
              </span>
            </div>
          ) : (
            <span className={`text-base font-extrabold ${t.price}`}>
              {product.price.toLocaleString("fa-IR")}
              <span className={`mr-1 text-[11px] font-normal ${t.metaText}`}>
                تومان
              </span>
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Link
            to={detailsHref}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${t.viewButton}`}
          >
            مشاهده محصول
          </Link>

          {!cartEnabled ? (
            <a
              href={contactPhone ? `tel:${contactPhone}` : detailsHref}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-l from-[#B56A3B] to-[#D08B59] px-3 py-1.5 text-xs font-bold text-white transition-all hover:brightness-110"
            >
              <Phone size={13} />
              تماس بگیرید
            </a>
          ) : isTileSale ? (
            <Link
              to={detailsHref}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                outOfStock
                  ? "pointer-events-none cursor-not-allowed bg-white/5 text-white/30"
                  : "bg-gradient-to-l from-[#B56A3B] to-[#D08B59] text-white hover:brightness-110"
              }`}
            >
              <ShoppingCart size={13} />
              انتخاب مقدار و افزودن
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                outOfStock
                  ? "cursor-not-allowed bg-white/5 text-white/30"
                  : justAdded
                    ? "bg-emerald-600 text-white"
                    : inCart
                      ? "bg-brand/20 text-brand hover:bg-brand/30"
                      : "bg-gradient-to-l from-[#B56A3B] to-[#D08B59] text-white hover:brightness-110"
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={13} />
                  اضافه شد
                </>
              ) : (
                <>
                  <ShoppingCart size={13} />
                  {inCart ? "افزودن مجدد" : "افزودن به سبد"}
                </>
              )}
            </button>
          )}

          {aiVisualizerHref && (
            <Link
              to={aiVisualizerHref}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-l from-[#4F46E5] to-[#8B5CF6] px-3 py-1.5 text-xs font-bold text-white shadow-[0_6px_16px_rgba(124,58,237,0.35)] transition-all hover:brightness-110"
            >
              <Sparkles size={13} />
              دیدن در خانه خود
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
