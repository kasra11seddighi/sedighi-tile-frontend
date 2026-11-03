export interface FinderOption {
  id: string;
  title: string;

  value: string;
  image?: string;
  hex?: string;
  icon?: string;
}

// منبعِ گزینه‌های یک مرحله. ۵ نوع اول به فیلدهای ثابت محصول (location/size/
// brand/style/color) وصلن؛ "custom" یعنی مرحله‌ای که ادمین خودش از پنل
// ساخته (مثلاً «کف یا دیوار») و گزینه‌هاش مستقل و اختصاصی همون مرحله‌ان.
export type TileFinderStepSource =
  | "locations"
  | "sizes"
  | "brands"
  | "styles"
  | "colors"
  | "custom";

export interface TileFinderStep {
  id: string;
  title: string;
  source: TileFinderStepSource;
  order: number;
  options: FinderOption[];
}

// مقدار انتخاب‌شده در هر مرحله، با کلید شناسه‌ی همون مرحله (step.id)
export type TileFilters = Record<string, string>;

export interface ProductBrand {
  _id: string;
  name: string;
  logo?: string;
}

export interface Product {
  _id: string;
  slug: string;
  title: string;
  images: string;
  price: number;
  brand: ProductBrand;
}
