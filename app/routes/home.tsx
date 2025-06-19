import { useEffect } from "react";
import type { Route } from "./+types/home";
import useAppStore from "~/store/appStore";
import useMoviesFetcher from "~/features/movies/hook/useMovies";
import Header from "~/components/UI/header/Header";
import MoviesSection from "~/features/movies/components/MoviesSection";
const { fetchUpcomingMovies } = useMoviesFetcher();

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Absolute Movies - Home" },
    { name: "description", content: "Welcome to Absolute Movies, you can discover a new thinks to watch" },
  ];
}

export async function loader({ }: Route.LoaderArgs) {
  const upcomingMovies = await fetchUpcomingMovies();
  return upcomingMovies;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const setUpcomingMovies = useAppStore((state) => state.setUpcomingMovies);

  useEffect(() => {
    if (loaderData) {
      setUpcomingMovies(loaderData);
    }
  }, [])
  return (
    <>
      <Header />

      <main className="px-5">
        <MoviesSection category="popular" classNext="nextPopular" classPrev="prevPopular" type="swiper"/>
        <MoviesSection category="now_playing" classNext="nextNow" classPrev="prevNow" type="swiper"/>
        <MoviesSection category="top_rated" classNext="nextTop" classPrev="prevTop"/>
      </main>
    </>
  );
}
