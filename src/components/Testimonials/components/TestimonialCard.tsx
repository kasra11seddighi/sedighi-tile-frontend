import { Star, Quote } from "lucide-react";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import type { Testimonial } from "../types/testimonials.types";

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  const initial = testimonial.name?.trim()?.[0] ?? "؟";

  return (
    <div className="flex flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
      <Quote size={26} className="mb-3 text-brand/40" />

      <div className="mb-4 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            className={
              index < testimonial.rating
                ? "fill-brand-light text-brand-light"
                : "text-white/15"
            }
          />
        ))}
      </div>

      <p className="flex-1 text-sm leading-7 text-white/70">
        {testimonial.comment}
      </p>

      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        {testimonial.avatar ? (
          <img
            src={resolveImageUrl(testimonial.avatar)}
            alt={testimonial.name}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-gradient-from/20 to-brand-gradient-to/20 text-sm font-bold text-brand-light">
            {initial}
          </span>
        )}

        <div>
          <p className="text-sm font-bold text-white">{testimonial.name}</p>
          {testimonial.role && (
            <p className="text-xs text-white/40">{testimonial.role}</p>
          )}
        </div>
      </div>
    </div>
  );
}
