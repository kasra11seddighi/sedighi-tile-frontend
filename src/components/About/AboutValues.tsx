import { getAboutIcon } from "./iconMap";
import type { AboutValues as AboutValuesData } from "./types/about.types";

function AboutValues({ badge, title, items }: AboutValuesData) {
  return (
    <section dir="rtl" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-sm font-medium text-brand-light">
            <span className="h-px w-10 bg-brand-light/70" />
            <span>{badge}</span>
            <span className="h-px w-10 bg-brand-light/70" />
          </div>
          <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon, title: itemTitle, description }, index) => {
            const Icon = getAboutIcon(icon);
            return (
              <div
                key={itemTitle}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
              >
                <span className="pointer-events-none absolute -left-6 -top-6 text-6xl font-black text-white/[0.04] transition-colors duration-300 group-hover:text-brand/10">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gradient-from/20 to-brand-gradient-to/20 text-brand-light transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} />
                </span>
                <h3 className="relative text-sm font-bold text-white">{itemTitle}</h3>
                <p className="relative mt-2 text-xs leading-6 text-white/50">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
