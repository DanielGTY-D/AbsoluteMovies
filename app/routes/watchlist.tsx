
import type { Route } from "./+types/watchlist";
import type { MoviesApiResponse } from "~/features/movies/models";
import type { TvSeriesApiResponse } from "~/features/series/models";
import Pagination from "~/components/UI/pagination/Pagination";
import { MoviesCard } from "~/features/movies/components";
import { SeriesCard } from "~/features/series/components";
import movieFetcher from "../features/movies/hook/useApiFetcher";
import tvFetcher from "../features/series/hooks/useApiFetcher";
const { fetchMovies } = movieFetcher();
const { fetchTvSeries } = tvFetcher();
import 'remixicon/fonts/remixicon.css'

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Absolute Movies - watchlist" },
    { name: "description", content: "watchlist for movies or tv series" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { query, page, slug } = params;
  const safePage = page ? parseInt(page) : 1;
  const response = await slug === "movie" ? fetchMovies(query, safePage) : fetchTvSeries(query, safePage);
  return response;
}

const WatchList = ({ loaderData, params }: Route.ComponentProps) => {
  const { query, slug, page } = params;
  const title = query.replace("_", " ");
  const movies = loaderData.results;

  return (
    <>
      <main className="container mx-auto px-5 lg:max-w-6xl py-10">
        <h3 className="my-10 text-center text-rose-800 font-semibold text-4xl uppercase">{title}</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            slug === "movie" ? (
              (movies as MoviesApiResponse).map((movie) => (
              <MoviesCard key={movie.id} data={movie} slug={slug} type="slide" />
            ))
            ) : (
              (movies as TvSeriesApiResponse).map((serie) => (
                <SeriesCard data={serie} slug={slug} type="slide"/>
              ))
            )
          }
        </ul>

        <Pagination currentPage={loaderData.page} totalPages={loaderData.total_pages} query={query} slug={slug} />
      </main>
    </>
  );
};

export default WatchList;