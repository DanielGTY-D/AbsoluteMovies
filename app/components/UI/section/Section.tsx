
import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { MoviesApiResponse } from "~/features/movies/models";
import type { ApiCategory } from "~/models/ApiCategory";
import type { TvSeriesApiResponse } from "~/features/series/models";
import type { CardProps } from "~/features/movies/components/Card";
import seriesFetcher from "~/features/series/hooks/useApiFetcher"
import moviesFetcher from '~/features/movies/hook/useApiFetcher';
import { CustomSwiper } from "~/components/UI";
import { MoviesCard } from "~/features/movies/components";
import { SeriesCard } from "~/features/series/components";
import { useInView } from 'react-intersection-observer';


interface SectionProps {
  Swiper: {
    Active: boolean;
    ClassPrev: string;
    ClassNext: string;
  };
  ApiCategory: ApiCategory['category'];
  MediaType: "movie" | "tv"
  cardType: CardProps['type']
}

const Section = ({ ApiCategory,Swiper, MediaType, cardType} : SectionProps) => {
  const [mediaContent, setMediaContent] = useState<TvSeriesApiResponse | MoviesApiResponse >([]);
  const {fetchTvSeries} = seriesFetcher();
  const {fetchMovies} = moviesFetcher()
  const {inView, ref} = useInView({triggerOnce: true, threshold: .2});
  const categoryName = ApiCategory.replace("_", " ");

  const getMediaContent = async () => {
    if(MediaType === "movie") {
      const response = await fetchMovies(ApiCategory)
      if(response.results.length) {
        setMediaContent(response.results)
      }
      return
    }

    if(MediaType === "tv") {
      const response = await fetchTvSeries(ApiCategory);
      if(response.results.length) {
        setMediaContent(response.results);
      }
    }
  }

  useEffect(() => {
    if(inView) {
      getMediaContent()
    }
  }, [inView])

  return (
    <>
      {Swiper.Active ? (
        <section className="my-20" ref={ref}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-3xl capitalize text-rose-800 font-semibold">
              {categoryName}
            </h2>

            <Link
              to={`watchlist/${MediaType}/${ApiCategory}`}
              className="bg-rose-800 text-rose-100 rounded-lg text-base font-bold py-1 px-4 hover:bg-rose-600 transition-colors duration-500"
            >
              See More
            </Link>
          </div>

          {mediaContent?.length && (
            <CustomSwiper
              movies={mediaContent}
              nextClassName={Swiper.ClassNext}
              prevClassName={Swiper.ClassPrev}
              slug={MediaType}
            />
          )}
        </section>
      ) : (
        <>
          <section className="my-20" ref={ref}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-3xl capitalize text-rose-800 font-semibold">
                {categoryName}
              </h2>

              <Link
                to={`watchlist/${MediaType}/${ApiCategory}`}
                className="bg-rose-800 text-rose-100 rounded-lg text-base font-bold py-1 px-4 hover:bg-rose-600 transition-colors duration-500"
              >
                See More
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {
                MediaType === 'movie' ? (
                  // Render MoviesCard components here, e.g.:
                  (mediaContent as MoviesApiResponse).map((movie) => (
                    <MoviesCard key={movie.id} data={movie} slug={MediaType} type={cardType}/>
                  ))
                ) : (
                  // Render SeriesCard components here, e.g.:
                  (mediaContent as TvSeriesApiResponse).map((series) => (
                    <SeriesCard key={series.id} data={series} slug={MediaType} type={cardType}/>
                  ))
                )
              }
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default Section;