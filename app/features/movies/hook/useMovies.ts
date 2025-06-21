import { moviesAPI } from "~/services/instanceAPI";
import {
	MoviesResponseSchema,
	MoviesResponseWithPaginationSchema,
} from "../schemas/movies.schema";
import type {
	MoviesApiResponse,
	MoviesApiResponseWithPagination,
} from "../models/movies.model";

const useMoviesFetcher = () => {
	const fetchUpcomingMovies = async (): Promise<MoviesApiResponse> => {
		try {
			const response = await moviesAPI(`/upcoming`);

			if (response.status === 200) {
				const result = MoviesResponseSchema.safeParse(response.data.results);
				if (result.success) {
					return result.data;
				}
				console.error("Failed to fetch movies:", response.statusText);
				return [] as MoviesApiResponse;
			}
			console.error("Failed to fetch upcoming movies:", response.statusText);
		} catch (error) {
			console.log("Error fetching movies:", error);
		}

		return [] as MoviesApiResponse;
	};

	// fetch movies by category
	const fetchMovies = async (
		category: string,
		page?: number | undefined
	): Promise<MoviesApiResponseWithPagination> => {
		try {
			const response = await moviesAPI(`/${category}`, {
				params: {
					...(page !== undefined ? { page } : {})
				},
			});
			if (response.status === 200) {
				const result = MoviesResponseWithPaginationSchema.safeParse(
					response.data
				);
				if (result.success) {
					return result.data;
				}
				console.error("Failed to fetch movies:", response.statusText);
				return {} as MoviesApiResponseWithPagination;
			}
		} catch (error) {
			console.log("Error fetching movies by category:", error);
		}

		return {} as MoviesApiResponseWithPagination;
	};

	return {
		fetchUpcomingMovies,
		fetchMovies,
	};
};

export default useMoviesFetcher;
