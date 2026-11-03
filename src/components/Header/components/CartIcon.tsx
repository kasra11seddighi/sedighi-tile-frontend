import { Link } from "react-router-dom";
import { ShoppingCart, ImageOff, Minus, Plus, X } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";

function CartIcon() {
  const { items, totalCount, totalPrice, updateItem, removeFromCart } =
    useCart();

  function increase(item: (typeof items)[number]) {
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
      updateItem(item.product._id, {
        quantity: item.quantity + 1,
      });
    }
  }

  function decrease(item: (typeof items)[number]) {
    if (item.saleUnit === "carton") {
      const next = (item.cartons ?? 1) - 1;

      if (next <= 0) {
        return removeFromCart(item.product._id);
      }

      updateItem(item.product._id, {
        saleUnit: "carton",
        cartons: next,
      });
    } else if (item.saleUnit === "m2") {
      const next = (item.requestedM2 ?? 1) - 1;

      if (next <= 0) {
        return removeFromCart(item.product._id);
      }

      updateItem(item.product._id, {
        saleUnit: "m2",
        requestedM2: next,
      });
    } else {
      const next = item.quantity - 1;

      if (next <= 0) {
        return removeFromCart(item.product._id);
      }

      updateItem(item.product._id, {
        quantity: next,
      });
    }
  }

  function lineLabel(item: (typeof items)[number]) {
    if (item.saleUnit === "carton") {
      return `${item.cartons} کارتن`;
    }

    if (item.saleUnit === "m2") {
      return `${item.requestedM2} مترمربع`;
    }

    return `${item.quantity} عدد`;
  }

  function linePrice(item: (typeof items)[number]) {
    if (item.totalPrice != null) {
      return item.totalPrice;
    }

    const unit =
      item.product.discountPrice && item.product.discountPrice > 0
        ? item.product.discountPrice
        : item.product.price;

    return unit * item.quantity;
  }

  return (
    <div className="group relative">
      {/* Cart Button */}
      <Link
        to="/cart"
        aria-label={`سبد خرید، ${totalCount} محصول`}
        className="
          relative
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-r
          from-[#B56A3B]
          to-[#D08B59]
          text-white
          shadow-lg
          shadow-[#B56A3B]/30
          transition-all
          duration-300
          group-hover:scale-[1.02]
          group-hover:shadow-xl
          group-hover:shadow-[#B56A3B]/40
          sm:h-12
          sm:w-auto
          sm:gap-3
          sm:px-4
          md:px-6
        "
      >
        <ShoppingCart
          size={20}
          strokeWidth={2}
          className="text-white sm:h-[22px] sm:w-[22px]"
        />

        <span className="hidden text-sm font-medium sm:inline">سبد خرید</span>

        {/* Count */}
        <span
          className="
            absolute
            -right-1.5
            -top-1.5
            flex
            h-5
            min-w-5
            items-center
            justify-center
            rounded-full
            bg-white
            px-1
            text-[10px]
            font-bold
            text-[#B56A3B]
            shadow-md
            sm:-right-2
            sm:-top-2
            sm:h-6
            sm:min-w-6
            sm:text-xs
          "
        >
          {totalCount}
        </span>
      </Link>

      {/* Hover Card */}
      <div
        dir="rtl"
        className="
          invisible
          absolute
          right-0
          top-full
          z-50
          w-[min(20rem,calc(100vw-1rem))]
          origin-top-right
          scale-95
          pt-2
          opacity-0
          transition-all
          duration-200
          group-hover:visible
          group-hover:scale-100
          group-hover:opacity-100
        "
      >
        <div
          className="
            max-h-[420px]
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#0d1a2c]
            shadow-2xl
            shadow-black/50
          "
        >
          {/* Empty Cart */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-5 py-8 text-center">
              <ShoppingCart size={26} className="text-white/20" />

              <p className="text-xs text-white/50">سبد خریدت خالیه</p>
            </div>
          ) : (
            <>
              {/* Products */}
              <div className="max-h-[300px] space-y-1 overflow-y-auto p-2">
                {items.map((item) => (
                  <div
                    key={item.product._id + (item.saleUnit ?? "")}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      p-2
                      transition-colors
                      hover:bg-white/5
                    "
                  >
                    {/* Product Image */}
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-lg
                        bg-white/5
                      "
                    >
                      {item.product.images?.[0] ? (
                        <img
                          src={resolveImageUrl(item.product.images[0])}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageOff size={18} className="text-white/20" />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-xs font-bold text-white">
                        {item.product.name}
                      </p>

                      <p className="mt-0.5 text-[11px] text-white/45">
                        {linePrice(item).toLocaleString("fa-IR")} تومان
                      </p>

                      {/* Quantity Controls */}
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => decrease(item)}
                          aria-label="کم کردن"
                          className="
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-md
                            bg-white/10
                            text-white/70
                            transition
                            hover:bg-white/20
                          "
                        >
                          <Minus size={11} />
                        </button>

                        <span
                          className="
                            min-w-10
                            text-center
                            text-[11px]
                            font-bold
                            text-white
                          "
                        >
                          {lineLabel(item)}
                        </span>

                        <button
                          type="button"
                          onClick={() => increase(item)}
                          aria-label="زیاد کردن"
                          className="
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-md
                            bg-white/10
                            text-white/70
                            transition
                            hover:bg-white/20
                          "
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product._id)}
                      aria-label="حذف از سبد"
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-white/30
                        transition
                        hover:bg-red-500/10
                        hover:text-red-400
                      "
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-3">
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="text-white/50">جمع کل</span>

                  <span className="font-bold text-white">
                    {totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-l
                    from-brand-gradient-from
                    via-brand-gradient-via
                    to-brand-gradient-to
                    py-2.5
                    text-xs
                    font-bold
                    text-[#07111f]
                    transition-all
                    hover:brightness-105
                    active:scale-[0.98]
                  "
                >
                  ادامه‌ی فرآیند خرید
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartIcon;
