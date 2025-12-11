import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SliderImage({Image , setImageLoaded}) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Pagination,Navigation]}
        className="mySwiper"
      >

        {Image.map((val,inx)=>(

            <SwiperSlide key={inx}>
                <img
                src={val}
                onLoad={() => setImageLoaded(true)}
                className="w-full z-10 h-80   object-cover rounded-2xl shadow-lg"
              />
            </SwiperSlide>

        ))}
   
      </Swiper>
    </>
  );
}
