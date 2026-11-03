// شکل محصولِ داخلِ هر آیتم علاقه‌مندی؛ دقیقاً همون فیلدهایی که بک‌اند
// توی favorite.service.ts با POPULATE_FIELDS برمی‌گردونه
// ("name slug price discountPrice images stock") — نه شیء کامل Product.
export interface FavoriteProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  images: string[];
  stock: number;
}

export interface FavoriteItem {
  _id: string;
  product: FavoriteProduct;
  createdAt: string;
}

// دفترچه آدرس کاربر - دقیقاً هم‌شکل IAddress بک‌اند
export interface Address {
  _id: string;
  label: string;
  fullName: string;
  phone: string;
  landlinePhone?: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export type AddressInput = Omit<Address, "_id">;
