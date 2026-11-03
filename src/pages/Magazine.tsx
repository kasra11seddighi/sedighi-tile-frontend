import MagazineListSection from "../components/Magazine/MagazineListSection";
import { useSeo } from "../hooks/useSeo";

export default function Magazine() {
  useSeo({
    title: "مجله",
    description: "مقالات و راهنماهای نمایندگی صدیقی درباره‌ی کاشی، سرامیک و دکوراسیون.",
  });

  return <MagazineListSection />;
}
