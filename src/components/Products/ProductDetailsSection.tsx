import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertCircle,
  ImageOff,
  PackageX,
  ShoppingCart,
  Check,
  Ruler,
  Package,
  Phone,
  Heart,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Droplet,
  Layers,
  ShieldCheck,
  Palette,
  Maximize2,
  X,
  Tag,
  Globe,
  Award,
  Sparkles,
  Weight,
  Grid3x3,
  ShieldQuestion,
} from "lucide-react";
import { useProduct } from "./hooks/useProduct";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import TrustBar from "../TrustBar/TrustBar";
import ProductCommentsSection from "../Comments/ProductCommentsSection";
import RelatedProducts from "./components/RelatedProducts";
import RecentlyViewedProducts from "../RecentlyViewed/RecentlyViewedProducts";
import { useSeo } from "../../hooks/useSeo";
import { recordProductView } from "../../hooks/useRecentlyViewed";

function SkeletonDetails() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="h-3 w-1/4 rounded bg-white/5" />
        <div className="h-6 w-3/4 rounded bg-white/5" />
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-5/6 rounded bg-white/5" />
        <div className="h-8 w-1/3 rounded bg-white/5" />
      </div>
      <div className="aspect-[4/5] w-full rounded-2xl bg-white/5" />
    </div>
  );
}

function formatToman(value: number) {
  return `${Math.round(value).toLocaleString("fa-IR")} تومان`;
}

interface SpecRow {
  icon: typeof Ruler;
  label: string;
  value: string;
}

