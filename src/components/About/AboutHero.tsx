import { Sparkles } from "lucide-react";
import type { AboutHero as AboutHeroData } from "./types/about.types";

function AboutHero(data: AboutHeroData) {
  const { badge, titleBefore, titleHighlight, titleAfter, description } = data;

  return (
    <section dir="rtl" className="relative overflow-hidden pb-24 pt-20">
      {/* نورهای طلایی محو در پس‌زمینه، هماهنگ با هویت سایت */}
      <div className="pointer-events-none absolute -top-32 right-1/2 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[280px] w-[280px] rounded-full bg-brand-gradient-via/10 blur-[110px]" />

      {/* الگوی نقطه‌ای ظریف پس‌زمینه */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-light">
          <Sparkles size={13} />
          {badge}
        </div>

        <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl md:text-5xl">
          {titleBefore}{" "}
          <span className="bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to bg-clip-text text-transparent">
            {titleHighlight}
          </span>{" "}
          {titleAfter}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/60 sm:text-base">
          {description}
        </p>

        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-l from-transparent via-brand-light/60 to-transparent" />
      </div>
    </section>
  );
}

export default AboutHero;
