import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"
import 'swiper/css';
import type { MoviesApiResponse, MovieApiResponse } from "~/features/movies/models/movies.model";
import Card from "../cards/Card";

interface SwiperProps {
  movies: MoviesApiResponse;
  prevClassName: string;
  nextClassName: string;
  slug: string
}

function CustomSwiper({ movies, nextClassName, prevClassName, slug }: SwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <Swiper
        loop={true}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: `.${nextClassName}`,
          prevEl: `.${prevClassName}`,
        }}
        spaceBetween={5}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {
          movies.map((movie: MovieApiResponse, index: number) => (
            <SwiperSlide key={movie.id}>
              <Card data={movie} type="slide" slug={slug}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <button className={`${prevClassName} absolute z-30 left-2 top-[50%] bg-white/20 backdrop-blur-md py-2 px-2.5 cursor-pointer rounded-full flex items-center justify-center`} aria-label="Anterior"><i className="ri-arrow-left-line text-rose-500 text-2xl"></i></button>
      <button className={`${nextClassName} absolute z-30 right-2 top-[50%] bg-white/20 backdrop-blur-md py-2 px-2.5 cursor-pointer rounded-full flex items-center justify-center`} aria-label="Siguiente"><i className="ri-arrow-right-line text-rose-500 text-2xl"></i></button>
    </div>
  );
};

export default CustomSwiper;