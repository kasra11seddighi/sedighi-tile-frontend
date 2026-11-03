import type { HeroSlideItem } from "../types/hero.types";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";

interface Props {
  slide: HeroSlideItem;
}

function HeroSlide({ slide }: Props) {
  const imageUrl = resolveImageUrl(slide.image);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={imageUrl}
        alt={slide.alt || "تصویر اسلاید"}
        className="h-full w-full object-cover object-center select-none"
        loading="eager"
      />
    </div>
  );
}

export default HeroSlide;
