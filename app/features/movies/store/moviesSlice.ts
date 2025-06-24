import type { StateCreator } from "zustand";
import type { MoviesApiResponse } from "../models/movies.model";

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
