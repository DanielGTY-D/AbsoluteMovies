import type { StateCreator } from "zustand";
import type { upcomingMoviesAPIResponse } from "../models/movies";
import useMoviesFetcher from "../hook/useMovies";


export interface MoviesState {
  upcomingMovies: upcomingMoviesAPIResponse;
  setUpcomingMovies: (movies: upcomingMoviesAPIResponse) => void;
}

export const createMoviesSlice: StateCreator<MoviesState> = (set, get) => ({
  upcomingMovies: [],
  setUpcomingMovies: (movies) => {
    set({ upcomingMovies: movies });
  }
})