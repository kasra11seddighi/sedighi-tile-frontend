import { Link, Navigate } from "react-router-dom";
import {
  ShoppingCart,
  ImageOff,
  Minus,
  Plus,
  X,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useSiteConfig } from "../context/SiteConfigContext";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import type { ApiCartItem } from "../services/cart.service";
import { useSeo } from "../hooks/useSeo";

function lineLabel(item: ApiCartItem) {
  if (item.saleUnit === "carton") return `${item.cartons} کارتن`;
  if (item.saleUnit === "m2") return `${item.requestedM2} مترمربع`;
  return `${item.quantity} عدد`;
}

function linePrice(item: ApiCartItem) {
  if (item.totalPrice != null) return item.totalPrice;

  const unit =
    item.product.discountPrice && item.product.discountPrice > 0
      ? item.product.discountPrice
      : item.product.price;

  return unit * item.quantity;
}

export default function Cart() {
  const { cartEnabled, loading: siteConfigLoading } = useSiteConfig();
  const { items, isLoading, totalPrice, updateItem, removeFromCart } =
    useCart();

  // شخصی/غیرقابل‌اشتراک‌گذاریه، نباید ایندکس بشه
  useSeo({ title: "سبد خرید", noIndex: true });

  // سبد خرید فعلاً از تنظیمات ادمین خاموشه (مثل شیرآلات)؛ کاربر رو به
  // خونه برمی‌گردونیم تا مسیر یتیم نمونه
  if (!siteConfigLoading && !cartEnabled) {
    return <Navigate to="/" replace />;
  }

  function increase(item: ApiCartItem) {
    if (item.saleUnit === "carton") {
      updateItem(item.product._id, {
        saleUnit: "carton",
        cartons: (item.cartons ?? 1) + 1,
      });
    } else if (item.saleUnit === "m2") {
      updateItem(item.product._id, {
        saleUnit: "m2",
        requestedM2: (item.requestedM2 ?? 1) + 1,
      });
    } else {
      updateItem(item.product._id, { quantity: item.quantity + 1 });
    }
  }

  function decrease(item: ApiCartItem) {
    if (item.saleUnit === "carton") {
      const next = (item.cartons ?? 1) - 1;
      if (next <= 0) return removeFromCart(item.product._id);
      updateItem(item.product._id, { saleUnit: "carton", cartons: next });
    } else if (item.saleUnit === "m2") {
      const next = (item.requestedM2 ?? 1) - 1;
      if (next <= 0) return removeFromCart(item.product._id);
      updateItem(item.product._id, { saleUnit: "m2", requestedM2: next });
    } else {
      const next = item.quantity - 1;
      if (next <= 0) return removeFromCart(item.product._id);
      updateItem(item.product._id, { quantity: next });
    }
  }

  return (
    <div dir="rtl">
      <section className="relative overflow-hidden pb-10 pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <ShoppingCart size={13} />
            سبد خرید
          </div>

          <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            سبد خرید شما
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4">
          {isLoading ? (
            <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center text-sm text-white/50">
              در حال بارگذاری سبد خرید...
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/3 px-6 py-16 text-center">
              <ShoppingCart size={32} className="text-white/20" />
              <p className="text-sm text-white/50">سبد خریدت خالیه</p>
              <Link
                to="/products"
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-3 text-sm font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98]"
              >
                مشاهده‌ی محصولات
                <ArrowLeft size={15} />
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/3 p-3 sm:p-4">
                {items.map((item) => (
                  <div
                    key={item.product._id + (item.saleUnit ?? "")}
                    className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/5">
                      {item.product.images?.[0] ? (
                        <img
                          src={resolveImageUrl(item.product.images[0])}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageOff size={22} className="text-white/20" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-bold text-white">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-xs text-white/45">
                        {linePrice(item).toLocaleString("fa-IR")} تومان
                      </p>

                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decrease(item)}
                          aria-label="کم کردن"
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white/70 transition hover:bg-white/20"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="min-w-14 text-center text-xs font-bold text-white">
                          {lineLabel(item)}
                        </span>

                        <button
                          type="button"
                          onClick={() => increase(item)}
                          aria-label="زیاد کردن"
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white/70 transition hover:bg-white/20"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product._id)}
                      aria-label="حذف از سبد"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/30 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">جمع کل</span>
                  <span className="text-lg font-black text-white">
                    {totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-3.5 text-sm font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98]"
                >
                  ادامه‌ی فرآیند خرید
                  <ArrowLeft size={15} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
