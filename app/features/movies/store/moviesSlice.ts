import type { StateCreator } from "zustand";
import type { MoviesApiResponse } from "../models/movies.model";
import useMoviesFetcher from "../hook/useMovies";

export interface MoviesState {
	upcomingMovies: MoviesApiResponse;
	setUpcomingMovies: (movies: MoviesApiResponse) => void;
}

export const createMoviesSlice: StateCreator<MoviesState> = (set, get) => ({
	upcomingMovies: [],
	setUpcomingMovies: (movies) => {
		set({ upcomingMovies: movies });
	},
});
