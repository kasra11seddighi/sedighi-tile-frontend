import api, { apiRoot } from "../../../api/axios";
import type {
  Category,
  FilterOption,
  Product,
  ProductsQuery,
  ProductsResponse,
  SortOptionItem,
} from "../types/products.types";

export const getProductsRequest = async (
  query: ProductsQuery,
): Promise<ProductsResponse> => {
  const res = await api.get("/products", { params: query });
  // پاسخ بک‌اند مستقیم شامل products و pagination است (نه زیر data)
  return { products: res.data.products, pagination: res.data.pagination };
};

export const getCategoriesRequest = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data.data;
};

// این اندپوینت رو باید توی بک‌اند اضافه کنی و گزینه‌های sort (label/order/
// فعال بودن) رو از یه کالکشن/تنظیمات قابل ویرایش توی داشبورد برگردونه.
// TODO: مسیر واقعی رو با بک‌اند هماهنگ کن اگه چیزی غیر از این بود.
export const getSortOptionsRequest = async (): Promise<SortOptionItem[]> => {
  const res = await api.get("/products/sort-options");
  return res.data.data;
};

export const getProductByIdRequest = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  // بک‌اند پاسخ رو زیر فیلد data برمی‌گردونه (مثل بقیه‌ی اندپوینت‌ها)،
  // نه product؛ قبلاً اینجا res.data.product خونده می‌شد که همیشه undefined
  // برمی‌گردوند و صفحه‌ی جزئیات محصول رو خراب می‌کرد.
  return res.data.data;
};

// گزینه‌های فیلتر رنگ/سایز/استایل/مکان - از همون مسیرهای فایندر کاشی
// می‌آد (/tile-finder/...، بدون پیشوند /api - به همین خاطر از apiRoot
// استفاده می‌کنیم، نه api).
//
// توجه مهم: این مسیرها آرایه‌ای با فرمت { id, title, value, hex? } برمی‌گردونن
// (فرمتی که ویزارد فایندر کاشی نیاز داره)، نه { _id, name, slug } که
// FilterOption و ProductFiltersBar انتظارش رو دارن. قبلاً این تفاوت در نظر
// گرفته نشده بود و همین باعث می‌شد گزینه‌های سایز/مکان/استایل/رنگ توی
// فیلتر صفحه‌ی محصولات بدون متن و بدون مقدار (خالی) رندر بشن. اینجا
// map‌ش می‌کنیم به فرمت درست. آیتم اول هر لیست («همه‌ی...» با value خالی)
// هم حذف می‌شه چون خودِ کامپوننت یک گزینه‌ی «همه» جدا و هاردکد داره.
interface RawFinderOption {
  id: string;
  title: string;
  value: string;
  hex?: string;
}

function mapFinderOptions(raw: RawFinderOption[]): FilterOption[] {
  return raw
    .filter((item) => item.value)
    .map((item) => ({
      _id: item.value,
      name: item.title,
      slug: item.value,
      hex: item.hex ?? null,
    }));
}

export const getSizesRequest = async (): Promise<FilterOption[]> => {
  const res = await apiRoot.get("/tile-finder/sizes");
  return mapFinderOptions(res.data);
};

export const getStylesRequest = async (): Promise<FilterOption[]> => {
  const res = await apiRoot.get("/tile-finder/styles");
  return mapFinderOptions(res.data);
};

export const getColorsRequest = async (): Promise<FilterOption[]> => {
  const res = await apiRoot.get("/tile-finder/colors");
  return mapFinderOptions(res.data);
};

export const getLocationsRequest = async (): Promise<FilterOption[]> => {
  const res = await apiRoot.get("/tile-finder/locations");
  return mapFinderOptions(res.data);
};
