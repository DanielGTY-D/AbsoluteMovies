import { create } from 'zustand';
import { createMoviesSlice, type MoviesState } from '~/features/movies/store/moviesSlice';

const useAppStore = create<MoviesState>((...a) => ({
  ...createMoviesSlice(...a),
}))


export default useAppStore;