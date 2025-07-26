import { SecondaryHeader } from "~/components/UI";
import type { Route } from "./+types/SearchList";
import useDataFetcher from "~/hooks/useDataFetcher";
import { MoviesCard } from "~/features/movies/components";
import Pagination from "~/components/UI/pagination/Pagination";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Absolute Movies - searchlist" },
    { name: "description", content: "watchlist for movies or tv series" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { searchDataFetcher } = useDataFetcher();
  const { query, page } = params;
  const result = await searchDataFetcher(query, page);
  return result;
}

const SearchList = ({ loaderData, params }: Route.ComponentProps) => {
  const { query } = params;
  const title = query.replace("_", " ");
  const movies = loaderData.results;
  const slug = "movie";
  console.log(movies);
  return (
    <>
      <SecondaryHeader />
      <main className="container mx-auto px-5 lg:max-w-6xl py-10">
        <h3 className="my-10 text-center text-rose-800 font-semibold text-4xl uppercase">
          {title}
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MoviesCard key={movie.id} data={movie} slug={slug} type="slide" />
          ))}
        </ul>

        <Pagination
          currentPage={loaderData.page}
          totalPages={loaderData.total_pages}
          query={query}
          slug={slug}
          action={"searchlist"}
        />
      </main>
    </>
  );
};

export default SearchList;
