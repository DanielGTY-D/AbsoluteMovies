import { useEffect } from "react";
import type { Route } from "./+types/home";
import useAppStore from "~/store/appStore";
import useMoviesFetcher from "~/features/movies/hook/useApiFetcher";
import {Footer, Header} from '../components/UI';
import Movies from "~/features/movies/movies";
import Series from "../features/series/Series";
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

      <main className="px-5 container mx-auto lg:max-w-6xl">
        <Movies />
        <Series />
      </main>

      <Footer />
    </>
  );
}
