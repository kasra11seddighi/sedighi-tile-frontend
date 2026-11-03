import BrandsSection from "../components/cards/BrandsSection";
import { useSeo } from "../hooks/useSeo";

export default function Brands() {
  useSeo({
    title: "برندها",
    description: "برندهای معتبری که نمایندگی صدیقی محصولاتشون رو عرضه می‌کنه.",
  });

  return <BrandsSection />;
}
