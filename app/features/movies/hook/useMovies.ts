import { moviesAPI } from "~/services/instanceAPI";
import { MoviesResponseSchema } from "../schemas/movies.schema";
import type { MoviesApiResponse } from "../models/movies.model";

const useMoviesFetcher = () => {
	const fetchUpcomingMovies = async (): Promise<MoviesApiResponse> => {
		try {
			const response = await moviesAPI(`/upcoming`);
			if (response.status !== 200) {
				console.error("Failed to fetch movies:", response.statusText);
				return [] as MoviesApiResponse;
			}

			const result = MoviesResponseSchema.safeParse(response.data.results);
			if (!result.success) {
				console.error("Invalid data format:", result.error);
				return [] as MoviesApiResponse;
			}
			return result.data;
			// setUpcomingMovies(result.data.results);
		} catch (error) {
			console.log("Error fetching movies:", error);
		}

		return [] as MoviesApiResponse;
	};

	// fetch movies by category
	const fetchMovies = async (category: MoviesSection["category"]) : Promise<MoviesApiResponse> => {
		try {
			const response = await moviesAPI(`/${category}`);
			if (response.status !== 200) {
				console.error("Failed to fetch movies by category:", response.statusText);
				return [];
			}
			const result = MoviesResponseSchema.safeParse(response.data.results);
			if (!result.success) {
				console.error("Invalid data format for category:", result.error);
				return [];
			}
			return result.data;
		} catch (error) {
			console.log("Error fetching movies by category:", error);
		}

		return [];
	};

	return {
		fetchUpcomingMovies,
		fetchMovies,
	};
};

export default useMoviesFetcher;