export default function ProductDetailsSection() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useProduct(id);
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { cartEnabled, contactPhone } = useSiteConfig();
  const [activeImage, setActiveImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // عنوان/توضیحات صفحه بر اساس همین محصول؛ تا وقتی لود نشده از یه عنوان
  // خنثی استفاده می‌کنیم تا موقع لودینگ هم تب مرورگر خالی نمونه.
  useSeo({
    title: product?.name ?? "جزئیات محصول",
    description: product?.description?.slice(0, 160),
    image: product?.images?.[0] ? resolveImageUrl(product.images[0]) : undefined,
    type: "product",
  });

  // ثبت این محصول توی «بازدیدهای اخیر» - فقط وقتی محصول واقعاً لود شده
  useEffect(() => {
    if (product?._id) {
      recordProductView(product._id);
    }
  }, [product?._id]);

  // --- حالت انتخاب نحوه‌ی خرید (فقط برای محصولات کاشی/سرامیک) ---
  // اگه saleUnit === "both" باشه کاربر انتخاب می‌کنه، وگرنه همون یکی ثابته
  const [selectedUnit, setSelectedUnit] = useState<"m2" | "carton" | null>(null);
  const [requestedM2, setRequestedM2] = useState<number>(1);
  const [cartons, setCartons] = useState<number>(1);

  // --- انتخاب رنگ (هر رنگ کد و موجودی مستقل خودش رو داره) ---
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const colorVariants = product?.colorVariants ?? [];
  const selectedColor =
    colorVariants.find((c) => c._id === selectedColorId) ?? colorVariants[0];

  const outOfStock = (product?.stock ?? 0) <= 0;

  // گالری تصاویر فقط عکس‌های خود محصول - عکس رنگ‌ها دیگه توی گالری قاطی نمی‌شه
  const images = useMemo(() => product?.images ?? [], [product?.images]);

  const inCart = product ? isInCart(product._id) : false;
  const favorite = product ? isFavorite(product._id) : false;

  const isTileSale = Boolean(product?.saleUnit);
  const activeUnit: "m2" | "carton" | null = product?.saleUnit
    ? product.saleUnit === "both"
      ? selectedUnit
      : (product.saleUnit as "m2" | "carton")
    : null;

  // پیش‌فرضِ مقدار متر رو برابر همون متراژ یک کارتن می‌ذاریم (اگه داشته باشیم)
  const defaultM2 = product?.m2PerCarton ?? 1;

  // --- محاسبه‌ی لحظه‌ای فقط برای نمایش؛ منبع نهایی و معتبر همیشه بک‌انده ---
  const calculation = useMemo(() => {
    if (!product || !activeUnit) return null;

    if (activeUnit === "carton") {
      if (!product.pricePerCarton) return null;
      const actualM2 = product.m2PerCarton
        ? cartons * product.m2PerCarton
        : undefined;
      return {
        cartons,
        actualM2,
        requestedM2: undefined as number | undefined,
        unitPrice: product.pricePerCarton,
        totalPrice: cartons * product.pricePerCarton,
      };
    }

    // activeUnit === "m2"
    if (product.m2PerCarton && product.pricePerCarton) {
      const neededCartons = Math.ceil(requestedM2 / product.m2PerCarton);
      const actualM2 = neededCartons * product.m2PerCarton;
      return {
        cartons: neededCartons,
        actualM2,
        requestedM2,
        unitPrice: product.pricePerCarton,
        totalPrice: neededCartons * product.pricePerCarton,
      };
    }

    if (!product.pricePerM2) return null;
    return {
      cartons: undefined as number | undefined,
      actualM2: requestedM2,
      requestedM2,
      unitPrice: product.pricePerM2,
      totalPrice: requestedM2 * product.pricePerM2,
    };
  }, [product, activeUnit, cartons, requestedM2]);

  // --- ردیف‌های جدول «مشخصات فنی» ---
  // فقط فیلدهایی که واقعاً برای این محصول پر شدن نمایش داده می‌شن؛ این‌طوری
  // هم برای کاشی/سرامیک و هم برای دسته‌بندی‌های دیگه (مثل شیرآلات که این
  // فیلدها رو نداره) جدول به‌درستی خودش رو تطبیق می‌ده.
  const specs: SpecRow[] = [];
  if (product?.sku) {
    specs.push({ icon: Tag, label: "کد محصول", value: product.sku });
  }
  if (product?.tileWidth && product?.tileHeight) {
    specs.push({
      icon: Ruler,
      label: "ابعاد",
      value: `${product.tileWidth} × ${product.tileHeight} سانتی‌متر`,
    });
  }
  if (product?.thickness) {
    specs.push({
      icon: Layers,
      label: "ضخامت",
      value: `${product.thickness.toLocaleString("fa-IR")} میلی‌متر`,
    });
  }
  if (product?.glazeType) {
    specs.push({ icon: Droplet, label: "نوع لعاب", value: product.glazeType });
  }
  if (product?.finish) {
    specs.push({ icon: Sparkles, label: "نوع سطح", value: product.finish });
  }
  if (product?.bodyMaterial) {
    specs.push({ icon: Layers, label: "جنس بدنه", value: product.bodyMaterial });
  }
  if (product?.wearResistance) {
    specs.push({
      icon: ShieldCheck,
      label: "مقاومت در برابر سایش",
      value: product.wearResistance,
    });
  }
  if (product?.waterAbsorption) {
    specs.push({
      icon: ShieldQuestion,
      label: "میزان جذب آب",
      value: product.waterAbsorption,
    });
  }
  if (product?.qualityGrade) {
    specs.push({ icon: Award, label: "درجه کیفیت", value: product.qualityGrade });
  }
  if (product?.originCountry) {
    specs.push({ icon: Globe, label: "کشور سازنده", value: product.originCountry });
  }
  if (product?.suitableFor && product.suitableFor.length > 0) {
    specs.push({
      icon: HomeIcon,
      label: "مناسب برای",
      value: product.suitableFor.join(" و "),
    });
  }
  if (product?.colorDescription) {
    specs.push({ icon: Palette, label: "رنگ", value: product.colorDescription });
  }
  // تعداد کاشی در هر مترمربع - از روی ابعاد به‌صورت خودکار محاسبه می‌شه، نیازی
  // به فیلد جدا توی بک‌اند نداره
  if (product?.tileWidth && product?.tileHeight) {
    const piecesPerM2 =
      10000 / (product.tileWidth * product.tileHeight);
    if (Number.isFinite(piecesPerM2) && piecesPerM2 > 0) {
      specs.push({
        icon: Grid3x3,
        label: "تعداد در مترمربع",
        value: `${Math.round(piecesPerM2).toLocaleString("fa-IR")} عدد`,
      });
    }
  }
  if (product?.piecesPerCarton) {
    specs.push({
      icon: Package,
      label: "تعداد در کارتن",
      value: `${product.piecesPerCarton.toLocaleString("fa-IR")} عدد`,
    });
  }
  if (product?.m2PerCarton) {
    specs.push({
      icon: Package,
      label: "متراژ هر کارتن",
      value: `${product.m2PerCarton.toLocaleString("fa-IR")} مترمربع`,
    });
  }
  if (product?.weightPerCarton) {
    specs.push({
      icon: Weight,
      label: "وزن هر کارتن",
      value: `${product.weightPerCarton.toLocaleString("fa-IR")} کیلوگرم`,
    });
  }
  if (product?.brand?.name) {
    specs.push({ icon: Tag, label: "برند", value: product.brand.name });
  }
  if (product?.warranty) {
    specs.push({ icon: ShieldCheck, label: "گارانتی", value: product.warranty });
  }

  function showPrevImage() {
    setActiveImage((i) => (i - 1 + images.length) % images.length);
  }

  function showNextImage() {
    setActiveImage((i) => (i + 1) % images.length);
  }

  function handleFavoriteClick() {
    if (!product) return;
    toggleFavorite(product._id);
  }

  async function handleAddToCart() {
    if (!product || outOfStock) return;
    setAddError("");

    try {
      setIsAdding(true);

      if (isTileSale) {
        if (!activeUnit) {
          setAddError("لطفاً نحوه‌ی خرید رو انتخاب کنید.");
          return;
        }

        if (activeUnit === "carton") {
          await addToCart({ productId: product._id, saleUnit: "carton", cartons });
        } else {
          await addToCart({ productId: product._id, saleUnit: "m2", requestedM2 });
        }
      } else {
        await addToCart({ productId: product._id, quantity: 1 });
      }

      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "افزودن به سبد با خطا مواجه شد.";
      setAddError(message);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div dir="rtl" className="relative overflow-hidden pb-24 pt-32">
      <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* مسیر صفحه */}
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/40">
          <Link to="/" className="transition-colors hover:text-brand-light">
            خانه
          </Link>
          <ChevronLeft size={13} />
          <Link to="/products" className="transition-colors hover:text-brand-light">
            محصولات
          </Link>
          {product?.category && (
            <>
              <ChevronLeft size={13} />
              <Link
                to={`/products?category=${product.category.slug}`}
                className="transition-colors hover:text-brand-light"
              >
                {product.category.name}
              </Link>
            </>
          )}
          {product && (
            <>
              <ChevronLeft size={13} />
              <span className="text-white/70">{product.name}</span>
            </>
          )}
        </nav>

        {isLoading && <SkeletonDetails />}

        {!isLoading && error && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 py-16 text-center">
            <AlertCircle size={28} className="text-red-300" />
            <p className="text-sm text-red-300">{error}</p>
            <Link
              to="/products"
              className="mt-2 rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              بازگشت به لیست محصولات
            </Link>
          </div>
        )}

        {!isLoading && !error && !product && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] py-16 text-center">
            <PackageX size={28} className="text-white/25" />
            <p className="text-sm text-white/50">محصول مورد نظر پیدا نشد.</p>
          </div>
        )}

        {!isLoading && !error && product && (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* اطلاعات محصول - سمت راست */}
              <div className="order-2 flex flex-col md:order-1">
                <div className="mb-1 flex items-start justify-between gap-3">
                  {product.category && (
                    <span className="text-xs font-medium text-white/40">
                      {product.category.name}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={handleFavoriteClick}
                    aria-label="افزودن به علاقه‌مندی‌ها"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      favorite
                        ? "border-brand text-brand"
                        : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                    }`}
                  >
                    <Heart size={16} fill={favorite ? "currentColor" : "none"} />
                  </button>
                </div>

                <h1 className="text-2xl font-black leading-snug text-white sm:text-3xl">
                  {product.name}
                </h1>

                {product.brand && (
                  <span className="mt-2 text-xs text-white/40">
                    برند: {product.brand.name}
                  </span>
                )}

                <p className="mt-5 text-sm leading-8 text-white/60">
                  {product.description}
                </p>

                {/* جدول مشخصات فنی */}
                {specs.length > 0 && (
                  <div className="mt-6">
                    <h2 className="mb-3 text-sm font-bold text-white/80">
                      مشخصات فنی
                    </h2>
                    <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                      {specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-center justify-between gap-3 px-4 py-3"
                        >
                          <span className="flex items-center gap-2 text-xs font-bold text-white/70">
                            <spec.icon size={15} className="text-brand" />
                            {spec.label}
                          </span>
                          <span className="text-xs text-white/50">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* قیمت */}
                <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <span className="text-sm font-bold text-white/70">
                    برای اطلاع از قیمت، تماس بگیرید
                  </span>
                </div>

                <div className="mt-4">
                  {outOfStock ? (
                    <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                      ناموجود
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      موجود در انبار
                    </span>
                  )}
                </div>

                {/* --- انتخاب نحوه‌ی خرید (فقط برای محصولات کاشی/سرامیک) --- */}
                {cartEnabled && isTileSale && !outOfStock && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    {product.saleUnit === "both" && (
                      <>
                        <p className="mb-2 text-xs font-bold text-white/70">نحوه خرید</p>
                        <div className="mb-4 flex gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedUnit("m2")}
                            className={`flex-1 rounded-xl border py-2 text-xs font-bold transition-colors ${
                              selectedUnit === "m2"
                                ? "border-brand bg-brand/15 text-brand"
                                : "border-white/10 text-white/60 hover:border-white/25"
                            }`}
                          >
                            مترمربع
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedUnit("carton")}
                            className={`flex-1 rounded-xl border py-2 text-xs font-bold transition-colors ${
                              selectedUnit === "carton"
                                ? "border-brand bg-brand/15 text-brand"
                                : "border-white/10 text-white/60 hover:border-white/25"
                            }`}
                          >
                            کارتن
                          </button>
                        </div>
                      </>
                    )}

                    {activeUnit === "m2" && (
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-white/70">
                          متراژ مورد نیاز (مترمربع)
                        </label>
                        <input
                          type="number"
                          min={0.1}
                          step={0.1}
                          value={requestedM2 || ""}
                          onChange={(e) =>
                            setRequestedM2(Math.max(0, Number(e.target.value)))
                          }
                          placeholder={String(defaultM2)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-brand"
                        />

                        {calculation && (
                          <div className="space-y-1.5 rounded-xl bg-white/[0.03] p-3 text-xs text-white/60">
                            {product.m2PerCarton && (
                              <p>
                                هر کارتن:{" "}
                                <span className="font-bold text-white">
                                  {product.m2PerCarton.toLocaleString("fa-IR")} مترمربع
                                </span>
                              </p>
                            )}
                            {calculation.cartons !== undefined && (
                              <p>
                                تعداد کارتن مورد نیاز:{" "}
                                <span className="font-bold text-white">
                                  {calculation.cartons.toLocaleString("fa-IR")}
                                </span>
                              </p>
                            )}
                            {calculation.actualM2 !== undefined && (
                              <p>
                                متراژ نهایی:{" "}
                                <span className="font-bold text-white">
                                  {calculation.actualM2.toLocaleString("fa-IR")} مترمربع
                                </span>
                              </p>
                            )}
                            <p className="pt-1 text-sm">
                              قیمت نهایی:{" "}
                              <span className="font-extrabold text-brand-light">
                                {formatToman(calculation.totalPrice)}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeUnit === "carton" && (
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-white/70">
                          تعداد کارتن
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setCartons((c) => Math.max(1, c - 1))}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-sm font-bold text-white">
                            {cartons.toLocaleString("fa-IR")}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCartons((c) => c + 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>

                        {calculation && (
                          <div className="space-y-1.5 rounded-xl bg-white/[0.03] p-3 text-xs text-white/60">
                            {product.m2PerCarton && (
                              <p>
                                هر کارتن:{" "}
                                <span className="font-bold text-white">
                                  {product.m2PerCarton.toLocaleString("fa-IR")} مترمربع
                                </span>
                              </p>
                            )}
                            {calculation.actualM2 !== undefined && (
                              <p>
                                متراژ کل:{" "}
                                <span className="font-bold text-white">
                                  {calculation.actualM2.toLocaleString("fa-IR")} مترمربع
                                </span>
                              </p>
                            )}
                            <p className="pt-1 text-sm">
                              قیمت کل:{" "}
                              <span className="font-extrabold text-brand-light">
                                {formatToman(calculation.totalPrice)}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {product.saleUnit === "both" && !selectedUnit && (
                      <p className="text-xs text-white/40">
                        برای دیدن محاسبه‌ی قیمت، اول نحوه‌ی خرید رو انتخاب کن.
                      </p>
                    )}
                  </div>
                )}

                {addError && <p className="mt-3 text-xs text-red-300">{addError}</p>}

                {!cartEnabled ? (
                  <a
                    href={contactPhone ? `tel:${contactPhone}` : "/contact"}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#B56A3B] to-[#D08B59] py-3.5 text-sm font-bold text-white transition-all hover:brightness-110"
                  >
                    <Phone size={16} />
                    {contactPhone ? `تماس برای قیمت: ${contactPhone}` : "تماس برای قیمت"}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={
                      outOfStock ||
                      isAdding ||
                      (isTileSale && (!activeUnit || !calculation))
                    }
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all ${
                      outOfStock || (isTileSale && (!activeUnit || !calculation))
                        ? "cursor-not-allowed bg-white/5 text-white/30"
                        : justAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-gradient-to-l from-[#B56A3B] to-[#D08B59] text-white hover:brightness-110"
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check size={16} />
                        به سبد اضافه شد
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        {isAdding
                          ? "در حال افزودن..."
                          : inCart && !isTileSale
                            ? "افزودن مجدد به سبد"
                            : "افزودن به سبد خرید"}
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* گالری تصاویر - سمت چپ */}
              <div className="order-1 md:order-2">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {images[activeImage] ? (
                    <img
                      src={resolveImageUrl(images[activeImage])}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/20">
                      <ImageOff size={40} />
                    </div>
                  )}

                  {outOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                        ناموجود
                      </span>
                    </div>
                  )}

                  {images[activeImage] && (
                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(true)}
                      aria-label="نمایش تمام‌صفحه"
                      className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white"
                    >
                      <Maximize2 size={14} />
                    </button>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPrevImage}
                        aria-label="تصویر قبلی"
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={showNextImage}
                        aria-label="تصویر بعدی"
                        className="absolute left-3 bottom-1/2 flex h-9 w-9 translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="mt-3 flex gap-2">
                    {images.map((img, index) => (
                      <button
                        key={img + index}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition-colors ${
                          activeImage === index
                            ? "border-brand"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <img
                          src={resolveImageUrl(img)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* انتخاب رنگ - کادر جدا، پایین عکس‌های محصول (هر رنگ کد و موجودی مستقل خودش رو داره) */}
                {colorVariants.length > 0 && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="mb-3 text-xs font-bold text-white/70">رنگ</p>

                    {/* عکس بزرگ رنگ انتخاب‌شده */}
                    {selectedColor?.image && (
                      <div className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <img
                          src={resolveImageUrl(selectedColor.image)}
                          alt={selectedColor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    {/* دایره‌های انتخاب رنگ */}
                    <div className="flex flex-wrap gap-2">
                      {colorVariants.map((color) => {
                        const isSelected = selectedColor?._id === color._id;
                        return (
                          <button
                            key={color._id}
                            type="button"
                            onClick={() => setSelectedColorId(color._id)}
                            title={color.name}
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                              isSelected
                                ? "border-brand scale-110"
                                : "border-white/15 hover:border-white/35"
                            }`}
                          >
                            {color.image ? (
                              <img
                                src={resolveImageUrl(color.image)}
                                alt={color.name}
                                className="h-full w-full rounded-full object-cover"
                              />
                            ) : (
                              <span
                                className="h-full w-full rounded-full"
                                style={{ backgroundColor: color.hex || "#999" }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {selectedColor && (
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/50">
                        <span className="font-bold text-white">{selectedColor.name}</span>
                        <span>کد: {selectedColor.code}</span>
                        {selectedColor.stock > 0 ? (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-300">
                            موجود
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-500/10 px-2 py-0.5 font-semibold text-red-300">
                            ناموجود
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* محصولات مشابه/پیشنهادی (Cross-sell) از همون دسته‌بندی */}
            <RelatedProducts
              categoryId={product.category?._id}
              category={product.category}
              excludeId={product._id}
            />

            {/* نظرات کاربران روی این محصول */}
            <div className="border-t border-white/10 pt-8">
              <ProductCommentsSection productId={product._id} />
            </div>

            {/* نوار اعتماد - همون محتوایی که توی صفحه اصلی زیر هیرو هست */}
            <div className="-mx-4">
              <TrustBar />
            </div>

            {/* بازدیدهای اخیر کاربر (به‌جز خود همین محصول) */}
            <RecentlyViewedProducts
              excludeId={product._id}
              className="border-t border-white/10 pt-10"
            />
          </>
        )}
      </div>

      {/* نمای تمام‌صفحه‌ی تصویر */}
      {isLightboxOpen && images[activeImage] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="بستن"
            className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={18} />
          </button>
          <img
            src={resolveImageUrl(images[activeImage])}
            alt={product?.name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
}
