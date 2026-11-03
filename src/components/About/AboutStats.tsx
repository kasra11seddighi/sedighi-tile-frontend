import { getAboutIcon } from "./iconMap";
import type { AboutStat } from "./types/about.types";

interface Props {
  stats: AboutStat[];
}

function AboutStats({ stats }: Props) {
  return (
    <section dir="rtl" className="relative -mt-10 px-4 pb-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ icon, value, label }) => {
          const Icon = getAboutIcon(icon);
          return (
            <div
              key={label}
              className="group flex flex-col items-center rounded-[1.5rem] border border-white/10 bg-[#0d1520]/80 px-4 py-6 text-center shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:border-brand/40"
            >
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gradient-from/20 to-brand-gradient-to/20 text-brand-light transition-transform duration-300 group-hover:scale-110">
                <Icon size={20} />
              </span>
              <span className="text-2xl font-black text-white sm:text-3xl">
                {value}
              </span>
              <span className="mt-1 text-xs text-white/50">{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AboutStats;
