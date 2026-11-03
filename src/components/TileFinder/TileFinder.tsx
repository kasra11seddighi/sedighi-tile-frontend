import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import FinderHeader from "./components/FinderHeader";
import FinderProgress from "./components/FinderProgress";
import { useTileFinder } from "./hooks/useTileFinder";

import FilterStep from "./components/FilterStep";
import SizeSelector from "./components/SizeSelector";
import ResultGrid from "./components/ResultGrid";
import { useNavigate } from "react-router-dom";
import SizeGuide from "./components/SizeGuide";

export default function TileFinder() {
  const {
    steps,
    currentStepData,
    filters,
    products,
    loading,
    error,
    stepsLoading,
    stepsError,
    retryLoadSteps,
    currentStep,
    totalSteps,
    selectOption,
    nextStep,
    previousStep,
    searchProducts,
    reset,
  } = useTileFinder();

  const navigate = useNavigate();

  // در حال دریافت مراحل از بک‌اند
  if (stepsLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#F7F2EA] text-[#8C8174]">
        در حال بارگذاری...
      </div>
    );
  }

  // دریافت مراحل شکست خورده یا مرحله‌ای برنگشته - قبلاً این حالت هیچ‌وقت
  // به کاربر نشون داده نمی‌شد و فقط لودینگ برای همیشه می‌موند
  if (stepsError || !steps || !currentStepData) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#F7F2EA] px-4 text-center">
        <p className="text-sm text-[#96492A]">
          {stepsError || "خطا در بارگذاری کاشی‌یاب"}
        </p>
        <button
          onClick={retryLoadSteps}
          className="rounded-xl bg-[#AD5A34] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#96492A]"
        >
          تلاش دوباره
        </button>
      </div>
    );
  }

  // مراحل کاملاً داینامیک هستن (از پنل ادمین قابل افزودن/حذف/مرتب‌سازی).
  // فقط مرحله‌ی «سایز» ظاهر مخصوص خودش رو داره (SizeSelector + راهنمای
  // سایز کنار صفحه)؛ بقیه‌ی مراحل - چه ثابت (فضا/برند/سبک/رنگ) و چه
  // سفارشی (مثلاً «کف یا دیوار») - با همون FilterStep عمومی رندر می‌شن.
  const renderStep = () => {
    if (currentStepData.source === "sizes") {
      return (
        <SizeSelector
          sizes={currentStepData.options}
          selected={filters[currentStepData.id]}
          onSelect={selectOption}
        />
      );
    }

    return (
      <FilterStep
        title={currentStepData.title}
        options={currentStepData.options}
        selected={filters[currentStepData.id]}
        onSelect={selectOption}
      />
    );
  };
  return (
    <section
      dir="rtl"
      className="min-h-screen bg-[#F7F2EA] px-4 py-8 text-[#2A241D] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* معرفی */}
        <div className="mb-8 rounded-4xl border border-[#E7DECD] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(42,36,29,0.06)] md:px-10">
          <div className="mb-5 inline-flex rounded-full border border-[#E7DECD] bg-[#F1ECE2] px-4 py-1 text-xs font-medium text-[#8C8174]">
            Tile Finder
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight text-[#2A241D] md:text-5xl">
                کاشی مناسب فضای خودت را پیدا کن
              </h1>
              <p className="mt-4 text-sm leading-7 text-[#8C8174] md:text-base">
                با چند انتخاب ساده، بین گزینه‌های مختلف جستجو کن و بهترین محصول
                را بر اساس فضا، اندازه، برند و سبک پیدا کن.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7DECD] bg-[#FBF8F2] px-5 py-4 text-sm text-[#8C8174]">
              <span className="block text-xs">وضعیت</span>
              <span className="mt-1 block font-semibold text-[#2A241D]">
                مرحله {currentStep + 1} از {totalSteps}
              </span>
            </div>
          </div>
        </div>

        {/* بدنه اصلی */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* ویزارد */}
          <div className="rounded-4xl border border-[#E7DECD] bg-white p-6 shadow-[0_20px_60px_rgba(42,36,29,0.06)] md:p-10">
            <FinderHeader />

            <FinderProgress current={currentStep} total={totalSteps} />

            <div className="min-h-80">{renderStep()}</div>

            {/* ناوبری */}
            <div className="mt-10 flex items-center justify-between border-t border-[#E7DECD] pt-6">
              {/* دکمه قبلی */}
              <button
                onClick={previousStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 rounded-xl border border-[#E7DECD] bg-white px-5 py-3 text-sm font-medium text-[#8C8174] transition-all duration-200 hover:border-[#D8C7B2] hover:bg-[#FAF7F2] hover:text-[#2A241D] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={18} />
                قبلی
              </button>

              <div className="flex items-center gap-3">
                {/* مشاهده همه محصولات */}
                <button
                  onClick={() => navigate("/products")}
                  className="rounded-xl border border-[#E7DECD] bg-white px-5 py-3 text-sm font-semibold text-[#6F6255] transition-all duration-200 hover:border-[#AD5A34] hover:bg-[#FFF9F4] hover:text-[#AD5A34] active:scale-[0.98]"
                >
                  مشاهده همه محصولات
                </button>

                {/* مرحله بعد / نمایش محصولات */}
                {currentStep === totalSteps - 1 ? (
                  <button
                    onClick={searchProducts}
                    disabled={loading}
                    className="rounded-xl bg-[#AD5A34] px-7 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#96492A] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "در حال جستجو..." : "نمایش محصولات"}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-1 rounded-xl bg-[#AD5A34] px-7 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#96492A] hover:shadow-md active:scale-[0.98]"
                  >
                    مرحله بعد
                    <ChevronLeft size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* پنل کناری */}
          <div className="min-w-0 space-y-6">
            <div className="rounded-4xl border border-[#E7DECD] bg-white p-6 shadow-[0_20px_60px_rgba(42,36,29,0.06)]">
              <h3 className="text-lg font-bold text-[#2A241D]">
                راهنمای انتخاب
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8C8174]">
                در هر مرحله یکی از ویژگی‌های محصول را انتخاب کن؛ در پایان، بر
                اساس انتخاب‌های تو بهترین کاشی‌ها نمایش داده می‌شود.
              </p>
            </div>
            {currentStepData.source === "sizes" && (
              <SizeGuide
                sizes={currentStepData.options}
                selectedSize={filters[currentStepData.id]}
              />
            )}
            {error && (
              <div className="rounded-2xl border border-[#E0A98F] bg-[#FBEEE7] p-4 text-sm text-[#96492A]">
                {error}
              </div>
            )}
          </div>{" "}
        </div>

        {/* نتایج */}
        {products.length > 0 && (
          <div className="mt-10">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-[#2A241D] md:text-3xl">
                محصولات پیشنهادی
              </h2>

              <button
                onClick={reset}
                className="flex items-center gap-2 text-sm text-[#8C8174] transition-colors hover:text-[#2A241D]"
              >
                <RotateCcw size={16} />
                شروع دوباره
              </button>
            </div>

            <ResultGrid products={products} />
          </div>
        )}
      </div>
    </section>
  );
}
