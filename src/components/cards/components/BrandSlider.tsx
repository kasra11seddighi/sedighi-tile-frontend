import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";

import BrandCard from "./BrandCard";
import type { Brand } from "../types/brands.types";

type Props = {
  brands: Brand[];
};

const BrandSlider = ({ brands }: Props) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1.15}
        grabCursor={true}
        speed={600}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".brand-next",
          prevEl: ".brand-prev",
        }}
        breakpoints={{
          480: {
            slidesPerView: 1.4,
          },

          640: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },
        }}
        className="!pb-10"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <BrandCard brand={brand} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه قبلی */}
      <button
        className="
        brand-prev
        absolute
        -right-4
        top-1/2
        z-10
        hidden
        h-10
        w-10
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-slate-900/80
        text-white
        backdrop-blur
        transition
        hover:bg-orange-500
        lg:flex
        "
      >
        <ChevronRight size={20} />
      </button>

      {/* دکمه بعدی */}
      <button
        className="
        brand-next
        absolute
        -left-4
        top-1/2
        z-10
        hidden
        h-10
        w-10
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-slate-900/80
        text-white
        backdrop-blur
        transition
        hover:bg-orange-500
        lg:flex
        "
      >
        <ChevronLeft size={20} />
      </button>
    </div>
  );
};

export default BrandSlider;
