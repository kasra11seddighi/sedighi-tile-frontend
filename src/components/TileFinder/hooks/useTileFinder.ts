import { useEffect, useState } from "react";

import { getFinderSteps } from "../services/tileFinder.service";

import { filterProducts } from "../services/product.service";
import type { FilterProductsPayload } from "../services/product.service";

import type {
  TileFilters,
  Product,
  TileFinderStep,
} from "../types/tileFinder.types";

// نگاشت source های ثابت (قدیمی) به همون فیلدی که بک‌اند /tile-finder/filter
// انتظارش رو داره. مراحل "custom" این نگاشت رو ندارن و جدا مدیریت می‌شن.
const LEGACY_FILTER_KEY: Partial<
  Record<
    TileFinderStep["source"],
    "location" | "size" | "brand" | "style" | "color"
  >
> = {
  locations: "location",
  sizes: "size",
  brands: "brand",
  styles: "style",
  colors: "color",
};

export function useTileFinder() {
  const [steps, setSteps] = useState<TileFinderStep[] | null>(null);

  const [filters, setFilters] = useState<TileFilters>({});

  const [currentStep, setCurrentStep] = useState(0);

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // وضعیت جدا برای دریافت اولیه‌ی مراحل (از وضعیت جستجوی محصولات جداست):
  // قبلاً هر دو از یک state به اسم loading/error استفاده می‌کردن که باعث
  // می‌شد اگه /tile-finder/steps خطا بده، کاربر برای همیشه فقط پیام
  // «در حال بارگذاری...» رو ببینه (چون UI فقط steps/currentStepData رو
  // چک می‌کرد، نه error) و هیچ راهی برای تلاش دوباره نداشته باشه.
  const [stepsLoading, setStepsLoading] = useState(true);

  const [stepsError, setStepsError] = useState("");

  /*
 دریافت مراحل فایندر (کاملاً داینامیک - از پنل ادمین مدیریت می‌شه)
*/

  useEffect(() => {
    loadFinderSteps();
  }, []);

  async function loadFinderSteps() {
    try {
      setStepsLoading(true);

      setStepsError("");

      const data = await getFinderSteps();

      if (!data || data.length === 0) {
        setSteps(null);

        setStepsError("در حال حاضر مرحله‌ای برای کاشی‌یاب تعریف نشده است");

        return;
      }

      setSteps(data);
    } catch {
      setSteps(null);

      setStepsError("خطا در دریافت اطلاعات از سرور. لطفاً دوباره تلاش کنید");
    } finally {
      setStepsLoading(false);
    }
  }

  /*
 انتخاب گزینه
*/

  function selectOption(value: string) {
    if (!steps) return;
    const step = steps[currentStep];
    if (!step) return;

    setFilters((prev) => ({
      ...prev,
      [step.id]: value,
    }));
  }

  /*
 مرحله بعد
*/

  function nextStep() {
    if (steps && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  /*
 مرحله قبل
*/

  function previousStep() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  /*
 ارسال فیلتر به بک اند
*/

  async function searchProducts() {
    if (!steps) return;

    try {
      setLoading(true);

      setError("");

      const payload: FilterProductsPayload = { custom: [] };

      for (const step of steps) {
        const value = filters[step.id];
        if (!value) continue;

        const legacyKey = LEGACY_FILTER_KEY[step.source];
        if (legacyKey) {
          payload[legacyKey] = value;
        } else {
          payload.custom!.push({ step: step.id, option: value });
        }
      }

      if (!payload.custom!.length) delete payload.custom;

      const data = await filterProducts(payload);

      setProducts(data);
    } catch {
      setError("خطا در جستجوی محصولات");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFilters({});

    setCurrentStep(0);

    setProducts([]);
  }

  const currentStepData = steps?.[currentStep] ?? null;

  return {
    steps,

    currentStepData,

    filters,

    products,

    loading,

    error,

    stepsLoading,

    stepsError,

    retryLoadSteps: loadFinderSteps,

    currentStep,

    totalSteps: steps?.length ?? 0,

    selectOption,

    nextStep,

    previousStep,

    searchProducts,

    reset,
  };
}
