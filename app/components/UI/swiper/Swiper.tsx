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
}

function CustomSwiper({ movies, nextClassName, prevClassName }: SwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = `https://image.tmdb.org/t/p/original${movies[currentIndex]?.poster_path || ''}`;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

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
              <Card data={movie} type="slide"/>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <button className={`${prevClassName} absolute z-30 left-2 top-[50%] bg-rose-800 p-2 rounded-full flex items-center justify-center`} aria-label="Anterior"><i className="ri-arrow-left-line text-white"></i></button>
      <button className={`${nextClassName} absolute z-30 right-2 top-[50%] bg-rose-800 p-2 rounded-full flex items-center justify-center`} aria-label="Siguiente"><i className="ri-arrow-right-line text-white"></i></button>
    </div>
  );
};

export default CustomSwiper;