// tengo 3 peticiones a api, /movie/popular, /movie/top_rated, /movie/now_playing

import { useEffect, useState } from "react";
import { Link } from "react-router";
import useMoviesFetcher from "../hook/useMovies";
import type { MoviesApiResponse } from "../models/movies.model";
import type { Route } from ".react-router/types/app/+types/root";
import CustomSwiper from "~/components/UI/swiper/Swiper";
import { useInView } from 'react-intersection-observer';

interface MoviesSectionProps {
  category: MoviesSection["category"];
  classPrev: string;
  classNext: string;
}

function MoviesSection({ category, classNext, classPrev }: MoviesSectionProps) {
  const [movies, setMovies] = useState<MoviesApiResponse>();
  const formateCategory = category.replace("_", " ");
  const { fetchMovies } = useMoviesFetcher();
  const [ref, inView] = useInView({
    threshold: 0.2,
  })

  const setMoviesToState = async () => {
    try {
      const response = await fetchMovies(category);
      if (response.length === 0) {
        console.error("No movies found for category:", category);
        return;
      }
      setMovies(response);
    } catch (error) {
      console.log("Error setting movies to state:", error);
    }
  }

  useEffect(() => {
    console.log(inView)
    setMoviesToState();
  }, []);
  return (
    <>
      <section className="container mx-auto my-8 lg:max-w-6xl" ref={ref}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-3xl capitalize text-rose-800 font-semibold">{formateCategory}</h2>

          <Link to={`watchlist/${category}`} className="bg-rose-800 text-rose-100 rounded-lg text-base font-bold py-1 px-4 hover:bg-rose-600 transition-colors duration-500">See More</Link>
        </div>

        {
          movies?.length && (
            <CustomSwiper movies={movies} nextClassName={classNext} prevClassName={classPrev} />
          )
        }
      </section>
    </>
  );
};


export default MoviesSection;