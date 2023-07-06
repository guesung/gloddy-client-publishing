'use client';

import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const SELECT_LIST = new Array(10).fill(0).map((_, index) => index + 1);

interface PickerProps {
  numberValue?: number;
  setNumberValue?: (value: number) => void;
}

export default function NumberSwipePicker({ numberValue = 0, setNumberValue }: PickerProps) {
  return (
    <Swiper
      freeMode={{
        enabled: true,
        sticky: true,
      }}
      className="relative h-150 w-full bg-white"
      slidesPerView={5}
      spaceBetween={40}
      slideToClickedSlide
      centeredSlides
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode]}
      onSlideChange={(swiper) => setNumberValue && setNumberValue(SELECT_LIST[swiper.activeIndex])}
      initialSlide={numberValue ? SELECT_LIST.indexOf(numberValue as never) : 0}
    >
      {SELECT_LIST.map((slideContent) => (
        <SwiperSlide key={slideContent} className="overflow-visible">
          {({ isActive, isPrev, isNext }) =>
            isActive ? (
              <div className="flex items-center justify-center pt-10 text-66 font-700 text-black2">
                {slideContent}
              </div>
            ) : isPrev || isNext ? (
              <div className="font-500 flex items-center justify-center pt-30 text-50 text-gray3">
                {slideContent}
              </div>
            ) : (
              <div className="font-500 flex items-center justify-center pt-50 text-35 text-gray8">
                {slideContent}
              </div>
            )
          }
        </SwiperSlide>
      ))}
      <div className="z-100 absolute -bottom-55 left-1/2 h-134 w-134  -translate-x-1/2 -translate-y-1/2 rounded-200 bg-white4"></div>
    </Swiper>
  );
}