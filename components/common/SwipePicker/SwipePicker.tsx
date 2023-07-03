'use client';
import 'swiper/css';
import 'swiper/css/free-mode';

import clsx from 'clsx';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface PickerProps {
  selectList: string[];
  isFirst?: boolean;
  isLast?: boolean;
}
export default function SwipePicker({ selectList, isFirst = false, isLast = false }: PickerProps) {
  return (
    <Swiper
      freeMode={{
        enabled: true,
        sticky: true,
      }}
      className="h-180 w-full "
      direction={'vertical'}
      slidesPerView={3}
      mousewheel
      slideToClickedSlide
      centeredSlides
      // onSlideChange={(swiper) => setHour(swiper.realIndex)}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode]}
    >
      {selectList.map((slideContent) => (
        <SwiperSlide
          key={slideContent}
          className={clsx({ 'rounded-l-10': isFirst, 'rounded-r-10': isLast })}
        >
          <div className="flex justify-center items-center h-full  color-black2 text-inherit">
            {slideContent}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
