import type { Route } from "./+types/tv";
import serieFetcher from "../features/series/hooks/useApiFetcher";
import { SecondaryHeader } from "~/components/UI";
const { fetchTvSeriesById } = serieFetcher();
import Toaster from "~/components/UI/toaster/toaester";
import { useState } from "react";
import useFavoriteContent from "~/hooks/useFavoriteContent";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  const response = await fetchTvSeriesById(parseInt(id));
  return response;
}

const Tv = ({ loaderData, params }: Route.ComponentProps) => {
  const { addFavoriteContent } = useFavoriteContent();
  const [alert, setAlert] = useState({ message: "", type: "" });
  const serie = loaderData;

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
        id: serie.id,
        name: serie.name,
        poster_path: serie.poster_path,
        overview: serie.overview,
        type: "tv",
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

      <section className="container mx-auto lg:max-w-6xl px-5 md:px-0 min-h-[80vh] flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-[340px] flex-shrink-0 flex items-center justify-center mb-8 md:mb-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            alt={serie.name}
            className="rounded-2xl shadow-2xl border-4 border-rose-600 w-full h-[480px] object-cover bg-rose-800"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center md:pl-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-rose-900 drop-shadow-lg">
            {serie.name}
          </h1>
          <p className="mb-4 text-lg italic text-rose-800">{serie.tagline}</p>
          <p className="mb-6 text-base md:text-lg text-rose-600 line-clamp-6">
            {serie.overview}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {serie.genres?.map((genre: { id: number; name: string }) => (
              <span
                key={genre.id}
                className="bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-8 mt-4">
            <span className="text-rose-800 text-base">
              Temporadas:{" "}
              <span className="text-rose-600 font-semibold">
                {serie.number_of_seasons}
              </span>
            </span>
            <span className="text-rose-800 text-base">
              Episodios:{" "}
              <span className="text-rose-600 font-semibold">
                {serie.number_of_episodes}
              </span>
            </span>
          </div>
          <div>
            <button
              className="mt-8 w-fit px-6 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold shadow transition-colors duration-200"
              type="button"
              onClick={addToFavorites}
            >
              Agregar a Favoritos
            </button>
          </div>
        </div>
      </section>
      {/* Sección de Temporadas */}
      {Array.isArray(serie.seasons) && serie.seasons.length > 0 && (
        <section className="container mx-auto lg:max-w-6xl px-5 pb-16 md:px-0 mt-12">
          <h2 className="text-2xl font-bold text-rose-800 mb-8 text-center">
            Temporadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {serie.seasons.map((season: any) => (
              <div
                key={season.id}
                className="group bg-white/90 hover:bg-rose-100 rounded-3xl shadow-2xl flex flex-col items-center p-0 hover:scale-[1.03] transition-all duration-200 border border-rose-200 cursor-pointer relative overflow-hidden"
              >
                <div className="relative w-full h-52 flex items-center justify-center overflow-hidden rounded-t-3xl">
                  {season.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                      alt={season.name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-t-3xl group-hover:scale-105 transition-all duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-rose-200 rounded-t-3xl text-rose-600 text-xs">
                      Sin imagen
                    </div>
                  )}
                  <span className="absolute top-3 right-3 bg-rose-600/90 text-white text-xs px-3 py-1 rounded-full shadow font-semibold tracking-wide">
                    {season.air_date?.slice(0, 4) ?? ""}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between w-full px-4 py-3">
                  <span className="text-base font-bold text-rose-700 text-center line-clamp-2 mb-1 w-full truncate group-hover:text-rose-900 transition-colors">
                    {season.name}
                  </span>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-xs text-gray-500 italic">
                      Episodios:{" "}
                      <span className="font-semibold text-rose-600">
                        {season.episode_count ?? "N/A"}
                      </span>
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 text-center mb-1">
                    {season.overview?.slice(0, 80)}
                    {season.overview && season.overview.length > 80
                      ? "..."
                      : ""}
                  </span>
                </div>
                <div className="w-full h-2 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-800 rounded-b-3xl" />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Tv;

