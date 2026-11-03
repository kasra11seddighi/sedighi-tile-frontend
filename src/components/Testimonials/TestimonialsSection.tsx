import { MessageSquareHeart } from "lucide-react";
import { useTestimonials } from "./hooks/useTestimonials";
import TestimonialCard from "./components/TestimonialCard";

export default function TestimonialsSection() {
  const { testimonials, isLoading, error } = useTestimonials(3);

  // اگه چیزی برای نشون دادن نیست (لود نشده، خطا خورده یا هنوز نظری ثبت
  // نشده)، این بخش کلاً از صفحه اصلی حذف می‌شه — دقیقاً مثل بخش مجله.
  if (isLoading || error || testimonials.length === 0) return null;

  return (
    <section dir="rtl" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-sm font-medium text-brand-light">
            <span className="h-px w-10 bg-brand-light/70" />
            <MessageSquareHeart size={15} />
            <span>نظرات مشتری‌ها</span>
            <span className="h-px w-10 bg-brand-light/70" />
          </div>
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            تجربه‌ی کسایی که قبل از تو خرید کردن
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
