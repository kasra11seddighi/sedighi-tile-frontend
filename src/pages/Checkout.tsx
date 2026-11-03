import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  CreditCard,
  CheckCircle2,
  User,
  Phone,
  PhoneCall,
  MapPin,
  Building2,
  Mailbox,
  ArrowLeft,
  ArrowRight,
  Wallet,
  Landmark,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useSiteConfig } from "../context/SiteConfigContext";
import { useAddresses } from "../components/Profile/hooks/useAddresses";
import type { Address } from "../components/Profile/types/profile.types";
import {
  createOrderRequest,
  payOrderRequest,
  type PaymentMethod,
} from "../services/orders.service";
import { IRAN_CITIES } from "../data/iranCities";
import { useSeo } from "../hooks/useSeo";

type Step = "address" | "payment" | "done";

function extractErrorMessage(err: unknown, fallback: string) {
  return (
    (err as { response?: { data?: { message?: string } } })?.response?.data
      ?.message || fallback
  );
}

export default function Checkout() {
  const { user, isAuthenticated } = useAuth();
  const { items, totalPrice, isLoading, clearCart } = useCart();
  const { cartEnabled, loading: siteConfigLoading } = useSiteConfig();
  const { addresses: savedAddresses } = useAddresses();

  const [step, setStep] = useState<Step>("address");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  // فرم آدرس
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [landlinePhone, setLandlinePhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressError, setAddressError] = useState("");

  function applyAddress(saved: Address) {
    setSelectedAddressId(saved._id);
    setName(saved.fullName);
    setPhone(saved.phone);
    setLandlinePhone(saved.landlinePhone ?? "");
    setAddress(saved.address);
    setCity(saved.city);
    setPostalCode(saved.postalCode);
  }

  // اولین بار که آدرس‌های ذخیره‌شده لود می‌شن، اگه فرم هنوز خالیه (کاربر
  // چیزی تایپ نکرده) و یه آدرس پیش‌فرض داره، خودکار پرش می‌کنیم تا هر بار
  // مجبور نباشه از نو بنویسه.
  useEffect(() => {
    if (address.trim() || savedAddresses.length === 0) return;
    const defaultAddress = savedAddresses.find((a) => a.isDefault) ?? savedAddresses[0];
    applyAddress(defaultAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAddresses]);

  // مرحله‌ی پرداخت
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // مرحله‌ی خرید شخصیه، نباید ایندکس بشه
  useSeo({ title: "تسویه‌حساب", noIndex: true });

  // بدون ورود، دسترسی به تسویه‌حساب معنایی نداره
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // سبد خرید فعلاً از تنظیمات ادمین خاموشه (مثل شیرآلات)
  if (!siteConfigLoading && !cartEnabled) {
    return <Navigate to="/" replace />;
  }

  function handleAddressSubmit() {
    if (!name.trim() || !phone.trim() || !address.trim() || !city || !postalCode.trim()) {
      setAddressError("همه‌ی فیلدهای الزامی رو تکمیل کن");
      return;
    }
    setAddressError("");
    setStep("payment");
  }

  async function handlePaymentSubmit() {
    setPaymentError("");
    setIsSubmitting(true);
    try {
      const order = await createOrderRequest(
        {
          fullName: name,
          phone,
          landlinePhone: landlinePhone.trim() || undefined,
          address,
          city,
          postalCode,
        },
        paymentMethod,
      );

      if (paymentMethod === "online") {
        // شروع پرداخت آنلاین و ریدایرکت به درگاه؛ فعلاً درگاه سمت بک‌اند
        // غیرفعاله (merchant id تنظیم نشده) پس این درخواست با خطای روشن
        // fail می‌شه — کاربر می‌تونه به‌جاش «پرداخت در محل» رو انتخاب کنه.
        const { paymentUrl } = await payOrderRequest(order._id);
        window.location.href = paymentUrl;
        return;
      }

      // پرداخت در محل: سفارش سمت سرور ثبت و سبد خودش خالی شده؛
      // فقط وضعیت لوکال سبد رو هم‌سو می‌کنیم
      await clearCart();
      setStep("done");
    } catch (err) {
      setPaymentError(
        extractErrorMessage(err, "ثبت سفارش با خطا مواجه شد. دوباره تلاش کن."),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div dir="rtl">
      <section className="relative overflow-hidden pb-10 pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
            <CreditCard size={13} />
            تسویه‌حساب
          </div>

          <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            نهایی‌کردن سفارش
          </h1>

          {step !== "done" && (
            <div className="mt-6 flex items-center justify-center gap-3 text-xs font-medium text-white/40">
              <span className={step === "address" ? "text-brand-light" : ""}>
                ۱. اطلاعات ارسال
              </span>
              <span className="h-px w-8 bg-white/15" />
              <span className={step === "payment" ? "text-brand-light" : ""}>
                ۲. پرداخت
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4">
          {step === "done" ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-16 text-center">
              <CheckCircle2 size={36} className="text-emerald-400" />
              <h2 className="text-lg font-bold text-white">
                سفارشت با موفقیت ثبت شد
              </h2>
              <p className="max-w-sm text-sm leading-7 text-white/60">
                همکاران ما به‌زودی برای هماهنگی ارسال باهات تماس می‌گیرن.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white/80 transition-all hover:border-white/30"
                >
                  مشاهده‌ی سفارش
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-3 text-sm font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98]"
                >
                  ادامه‌ی خرید
                  <ArrowLeft size={15} />
                </Link>
              </div>
            </div>
          ) : isLoading ? (
            <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center text-sm text-white/50">
              در حال بارگذاری سبد خرید...
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/3 px-6 py-16 text-center">
              <p className="text-sm text-white/50">
                سبد خریدت خالیه، اول چیزی به سبد اضافه کن.
              </p>
              <Link
                to="/products"
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-3 text-sm font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98]"
              >
                مشاهده‌ی محصولات
                <ArrowLeft size={15} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                {step === "address" ? (
                  <>
                    <h2 className="text-lg font-bold text-white">اطلاعات ارسال</h2>
                    <p className="mt-1 text-sm text-white/50">
                      این اطلاعات برای هماهنگی و ارسال سفارش استفاده می‌شه.
                    </p>

                    {savedAddresses.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {savedAddresses.map((saved) => (
                          <button
                            key={saved._id}
                            type="button"
                            onClick={() => applyAddress(saved)}
                            className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors ${
                              selectedAddressId === saved._id
                                ? "border-brand/60 bg-brand/10 text-brand-light"
                                : "border-white/10 bg-white/5 text-white/60 hover:border-white/25"
                            }`}
                          >
                            {saved.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddressSubmit();
                      }}
                      className="mt-6 space-y-4"
                    >
                      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-brand/50">
                        <User size={16} className="text-white/40" />
                        <input
                          type="text"
                          required
                          placeholder="نام و نام خانوادگی"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent text-right text-sm text-white placeholder:text-white/30 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-brand/50">
                          <Phone size={16} className="text-white/40" />
                          <input
                            type="tel"
                            inputMode="numeric"
                            required
                            dir="ltr"
                            placeholder="09123456789"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-transparent text-right text-sm text-white placeholder:text-white/30 outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-brand/50">
                          <PhoneCall size={16} className="text-white/40" />
                          <input
                            type="tel"
                            inputMode="numeric"
                            dir="ltr"
                            placeholder="شماره ثابت (اختیاری)"
                            value={landlinePhone}
                            onChange={(e) => setLandlinePhone(e.target.value)}
                            className="w-full bg-transparent text-right text-sm text-white placeholder:text-white/30 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-brand/50">
                        <MapPin size={16} className="mt-1 shrink-0 text-white/40" />
                        <textarea
                          required
                          rows={3}
                          placeholder="آدرس کامل تحویل"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full resize-none bg-transparent text-right text-sm text-white placeholder:text-white/30 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-brand/50">
                          <Building2 size={16} className="shrink-0 text-white/40" />
                          <select
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full appearance-none bg-transparent text-right text-sm text-white outline-none [color-scheme:dark]"
                          >
                            <option value="" disabled className="bg-[#0d1b2e]">
                              انتخاب شهر
                            </option>
                            {IRAN_CITIES.map((c) => (
                              <option key={c} value={c} className="bg-[#0d1b2e]">
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-brand/50">
                          <Mailbox size={16} className="text-white/40" />
                          <input
                            type="text"
                            inputMode="numeric"
                            required
                            dir="ltr"
                            placeholder="کد پستی"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full bg-transparent text-right text-sm text-white placeholder:text-white/30 outline-none"
                          />
                        </div>
                      </div>

                      {addressError && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                          {addressError}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-3.5 text-sm font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98]"
                      >
                        ادامه به پرداخت
                        <ArrowLeft size={15} />
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setStep("address")}
                      className="mb-4 flex items-center gap-1.5 text-xs font-medium text-white/45 transition hover:text-white/70"
                    >
                      <ArrowRight size={13} />
                      ویرایش اطلاعات ارسال
                    </button>

                    <h2 className="text-lg font-bold text-white">روش پرداخت</h2>
                    <p className="mt-1 text-sm text-white/50">
                      یکی از روش‌های پرداخت رو انتخاب کن.
                    </p>

                    <div className="mt-6 space-y-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-right transition-all ${
                          paymentMethod === "cod"
                            ? "border-brand/60 bg-brand/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                          <Wallet size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-white">
                            پرداخت در محل (نقدی)
                          </p>
                          <p className="mt-0.5 text-xs text-white/45">
                            هزینه رو موقع تحویل سفارش پرداخت می‌کنی
                          </p>
                        </div>
                        <div
                          className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                            paymentMethod === "cod"
                              ? "border-brand bg-brand"
                              : "border-white/20"
                          }`}
                        />
                      </button>

                      <div
                        title="درگاه پرداخت آنلاین به‌زودی فعال می‌شود"
                        className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 text-right opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/50">
                          <Landmark size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-white/70">
                            پرداخت آنلاین (زرین‌پال)
                          </p>
                          <p className="mt-0.5 text-xs text-white/40">
                            پرداخت امن آنلاین با کارت بانکی
                          </p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold text-white/50">
                          <Clock size={11} />
                          به‌زودی
                        </span>
                      </div>
                    </div>

                    {paymentError && (
                      <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {paymentError}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handlePaymentSubmit}
                      disabled={isSubmitting}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-3.5 text-sm font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "در حال ثبت سفارش..." : "ثبت نهایی سفارش"}
                    </button>
                  </>
                )}
              </div>

              {/* خلاصه سفارش */}
              <div className="h-fit rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white">خلاصه سفارش</h2>

                <div className="mt-5 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product._id + (item.saleUnit ?? "")}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="line-clamp-1 text-white/70">
                        {item.product.name}
                        <span className="mr-2 text-xs text-white/35">
                          {item.saleUnit === "carton"
                            ? `× ${item.cartons} کارتن`
                            : item.saleUnit === "m2"
                              ? `× ${item.requestedM2} مترمربع`
                              : `× ${item.quantity}`}
                        </span>
                      </span>
                      <span className="shrink-0 text-white/50">
                        {(item.totalPrice ??
                          (item.product.discountPrice &&
                          item.product.discountPrice > 0
                            ? item.product.discountPrice
                            : item.product.price) * item.quantity
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 text-sm">
                  <span className="text-white/50">جمع کل</span>
                  <span className="text-lg font-black text-white">
                    {totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
