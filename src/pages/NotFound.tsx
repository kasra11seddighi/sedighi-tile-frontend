import { Link, useNavigate } from "react-router-dom";
import { Home, Grid, Phone, RotateCcw } from "lucide-react";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  const navigate = useNavigate();

  useSeo({ title: "۴۰۴ - صفحه یافت نشد", noIndex: true });

  return (
    <div
      dir="rtl"
      className="relative flex min-h-[85vh] w-full items-center justify-center px-4 py-12 font-sans"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-[380px] w-[500px] -translate-x-1/2 rounded-full bg-[#c98d58]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-xl text-center">
        {/* Clean & Distinct 404 Header */}
        <div className="mb-2">
          <span className="bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl">
            ۴۰۴
          </span>
        </div>

        {/* Clear & Professional Text */}
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          صفحه مورد نظر پیدا نشد
        </h1>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-400 sm:text-sm">
          این آدرس وجود ندارد یا به بخش دیگری منتقل شده است.
        </p>

        {/* Action Bento Cards */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            to="/"
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all duration-200 hover:border-[#c98d58]/40 hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition-colors group-hover:bg-[#c98d58] group-hover:text-slate-950">
              <Home size={18} />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-[#dcb38a] transition-colors">
              صفحه اصلی
            </span>
          </Link>

          <Link
            to="/products"
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all duration-200 hover:border-[#c98d58]/40 hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition-colors group-hover:bg-[#c98d58] group-hover:text-slate-950">
              <Grid size={18} />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-[#dcb38a] transition-colors">
              محصولات
            </span>
          </Link>

          <Link
            to="/contact"
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all duration-200 hover:border-[#c98d58]/40 hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition-colors group-hover:bg-[#c98d58] group-hover:text-slate-950">
              <Phone size={18} />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-[#dcb38a] transition-colors">
              تماس با ما
            </span>
          </Link>
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 active:scale-95"
          >
            <RotateCcw size={14} className="text-slate-400" />
            <span>بازگشت به صفحه قبل</span>
          </button>
        </div>
      </div>
    </div>
  );
}
