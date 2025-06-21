
import type { Route } from "./+types/watchlist";
import { useSubmit } from "react-router";
import useMoviesFetcher from "~/features/movies/hook/useMovies";
import SecondaryHeader from "~/components/UI/header/secondaryHeader";
import Card from "~/components/UI/cards/Card";
import Pagination from "~/components/UI/pagination/Pagination";
import 'remixicon/fonts/remixicon.css'


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Absolute Movies - watchlist" },
    { name: "description", content: "watchlist for movies or tv series" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { query, page } = params;
  const { fetchMovies } = useMoviesFetcher();
  const response = await fetchMovies(query, page);
  return response;
}

const WatchList = ({ loaderData, params }: Route.ComponentProps) => {
  const { query, slug, page } = params;
  const title = query.replace("_", " ");
  const movies = loaderData.results;


  const getNewPage = () => {
    const submit = useSubmit()
  }
  return (
    <>
      <SecondaryHeader />

      <main className="container mx-auto px-5 lg:max-w-6xl py-10">
        <h3 className="my-10 text-center text-rose-800 font-semibold text-4xl uppercase">{title}</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            movies.map((movie) => (
              <Card key={movie.id} data={movie} slug={slug} type="slide" />
            ))
          }
        </ul>

        <Pagination currentPage={loaderData.page} totalPages={loaderData.total_pages} onAction={getNewPage} />
      </main>
    </>
  );
};

export default WatchList;