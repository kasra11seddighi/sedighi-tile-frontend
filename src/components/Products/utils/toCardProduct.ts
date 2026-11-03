import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import type { SharedProductCardData } from "../../shared/ProductCard";
import type { Product } from "../types/products.types";

// نگاشت محصول (شکل خام API) به شکلی که ProductCard انتظار داره؛ چون این
// نگاشت توی چند جا (لیست محصولات، محصولات مشابه، بازدیدهای اخیر) تکرار
// می‌شد، یه‌بار اینجا نوشته شده تا همه‌جا یکسان بمونه.
export function toCardProduct(product: Product): SharedProductCardData {
  return {
    id: product._id,
    slug: product.slug,
    name: product.name,
    image: product.images?.[0] ? resolveImageUrl(product.images[0]) : undefined,
    price: product.price,
    discountPrice: product.discountPrice,
    categoryName: product.category?.name,
    brandName: product.brand?.name,
    inStock: product.stock > 0,
    saleUnit: product.saleUnit,
    pricePerM2: product.pricePerM2,
    pricePerCarton: product.pricePerCarton,
  };
}
