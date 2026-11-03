export interface Category {
  _id: string;
  name: string;
  slug: string;
  // آیا قیمت این دسته‌بندی رو نشون بدیم یا به‌جاش «تماس بگیرید» نشون بدیم
  showPrice?: boolean;
}

export interface Brand {
  _id: string;
  name: string;
  logo?: string;
}

export interface ProductColorVariant {
  _id: string;
  name: string;
  hex?: string;
  image?: string;
  code: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  category?: Category;
  brand?: Brand | null;
  isActive: boolean;
  createdAt: string;

  // رنگ‌های مستقل این محصول (هر کدوم کد/موجودی خودش رو داره)
  colorVariants?: ProductColorVariant[];

  // --- فروش متری/کارتنی (فقط محصولات کاشی/سرامیک این‌ها رو دارن) ---
  pricePerM2?: number;
  pricePerCarton?: number;
  piecesPerCarton?: number;
  m2PerCarton?: number;
  tileWidth?: number;
  tileHeight?: number;
  saleUnit?: "m2" | "carton" | "both";

  // --- مشخصات فنی نمایشی (جدول «مشخصات فنی» توی صفحه‌ی محصول) ---
  glazeType?: string; // نوع لعاب
  bodyMaterial?: string; // جنس بدنه
  wearResistance?: string; // مقاومت در برابر سایش
  suitableFor?: string[]; // مناسب برای
  colorDescription?: string; // رنگ (توضیح متنی)
  sku?: string; // کد محصول
  thickness?: number; // ضخامت (میلی‌متر)
  finish?: string; // نوع سطح (مات/براق/میکس و ...)
  qualityGrade?: string; // درجه کیفیت
  originCountry?: string; // کشور/کارخانه سازنده
  weightPerCarton?: number; // وزن هر کارتن (کیلوگرم)
  waterAbsorption?: string; // میزان جذب آب
  warranty?: string; // گارانتی/ضمانت
}

export type SortOption = "-createdAt" | "createdAt" | "price" | "-price";

// گزینه‌ی مرتب‌سازی که از بک‌اند میاد؛ label و order و isActive از داشبورد
// مدیریتی قابل تغییرن، ولی value باید یکی از مقادیر SortOption باشه چون
// مستقیم به کوئری sort بک‌اند وصل میشه.
export interface SortOptionItem {
  value: SortOption;
  label: string;
  order?: number;
}

export interface ProductsQuery {
  search?: string;
  category?: string;
  brand?: string;
  size?: string;
  style?: string;
  color?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: SortOption;
}

// گزینه‌ی ساده‌ی فیلتر که از /tile-finder/(sizes|styles|colors|locations) میاد
export interface FilterOption {
  _id: string;
  name: string;
  slug: string;
  hex?: string | null; // فقط برای رنگ‌ها پر می‌شه
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}
