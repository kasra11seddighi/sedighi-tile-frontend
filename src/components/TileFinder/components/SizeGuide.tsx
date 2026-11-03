import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

interface SizeOption {
  id?: string;
  _id?: string;
  title: string;
}

interface SizeGuideProps {
  sizes: SizeOption[];
  selectedSize?: string;
}

export default function SizeGuide({ sizes, selectedSize }: SizeGuideProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const getImagePath = (title: string) => {
    const fileName = title.trim().replace(/\s+/g, "").replace(/×/g, "x");

    return `/images/size-guide/${fileName}.jpg`;
  };

  useEffect(() => {
    if (!swiperRef.current || !selectedSize) return;

    const selectedIndex = sizes.findIndex((size) => {
      const sizeId = size.id ?? size._id;

      return (
        sizeId === selectedSize ||
        size.title.trim().toLowerCase() === selectedSize.trim().toLowerCase()
      );
    });

    if (selectedIndex !== -1) {
      swiperRef.current.slideTo(selectedIndex);
    }
  }, [selectedSize, sizes]);

  if (!sizes.length) return null;

  return (
    <div className="mt-5 w-full min-w-0">
      <div className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-[#E7DECD] bg-[#FBF8F2]">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{
            clickable: true,
          }}
          className="size-guide-swiper w-full min-w-0"
        >
          {sizes.map((size) => (
            <SwiperSlide
              key={size.id ?? size._id ?? size.title}
              className="!w-full"
            >
              <div className="flex h-[320px] w-full min-w-0 items-center justify-center overflow-hidden p-4">
                <img
                  src={getImagePath(size.title)}
                  alt={`راهنمای انتخاب سایز ${size.title}`}
                  className="block h-auto max-h-full w-full max-w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E7DECD] bg-white/90 text-[#6F6255] shadow-sm backdrop-blur transition hover:bg-white hover:text-[#AD5A34]"
          aria-label="تصویر قبلی"
        >
          <ChevronRight size={18} />
        </button>

        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E7DECD] bg-white/90 text-[#6F6255] shadow-sm backdrop-blur transition hover:bg-white hover:text-[#AD5A34]"
          aria-label="تصویر بعدی"
        >
          <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );
}
