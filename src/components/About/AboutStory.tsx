import { Gem, Quote } from "lucide-react";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import type { AboutStory as AboutStoryData } from "./types/about.types";

function AboutStory(data: AboutStoryData) {
  const {
    badge,
    title,
    paragraph1,
    paragraph2,
    image,
    experienceValue,
    experienceLabel,
  } = data;

  return (
    <section dir="rtl" className="py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
        {/* تصویر */}
        <div className="relative order-2 lg:order-1">
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand/10 blur-[60px]" />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
            <img
              src={image ? resolveImageUrl(image) : ""}
              alt="نمایشگاه نمایندگی صدیقی"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b11]/60 via-transparent to-transparent" />
          </div>

          {/* بج تجربه */}
          <div className="absolute -bottom-6 -right-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1520] px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to text-white">
              <Gem size={18} />
            </span>
            <div>
              <p className="text-lg font-black text-white">{experienceValue}</p>
              <p className="text-[11px] text-white/50">{experienceLabel}</p>
            </div>
          </div>
        </div>

        {/* متن */}
        <div className="order-1 lg:order-2">
          <div className="mb-4 flex items-center gap-3 text-sm font-medium text-brand-light">
            <span className="h-px w-10 bg-brand-light/70" />
            <span>{badge}</span>
          </div>

          <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>

          <div className="relative mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <Quote size={28} className="absolute -top-3 right-5 rotate-180 text-brand/25" />
            <p className="text-sm leading-8 text-white/60">{paragraph1}</p>
          </div>

          <p className="mt-5 text-sm leading-8 text-white/60">{paragraph2}</p>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;
