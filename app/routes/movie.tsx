import type { Route } from "./+types/movie";
import { useState } from "react";
import useMoviesFetcher from "~/features/movies/hook/useApiFetcher";
import SecondaryHeader from "~/components/UI/header/SecondaryHeader";
import { VideosSection, RelatedSection } from "../features/movies/components";
import useFavoriteContent from "~/hooks/useFavoriteContent";
const { fetchMoviesById } = useMoviesFetcher();
import Toaster from "~/components/UI/toaster/toaester";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  const response = await fetchMoviesById(parseInt(id));
  return response;
}

const Movie = ({ loaderData }: Route.ComponentProps) => {
  const movie = loaderData.movies;
  const [alert, setAlert] = useState({ message: "", type: "" });
  const { addFavoriteContent } = useFavoriteContent();
  const isLogged = () => {
    const token = localStorage.getItem("AUTH_TOKEN");

    return token;
  };

  const addToFavorites = async () => {
    if (!isLogged()) {
      setAlert({
        message: "Debes iniciar sesion para agregar a favoritos",
        type: "error",
      });
      return;
    }

    const userInfo = localStorage.getItem("USER_INFO");

    if (userInfo) {
      const prevData = JSON.parse(userInfo || "[]");
      const favoriteContent = JSON.parse(prevData.favoriteContent || "[]");

      const newFavoriteItem = {
        id: movie.id,
        name: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        type: "movie",
      };

      const newFavoriteContent = [...favoriteContent, newFavoriteItem];

      const response = await addFavoriteContent(
        newFavoriteContent,
        prevData.username
      );

      localStorage.setItem("USER_INFO", JSON.stringify(response.user));

      setAlert({ message: response.msg, type: "succes" });
    }
  };
  return (
    <>
      <Toaster
        type={alert.type}
        message={alert.message}
        removeFn={setAlert}
        outTime={7000}
      />
      <SecondaryHeader />
      <main className="container mx-auto lg:max-w-6xl min-h-[80vh] flex items-center px-5 py-12 md:px-0">
        <div className="flex flex-col md:flex-row gap-12 w-full p-0 md:p-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-[350px] h-[520px] rounded-lg object-cover shadow-xl border-4 border-rose-600"
          />
          <div className="flex-1 flex flex-col justify-center px-2 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-rose-600">
              {movie.title}
            </h1>
            <p className="mb-4 text-lg italic text-rose-800">{movie.tagline}</p>
            <p className="mb-6 text-base md:text-lg text-gray-800 line-clamp-6">
              {movie.overview}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-rose-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-8 mt-4">
              <span className="text-rose-800 text-base">
                Año:{" "}
                <span className="text-gray-900 font-semibold">
                  {movie.release_date?.slice(0, 4)}
                </span>
              </span>
              <span className="text-rose-800 text-base">
                Rating:{" "}
                <span className="text-gray-900 font-semibold">
                  {movie.vote_average}
                </span>
              </span>
            </div>
            <button
              className="mt-8 w-fit px-6 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold shadow transition-colors duration-200"
              type="button"
              onClick={addToFavorites}
            >
              Agregar a Favoritos
            </button>
          </div>
        </div>
      </main>
      <VideosSection data={loaderData.videos} />
      <RelatedSection data={loaderData.similarMovies} />
    </>
  );
};

export default Movie;
