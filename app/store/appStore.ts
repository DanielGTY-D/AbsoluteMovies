import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createMoviesSlice, type MoviesState } from '~/features/movies/store/moviesSlice';

const useAppStore = create<MoviesState>()(devtools((...a) => ({
  ...createMoviesSlice(...a),
})))


export default useAppStore;