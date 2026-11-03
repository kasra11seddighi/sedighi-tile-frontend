import { useSearchParams } from "react-router-dom";
import ProductsSection from "../components/Products/ProductsSection";
import { useSeo } from "../hooks/useSeo";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") ?? "";
  const brandFromUrl = searchParams.get("brand") ?? "";
  const searchFromUrl = searchParams.get("search") ?? "";

  useSeo({
    title: "محصولات کاشی و سرامیک",
    description:
      "مشاهده و بررسی انواع کاشی و سرامیک در طرح، سایز و برندهای متنوع از نمایندگی صدیقی.",
    path: "/products",
  });

  return (
    <ProductsSection
      key={`${categoryFromUrl}:${brandFromUrl}:${searchFromUrl}`}
      initialCategory={categoryFromUrl}
      initialBrand={brandFromUrl}
      initialSearch={searchFromUrl}
    />
  );
}
