import { seriesAPI } from "~/services/instanceAPI";
import type { TvSeriesApiResponseWithPagination } from "../models";
import {
	TvSerieResponseByIdSchema,
	TvSeriesResponseWithPaginationSchema,
} from "../schemas";
import type { TvSerieApiResponseById } from "../models/tvSeries.model";

const useApiFetcher = () => {
	const fetchTvSeries = async (
		category: string,
		page: number | undefined = 1
	): Promise<TvSeriesApiResponseWithPagination> => {
		try {
			const response = await seriesAPI(`/${category && category}`, {
				params: {
					...(page !== undefined ? { page } : {}),
				},
			});
			if (response.status === 200) {
				const result = TvSeriesResponseWithPaginationSchema.safeParse(
					response.data
				);
				if (result.success) {
					return result.data;
				}
				console.error("Failed to parse TV series response:", result.error);
			} else {
				console.error("Failed to fetch TV series:", response.statusText);
			}
		} catch (error) {
			console.error("Error fetching TV series:", error);
		}

		return {} as TvSeriesApiResponseWithPagination; // Return an empty array if the fetch fails
	};

	const fetchTvSeriesById = async (id: number) : Promise<TvSerieApiResponseById> => {
		try {
			const response = await seriesAPI(`/${id}`);
			const SeasonResponse = await fetchTvSeasonSeriesById(id, 1);

			if (response.status === 200) {
				const result = TvSerieResponseByIdSchema.safeParse(response.data);
				if (result.success) {
					return result.data;
				}
				console.error("Failed to parse TV series by ID response:", result.error);
			} else {
				console.error("Failed to fetch TV series by ID:", response.statusText);
			}
		} catch (error) {
			console.error("Error fetching TV series by ID:", error);
		}

		return {} as TvSerieApiResponseById; // Return an empty object if the fetch fails
	};

	const fetchTvSeasonSeriesById = async (
		id: number,
		seasonNumber: number
	) => {
		try {
			const response = await seriesAPI(`/${id}/season/${seasonNumber}`);
			if (response.status === 200) {
				const result = TvSerieResponseByIdSchema.safeParse(response.data);
				if (result.success) {
					return result.data;
				}
			}
		} catch (error) {
			console.error("Error fetching TV series season by ID:", error);
		}

		
	};

	return {
		fetchTvSeries,
		fetchTvSeriesById,
	};
};

export default useApiFetcher;
