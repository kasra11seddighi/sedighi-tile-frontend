import { apiRoot } from "../../../api/axios";

// شکلی که بک‌اند /tile-finder/filter انتظارش رو داره: فیلترهای مراحل ثابت
// (location/size/brand/style/color) به‌صورت مستقیم، و فیلترهای مراحل
// سفارشی به‌صورت آرایه‌ای از {step, option}.
export interface FilterProductsPayload {
  location?: string;
  size?: string;
  brand?: string;
  style?: string;
  color?: string;
  custom?: { step: string; option: string }[];
}

export const filterProducts = async (filters: FilterProductsPayload) => {
  const res = await apiRoot.post("/tile-finder/filter", filters);

  return res.data;
};
