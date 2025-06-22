import { useEffect } from "react";
import type { Route } from "./+types/home";
import useAppStore from "~/store/appStore";
import useMoviesFetcher from "~/features/movies/hook/useMovies";
import Header from "~/components/UI/header/MainHeader";
import Movies from "~/features/movies/movies";
import Footer from "~/components/UI/footer/footer";
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
        <Movies />
      </main>

      <Footer />
    </>
  );
}
