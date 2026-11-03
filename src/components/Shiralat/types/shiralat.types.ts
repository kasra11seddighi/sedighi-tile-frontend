export interface ShiralatCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface ShiralatProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice: number;
  images: string[];
  brand?: { _id: string; name: string; logo: string } | null;
}
