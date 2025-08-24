import "remixicon/fonts/remixicon.css";
import { Form, Link, Links } from "react-router";
import useAppStore from "~/store/appStore";
import { useState } from "react";
import Search from "~/features/search/Search";

function Header() {
  const [showDropdownMovie, setShowDropdownMovie] = useState(false);
  const [showDropdownSerie, setShowDropdownSerie] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(0);
  const upcomingMovies = useAppStore((state) => state.upcomingMovies);
  const imageBaseUrl = `https://image.tmdb.org/t/p/original${
    upcomingMovies[currentMovie]?.poster_path || ""
  }`;
  const isLogged = localStorage.getItem("AUTH_TOKEN");

  if (showDropdownMovie && showDropdownSerie) {
    setShowDropdownSerie(false);
  } else if (showDropdownSerie && showDropdownMovie) {
    setShowDropdownMovie(false);
  }

  return (
    <div
      style={{ backgroundImage: `url(\"${imageBaseUrl}\")` }}
      className='bg-no-repeat bg-cover bg-center w-full h-auto pb-20 relative overflow-hidden after:content-[""] after:bg-black after:w-full after:h-full after:block after:opacity-55 after:absolute after:top-0 after:left-0 after:z-10'
    >
      {/* {
        upcomingMovies.length && (
          upcomingMovies.map(movie => (
            <div key={movie.id} style={{ backgroundImage: `url(\"${imageBaseUrl}\")` }} className={`bg-no-repeat bg-cover bg-center w-full h-full absolute transition duration-300 after:content-[""] after:bg-black after:w-full after:h-full after:block after:opacity-75`}></div>
          ))
        )
      } */}
      <header className="container mx-auto xl:max-w-6xl z-50 relative bg-[rgba(0 0 0 0 / .2.5)] backdrop-blur-sm px-4 border-b-4 border-rose-600 rounded-b-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between py-5">
          <h1 className="text-balance text-rose-600 font-bold text-2xl md:text-4xl flex items-center gap-2">
            <i className="ri-film-fill text-4xl text-rose-600"></i>
            Absolute Movies
          </h1>

          <nav className="flex justify-center md:items-start flex-wrap gap-8 mt-5">
            <div className="relative group">
              <button
                className="cursor-pointer text-rose-600 flex items-center gap-2 text-lg font-semibold"
                onClick={() => setShowDropdownMovie(!showDropdownMovie)}
              >
                Movies
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <ul
                className={`absolute bg-rose-800 text-rose-100 rounded-lg overflow-hidden cursor-pointer transform group-hover:scale-100 ${
                  showDropdownMovie ? "scale-100" : "scale-0"
                } transition-transform duration-500 ease-in-out md:delay-300`}
              >
                <li className="text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300">
                  <Link to={"/watchlist/movie/popular"}>Populares</Link>
                </li>
                <li className="text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300">
                  <Link to={"/watchlist/movie/now_playing"}>En Cartelera</Link>
                </li>
                <li className="text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300">
                  <Link to={"/watchlist/movie/top_rated"}>Mejor Valoradas</Link>
                </li>
                <li className="text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300">
                  <Link to={"/watchlist/movie/premieres"}>Estrenos</Link>
                </li>
                <li className="text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300">
                  <Link to={"/watchlist/movie/list"}>Movies</Link>
                </li>
              </ul>
            </div>

            <div className="relative group">
              <button
                className="text-rose-600 cursor-pointer flex items-center gap-2 text-lg font-semibold"
                onClick={() => setShowDropdownSerie(!showDropdownSerie)}
              >
                Series
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <ul
                className={`absolute bg-rose-800 text-rose-100 rounded-lg overflow-hidden cursor-pointer transform group-hover:scale-100 ${
                  showDropdownSerie ? "scale-100" : "scale-0"
                } transition-transform duration-500 ease-in-out md:delay-300`}
              >
                <li className="text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300">
                  <Link to={"/watchlist/tv/popular"}>Populares</Link>
                </li>
                <li className="text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300">
                  <Link to={"/watchlist/tv/on_the_air"}>En Emision</Link>
                </li>
                <li className="text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300">
                  <Link to={"/watchlist/tv/top_rated"}>Mejor Valoradas</Link>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-2">
              {isLogged ? (
                <Link
                  to={"/admin/profile"}
                  className="text-rose-600 text-lg font-semibold flex items-center gap-2"
                >
                  <i className="ri-user-3-fill text-2xl text-rose-600"></i>
                  Perfil
                </Link>
              ) : (
                <div>
                  <Link
                    className="text-rose-600 text-lg font-semibold"
                    to={"/auth/login"}
                  >
                    log In
                  </Link>
                  <Link
                    className="text-rose-600 text-lg font-semibold"
                    to={"/auth/register"}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <Search />
          </nav>
        </div>
      </header>

      <div className="mt-10 md:mt-20 container mx-auto flex flex-wrap justify-between items-center md:max-w-6xl">
        <ul className="flex sm:flex-col mx-auto sm:mx-0 w-[458px] sm:w-fit h-auto sm:h-[457px] px-5 overflow-y-hidden sm:overflow-y-scroll overflow-x-scroll lg:overflow-x-hidden snap-mandatory z-40 relative gap-6 no-scrollbar snap-y scroll-smooth">
          {upcomingMovies.map((movie, index) => (
            <li
              key={movie.id}
              className="snap-center cursor-pointer group relative z-50"
              onClick={() => setCurrentMovie(index)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                className={`group-hover:transform group-hover:scale-105 transition-transform duration-300 max-w-[none] w-45 lg:w-34 h-auto lg:h-46 object-cover rounded-lg  ${
                  index !== currentMovie && "scale-75"
                }`}
              />
            </li>
          ))}
        </ul>

        {upcomingMovies.length > 0 && (
          <Link
            to={`movie/${upcomingMovies[currentMovie].id}`}
            className="sm:w-1/3 relative z-20 px-5 mt-10 lg:mt-0"
          >
            <h3 className="text-rose-600 text-4xl font-semibold mt-2 w-fit">
              {upcomingMovies[currentMovie].title}
            </h3>
            <p className="text-rose-100 text-base w-fit">
              <span className="text-rose-500 flex items-center">
                Up coming in{" "}
              </span>
              {upcomingMovies[currentMovie].release_date}{" "}
              <i className="ri-calendar-line"></i>
            </p>
            <p className="text-rose-100 text-base text-balance w-fit">
              {upcomingMovies[currentMovie].overview.slice(0, 200) + "..."}
            </p>
            <p className="text-rose-100 text-base mt-2 w-fit flex items-center gap-1">
              <span className="text-rose-500">Rating</span>{" "}
              {upcomingMovies[currentMovie].vote_average}
              <i className="ri-star-line"></i>
            </p>
            <p className="text-rose-100 text-base w-fit flex items-center gap-1">
              <span className="text-rose-500">Popularity</span>{" "}
              {upcomingMovies[currentMovie].popularity}{" "}
              <i className="ri-group-line"></i>
            </p>
            <p className="text-rose-100 text-base w-fit">
              <span className="text-rose-500">Language</span>{" "}
              {upcomingMovies[currentMovie].original_language}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
