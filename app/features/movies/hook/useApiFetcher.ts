import { moviesAPI } from "~/services/instanceAPI";
import {
	MoviesResponseSchema,
	MoviesResponseWithNameGenreSchema,
	MoviesResponseWithPaginationSchema,
} from "../schemas/movies.schema";
import type {
	MovieApiResponseWithNameGenre,
	MovieApiResponseWithSimilarContent,
	MoviesApiResponse,
	MoviesApiResponseWithPagination,
} from "../models/movies.model";
import type { VideosApiResponse } from "../models/videos.model";
import { VideosResponseSchema } from "../schemas/videos.schema";

const useApiFetcher = () => {
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
					...(page !== undefined ? { page } : {}),
				},
			});
			if (response.status === 200) {
				const result = MoviesResponseWithPaginationSchema.safeParse(response.data);
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

	const fetchMoviesById = async (
		id: number
	): Promise<MovieApiResponseWithSimilarContent> => {
		try {
			const response = await moviesAPI(`/${id}`);
			const videosResponse = await fetchVideosbyId(id, 6);
			const similarMoviesResponse = await fetchSimilarMovies(id);

			if (response.status === 200) {
				const result = MoviesResponseWithNameGenreSchema.safeParse(response.data);
				if (result.success) {
					return {
						movies: result.data,
						videos: videosResponse,
						similarMovies: similarMoviesResponse,
					};
				}
				console.error("Failed to parse:", result.error);
				return {} as MovieApiResponseWithSimilarContent;
			}
			console.error("Failed to fetch movies:", response.statusText);
		} catch (error) {
			console.log("Error fetching movies by category:", error);
		}

		return {} as MovieApiResponseWithSimilarContent;
	};

	const fetchVideosbyId = async (
		id: number,
		limit: number
	): Promise<VideosApiResponse> => {
		try {
			const response = await moviesAPI(`/${id}/videos`);
			if (response.status === 200) {
				const result = VideosResponseSchema.safeParse(response.data.results);
				if (result.success) {
					// Limitar a 6 videos desde la petición
					return result.data.slice(0, limit);
				}
				console.error("Failed to parse videos:", result.error);
				return [] as VideosApiResponse;
			}
		} catch (error) {
			console.log("Error fetching videos by ID:", error);
		}

		return [] as VideosApiResponse;
	};

	const fetchSimilarMovies = async (id: number): Promise<MoviesApiResponse> => {
		try {
			const response = await moviesAPI(`/${id}/similar`);
			if (response.status === 200) {
				const result = MoviesResponseSchema.safeParse(response.data.results);
				if (result.success) {
					return result.data;
				}
				console.error("Failed to parse similar movies:", result.error);
				return [] as MoviesApiResponse;
			}
			console.error("Failed to fetch similar movies:", response.statusText);
		} catch (error) {
			console.log("Error fetching similar movies:", error);
		}
		return [] as MoviesApiResponse;
	};

	return {
		fetchUpcomingMovies,
		fetchMovies,
		fetchMoviesById,
	};
};

export default useApiFetcher;
