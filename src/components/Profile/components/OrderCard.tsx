import { useState } from "react";
import { Package, MapPin, Wallet, Landmark, X, AlertCircle } from "lucide-react";
import {
  cancelMyOrderRequest,
  type ApiOrder,
  type ApiOrderItem,
} from "../../../services/orders.service";

interface Props {
  order: ApiOrder;
  onCancelled?: (updated: ApiOrder) => void;
}

const STATUS_META: Record<
  ApiOrder["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "در انتظار بررسی",
    className: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  processing: {
    label: "در حال آماده‌سازی",
    className: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  },
  shipped: {
    label: "ارسال شده",
    className: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  },
  delivered: {
    label: "تحویل داده شده",
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
  cancelled: {
    label: "لغو شده",
    className: "border-red-400/30 bg-red-400/10 text-red-300",
  },
};

// همون منطق لیبل واحد که توی صفحه‌ی سبد خرید استفاده شده؛ چون برای آیتم‌های
// متری/کارتنی، quantity ذخیره‌شده روی سفارش تعداد کارتن/متر واقعیه نه «عدد»
function itemUnitLabel(item: ApiOrderItem) {
  if (item.saleUnit === "carton") return `${item.cartons} کارتن`;
  if (item.saleUnit === "m2") return `${item.requestedM2} مترمربع`;
  return `${item.quantity} عدد`;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function OrderCard({ order, onCancelled }: Props) {
  const status = STATUS_META[order.status];

  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  // فقط تا وقتی سفارش هنوز بررسی نشده، خود کاربر می‌تونه لغوش کنه
  const canCancel = order.status === "pending";

  async function handleCancel() {
    setCancelError("");
    setIsCancelling(true);
    try {
      const updated = await cancelMyOrderRequest(order._id);
      onCancelled?.(updated);
      setIsConfirmingCancel(false);
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "لغو سفارش با خطا مواجه شد.";
      setCancelError(message);
    } finally {
      setIsCancelling(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <div className="flex flex-col items-start justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Package size={16} />
          </div>
          <div>
            <p className="text-xs font-medium text-white/50">
              سفارش #{order._id.slice(-6)}
            </p>
            <p className="mt-0.5 text-xs text-white/35">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/50">
            {order.paymentMethod === "online" ? (
              <Landmark size={11} />
            ) : (
              <Wallet size={11} />
            )}
            {order.paymentMethod === "online"
              ? order.paymentStatus === "paid"
                ? "پرداخت آنلاین شده"
                : "پرداخت آنلاین (ناتمام)"
              : "پرداخت در محل"}
          </span>

          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${status.className}`}
          >
            {status.label}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {order.items.map((item, index) => (
          <div
            key={`${item.product}-${index}`}
            className="flex items-center justify-between text-sm"
          >
            <span className="line-clamp-1 text-white/70">
              {item.name}
              <span className="mr-2 text-xs text-white/35">
                × {itemUnitLabel(item)}
              </span>
            </span>
            <span className="shrink-0 text-white/50">
              {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-1.5 border-t border-white/10 pt-4 text-xs text-white/40">
        <MapPin size={13} className="mt-0.5 shrink-0" />
        <span className="line-clamp-1">
          {order.shippingAddress.city}، {order.shippingAddress.address}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-white/50">جمع کل</span>
        <span className="text-base font-black text-white">
          {order.totalAmount.toLocaleString("fa-IR")} تومان
        </span>
      </div>

      {canCancel && (
        <div className="mt-4 border-t border-white/10 pt-4">
          {!isConfirmingCancel ? (
            <button
              type="button"
              onClick={() => setIsConfirmingCancel(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-400/80 transition hover:text-red-400"
            >
              <X size={13} />
              لغو سفارش
            </button>
          ) : (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3">
              <p className="text-xs text-red-200">
                مطمئنی می‌خوای این سفارش رو لغو کنی؟ این عملیات قابل بازگشت نیست.
              </p>

              {cancelError && (
                <p className="mt-2 flex items-start gap-1.5 text-[11px] text-red-300">
                  <AlertCircle size={12} className="mt-0.5 shrink-0" />
                  {cancelError}
                </p>
              )}

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className="rounded-lg bg-red-500/90 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCancelling ? "در حال لغو..." : "بله، لغو کن"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsConfirmingCancel(false);
                    setCancelError("");
                  }}
                  disabled={isCancelling}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition hover:bg-white/5"
                >
                  منصرف شدم
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
