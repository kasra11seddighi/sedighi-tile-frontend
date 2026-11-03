import { ArrowLeft, Headphones } from "lucide-react";

interface ButtonProps {
  text?: string;
  link?: string;
}

interface HeroContentProps {
  badge?: string;
  title?: string;
  highlightTitle?: string;
  description?: string;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
}

function HeroContent({
  badge,
  title,
  highlightTitle,
  description,
  primaryButton,
  secondaryButton,
}: HeroContentProps) {
  return (
    <div className="max-w-2xl text-center text-white">
      {badge && (
        <div className="mb-5 flex items-center justify-center gap-3 text-sm font-medium text-brand-light">
          <span className="h-px w-12 bg-brand-light/70" />
          <span>{badge}</span>
          <span className="h-px w-12 bg-brand-light/70" />
        </div>
      )}

      {title && (
        <h1 className="text-4xl font-black leading-[1.45] md:text-5xl lg:text-6xl">
          {title}

          {highlightTitle && (
            <>
              <br />
              <span className="text-brand-light">{highlightTitle}</span>
            </>
          )}
        </h1>
      )}

      {description && (
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
          {description}
        </p>
      )}

      {(primaryButton?.text || secondaryButton?.text) && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {primaryButton?.text && (
            <a
              href={primaryButton.link || "#"}
              className="inline-flex items-center gap-3 rounded-xl bg-brand-light px-6 py-3.5 font-bold text-[#07111f] transition-colors hover:bg-[#e7b783]"
            >
              <span>{primaryButton.text}</span>
              <ArrowLeft size={18} />
            </a>
          )}

          {secondaryButton?.text && (
            <a
              href={secondaryButton.link || "#"}
              className="inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 font-bold text-white transition-colors hover:bg-white/10"
            >
              <span>{secondaryButton.text}</span>
              <Headphones size={19} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default HeroContent;
