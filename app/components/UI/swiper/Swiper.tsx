import type { MovieApiResponse, MoviesApiResponse } from "~/features/movies/models/movies.model";
import type { TvSerieApiResponse, TvSeriesApiResponse } from "~/features/series/models";
import { MoviesCard } from "~/features/movies/components";
import { SeriesCard } from "~/features/series/components"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"
import 'swiper/css';

interface SwiperProps {
  movies: TvSeriesApiResponse | MoviesApiResponse;
  prevClassName: string;
  nextClassName: string;
  slug: string
}

function CustomSwiper({ movies, nextClassName, prevClassName, slug }: SwiperProps) {
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
          slug === "movies" ? (
            (movies as MovieApiResponse[]).map((movie, index) => (
              <SwiperSlide key={movie.id}>
                <MoviesCard data={movie} type="slide" slug={slug} />
              </SwiperSlide>
            ))
          ) : (
            (movies as TvSerieApiResponse[]).map((movie, index) => (
              <SwiperSlide key={movie.id}>
                <SeriesCard data={movie} type="slide" slug={slug} />
              </SwiperSlide>
            ))
          )
        }
      </Swiper>
      <button className={`${prevClassName} absolute z-30 left-2 top-[50%] bg-white/20 backdrop-blur-md py-2 px-2.5 cursor-pointer rounded-full flex items-center justify-center`} aria-label="Anterior"><i className="ri-arrow-left-line text-rose-500 text-2xl"></i></button>
      <button className={`${nextClassName} absolute z-30 right-2 top-[50%] bg-white/20 backdrop-blur-md py-2 px-2.5 cursor-pointer rounded-full flex items-center justify-center`} aria-label="Siguiente"><i className="ri-arrow-right-line text-rose-500 text-2xl"></i></button>
    </div>
  );
};

export default CustomSwiper;