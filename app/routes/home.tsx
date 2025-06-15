import { useEffect } from "react";
import type { Route } from "./+types/home";
import useAppStore from "~/store/appStore";
import useMoviesFetcher from "~/features/movies/hook/useMovies";
const { fetchUpcomingMovies } = useMoviesFetcher();

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
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
  return <>hey</>;
}
