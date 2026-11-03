import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import type { MagazineListItem } from "../types/magazine.types";

interface Props {
  article: MagazineListItem;
}

export default function MagazineCard({ article }: Props) {
  return (
    <Link
      to={`/magazine/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-brand/40"
    >
      <div className="aspect-[16/10] w-full shrink-0 overflow-hidden">
        <img
          src={resolveImageUrl(article.coverImage)}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {article.tags?.[0] && (
          <span className="mb-2 w-fit rounded-full bg-brand/10 px-3 py-1 text-[10px] font-medium text-brand-light">
            {article.tags[0]}
          </span>
        )}

        <h3 className="line-clamp-2 text-sm font-bold leading-7 text-white">
          {article.title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-6 text-white/50">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-white/35">
          <Clock size={12} />
          {article.readTime}
        </div>
      </div>
    </Link>
  );
}
