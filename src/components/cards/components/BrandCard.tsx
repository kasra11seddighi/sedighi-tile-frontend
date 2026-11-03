import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import type { Brand } from "../types/brands.types";

type BrandCardProps = {
  brand: Brand;
};

const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative w-full"
    >
      <Link
        to={`/products?brand=${brand._id}`}
        className="relative flex items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-2xl transition-all duration-300 group-hover:border-orange-500/30 group-hover:bg-slate-800/80 sm:gap-5 sm:p-5"
      >
        <div className="absolute left-4 top-4 -translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-500 shadow-sm">
            <ArrowLeft size={16} strokeWidth={3} />
          </div>
        </div>

        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white p-3 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 sm:h-20 sm:w-20">
          <img
            src={resolveImageUrl(brand.logo)}
            alt={brand.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />

            <span className="text-[9px] font-bold uppercase tracking-widest text-orange-500 sm:text-[10px]">
              Verified Brand
            </span>
          </div>

          <h3 className="truncate text-lg font-extrabold text-white transition-colors group-hover:text-orange-400 sm:text-xl">
            {brand.name}
          </h3>

          {brand.shortDescription ? (
            <p className="mt-2 line-clamp-1 text-[11px] text-gray-400 transition-colors group-hover:text-gray-300 sm:text-xs">
              {brand.shortDescription}
            </p>
          ) : (
            <p className="mt-2 text-[10px] italic text-gray-600">
              توضیحات کوتاه موجود نیست
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default BrandCard;
