import { Star, User } from "lucide-react";
import type { ProductComment } from "../types/comments.types";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function CommentItem({ comment }: { comment: ProductComment }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-gradient-from/20 to-brand-gradient-to/20 text-brand-light">
            <User size={15} />
          </span>
          <div>
            <p className="text-sm font-bold text-white">{comment.name}</p>
            <p className="text-[11px] text-white/35">{formatDate(comment.createdAt)}</p>
          </div>
        </div>

        {Boolean(comment.rating) && (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={13}
                className={
                  index < comment.rating!
                    ? "fill-brand-light text-brand-light"
                    : "text-white/15"
                }
              />
            ))}
          </div>
        )}
      </div>

      <p className="mt-3 text-sm leading-7 text-white/65">{comment.text}</p>
    </div>
  );
}
