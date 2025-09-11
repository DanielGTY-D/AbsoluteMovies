import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

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

interface UserInfo {
  email: string;
  favoriteContent: string;
  password: string;
  username: string;
  __v: 0;
  _id: string;
}

interface FavoriteItem {
  id: number;
  name: string;
  poster_path: string;
  type: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const favoriteContent =
    userInfo !== null && userInfo !== undefined
      ? JSON.parse(userInfo?.favoriteContent || "[]")
      : [];

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (!token) {
      navigate("/");
    }

    const rawUser = localStorage.getItem("USER_INFO");
    if (rawUser) {
      setUserInfo(JSON.parse(rawUser));
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
          Username:{" "}
          <span className="text-rose-800">
            {userInfo !== null ? userInfo?.username : ""}
          </span>
        </h2>
      </div>

      <div className="border-t-3 pt-5 border-t-rose-600">
        <h2 className="text-3xl font-bold text-center mb-8 text-rose-800">
          Tus favoritos
        </h2>
        {favoriteContent.length ? (
          <div className="flex flex-wrap">
            {favoriteContent.map((item: FavoriteItem) => (
              <div className="container basis-[200px]" key={item.id}>
                <div className="">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.name}
                    className="w-full md:w-[200px] h-[300px] rounded-lg object-cover shadow-xl border-4 border-rose-600 mx-auto"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-rose-700">
                    {item.name}
                  </h3>
                  <p className="text-rose-600">
                    Tipo: {item.type === "movie" ? "Película" : "Serie"}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
