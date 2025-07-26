import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { MoviesCard } from "~/features/movies/components";
import useAppStore from "~/store/appStore";

type ListToSeeLater = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const Profile = () => {
  const navigate = useNavigate();
  const userInfo = useAppStore((state) => state.user);

  const listToSeeLater: ListToSeeLater[] = JSON.parse(userInfo.animesFav);

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <header className="bg-rose-800 py-5 px-2.5">
        <div className="container mx-auto lg:max-w-6xl flex items-end justify-between">
          <div className="flex items-center gap-4">
            <i className="ri-film-fill text-6xl text-rose-50"></i>
            <Link to={`/`}>
              <h1 className="text-3xl xl:text-6xl font-bold text-rose-50 capitalize">
                Absolute Movies
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto lg:max-w-6xl flex items-center justify-between py-5 px-2.5">
        <div>
          <img
            className="w-40 h-40"
            src="https://images.unsplash.com/photo-1708034677699-6f39d9c59f6e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile image"
          />
        </div>
        <h2 className="text-2xl font-semibold">
          Username: <span className="text-rose-800">{userInfo.username}</span>
        </h2>
      </div>

      <div className="border-t-3 pt-5 border-t-rose-600">
        {listToSeeLater.length ? (
          listToSeeLater.map((item) => (
            <MoviesCard
              data={item}
              slug="movies"
              type="horizontal"
              key={item.id}
            />
          ))
        ) : (
          <p className="text-center font-semibold uppercase text-2xl text-rose-700">
            Comiena agregando tus titulos favoritos para no perderlos
          </p>
        )}
      </div>
    </>
  );
};
export default Profile;
