import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createMoviesSlice,
  type MoviesState,
} from "~/features/movies/store/moviesSlice";
import {
  UserSlice,
  type UserState,
} from "~/features/series/login/store/UserSlice";

const useAppStore = create<MoviesState & UserState>()(
  devtools((...a) => ({
    ...createMoviesSlice(...a),
    ...UserSlice(...a),
  }))
);

export default useAppStore;

