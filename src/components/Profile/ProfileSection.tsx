import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  User,
  Phone,
  LogOut,
  Heart,
  HeartOff,
  LogIn,
  Package,
  PackageOpen,
  MapPin,
  Settings,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { useFavoriteProducts } from "./hooks/useFavoriteProducts";
import { useMyOrders } from "./hooks/useMyOrders";
import FavoriteProductCard from "./components/FavoriteProductCard";
import OrderCard from "./components/OrderCard";
import AddressBook from "./components/AddressBook";
import EditProfileForm from "./components/EditProfileForm";

type Tab = "orders" | "favorites" | "addresses" | "settings";

export default function ProfileSection() {
  const { user, isAuthenticated, isLoading: isAuthLoading, logout } = useAuth();
  const { cartEnabled } = useSiteConfig();
  const { favorites, isLoading, error, removeFavorite } =
    useFavoriteProducts(isAuthenticated);
  const {
    orders,
    isLoading: isOrdersLoading,
    error: ordersError,
    updateOrderInPlace,
  } = useMyOrders(isAuthenticated && cartEnabled);
  const [searchParams] = useSearchParams();
  // اگه از جای دیگه‌ای (مثلاً آیکون علاقه‌مندی‌های هدر) با ?tab=favorites
  // اومده باشه، همون تب باز می‌شه؛ وگرنه رفتار پیش‌فرض قبلی حفظ می‌شه.
  const requestedTab = searchParams.get("tab");
  const initialTab: Tab =
    requestedTab === "favorites" ||
    requestedTab === "orders" ||
    requestedTab === "addresses" ||
    requestedTab === "settings"
      ? requestedTab
      : cartEnabled
        ? "orders"
        : "favorites";
  const [tab, setTab] = useState<Tab>(initialTab);

  // تا بازیابی سشن تموم نشده چیزی نشون نده تا لحظه‌ای ریدایرکت اشتباه به لاگین رخ نده
  if (isAuthLoading) return null;

  if (!isAuthenticated) {
    return (
      <div
        dir="rtl"
        className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 pb-24 pt-32 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Heart size={24} />
        </div>

        <h2 className="text-base font-bold text-white">
          برای مشاهده‌ی علاقه‌مندی‌ها ابتدا وارد حساب کاربری خود شوید
        </h2>

        <p className="max-w-sm text-sm text-white/45">
          محصولاتی که لایک می‌کنی اینجا نشون داده می‌شن. برای دیدنشون کافیه وارد حسابت بشی.
        </p>

        <Link
          to="/login"
          className="mt-2 flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-xs font-bold text-white transition hover:brightness-110"
        >
          <LogIn size={14} />
          ورود به حساب کاربری
        </Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto max-w-6xl px-4 pb-24 pt-32">
      {/* اطلاعات کاربر */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
            <User size={24} />
          </div>

          <div>
            <p className="text-base font-bold text-white">
              {user?.name || "کاربر"}
            </p>

            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
              <Phone size={13} />
              {user?.phone}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-white/60 transition hover:border-red-400/40 hover:text-red-400"
        >
          <LogOut size={14} />
          خروج از حساب
        </button>
      </div>

      {/* تب‌ها */}
      <div className="mb-5 flex items-center gap-2 border-b border-white/10">
        {cartEnabled && (
          <button
            type="button"
            onClick={() => setTab("orders")}
            className={`flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-bold transition ${
              tab === "orders"
                ? "border-brand text-white"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            <Package size={16} />
            سفارش‌های من
          </button>
        )}

        <button
          type="button"
          onClick={() => setTab("favorites")}
          className={`flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-bold transition ${
            tab === "favorites"
              ? "border-brand text-white"
              : "border-transparent text-white/40 hover:text-white/70"
          }`}
        >
          <Heart size={16} />
          محصولات مورد علاقه‌ی من
        </button>

        <button
          type="button"
          onClick={() => setTab("addresses")}
          className={`flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-bold transition ${
            tab === "addresses"
              ? "border-brand text-white"
              : "border-transparent text-white/40 hover:text-white/70"
          }`}
        >
          <MapPin size={16} />
          آدرس‌های من
        </button>

        <button
          type="button"
          onClick={() => setTab("settings")}
          className={`flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-bold transition ${
            tab === "settings"
              ? "border-brand text-white"
              : "border-transparent text-white/40 hover:text-white/70"
          }`}
        >
          <Settings size={16} />
          ویرایش پروفایل
        </button>
      </div>

      {tab === "orders" && (
        <>
          {isOrdersLoading && (
            <p className="py-10 text-center text-sm text-white/40">
              در حال بارگذاری...
            </p>
          )}

          {!isOrdersLoading && ordersError && (
            <p className="py-10 text-center text-sm text-red-400/80">
              {ordersError}
            </p>
          )}

          {!isOrdersLoading && !ordersError && orders.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-16 text-white/35">
              <PackageOpen size={28} />
              <p className="text-sm">هنوز سفارشی ثبت نکردی.</p>
              <Link
                to="/products"
                className="mt-1 text-xs font-semibold text-brand hover:underline"
              >
                مشاهده‌ی محصولات
              </Link>
            </div>
          )}

          {!isOrdersLoading && !ordersError && orders.length > 0 && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onCancelled={updateOrderInPlace}
                />
              ))}
            </div>
          )}
        </>
      )}

      {tab === "favorites" && (
        <>
          {isLoading && (
            <p className="py-10 text-center text-sm text-white/40">
              در حال بارگذاری...
            </p>
          )}

          {!isLoading && error && (
            <p className="py-10 text-center text-sm text-red-400/80">{error}</p>
          )}

          {!isLoading && !error && favorites.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-16 text-white/35">
              <HeartOff size={28} />
              <p className="text-sm">هنوز محصولی رو لایک نکردی.</p>
            </div>
          )}

          {!isLoading && !error && favorites.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {favorites.map((item) => (
                <FavoriteProductCard
                  key={item._id}
                  product={item.product}
                  onRemove={removeFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}

      {tab === "addresses" && <AddressBook />}

      {tab === "settings" && <EditProfileForm />}
    </div>
  );
}
