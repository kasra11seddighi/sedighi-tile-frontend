import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import type { YardBanner } from "../types/yardBanner.types";

interface Props {
  banner: YardBanner;
}

export default function YardBannerCard({ banner }: Props) {
  const hasCaption = Boolean(banner.title || banner.subtitle);

  const content = (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
      <img
        src={resolveImageUrl(banner.image)}
        alt={banner.alt || banner.title || "بیرون از خانه"}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {hasCaption && (
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-5">
          {banner.title && (
            <h3 className="text-lg font-black text-white sm:text-xl">
              {banner.title}
            </h3>
          )}
          {banner.subtitle && (
            <p className="mt-1 text-xs leading-6 text-white/70 sm:text-sm">
              {banner.subtitle}
            </p>
          )}
        </div>
      )}

      {banner.link && (
        <span className="absolute left-4 top-4 flex h-8 w-8 -translate-x-2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowLeft size={16} />
        </span>
      )}
    </div>
  );

  if (banner.link) {
    return <Link to={banner.link}>{content}</Link>;
  }

  return content;
}
