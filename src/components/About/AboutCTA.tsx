import { Phone, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useFooter } from "../Footer/hooks/useFooter";
import type { AboutCTA as AboutCTAData } from "./types/about.types";

function AboutCTA({ title, description }: AboutCTAData) {
  const { data } = useFooter();
  const phone = data?.contact?.phone;

  return (
    <section dir="rtl" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-l from-[#1a1408] via-[#0d1520] to-[#0d1520] px-6 py-14 text-center sm:px-14">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-brand-gradient-via/10 blur-[100px]" />

          <span className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to text-[#07111f] shadow-lg shadow-brand-gradient-via/20">
            <MessageCircle size={22} />
          </span>

          <h2 className="relative text-2xl font-black text-white sm:text-3xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-sm leading-7 text-white/60">
            {description}
          </p>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {phone && (
              <a
                href={`tel:${phone}`}
                dir="ltr"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-3 text-sm font-bold text-[#07111f] shadow-lg shadow-brand-gradient-via/20 transition-transform hover:scale-[1.02]"
              >
                <Phone size={16} />
                {phone}
              </a>
            )}

            <Link
              to="/products"
              className="group flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-brand/50 hover:text-brand"
            >
              مشاهده محصولات
              <ArrowLeft
                size={16}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;
