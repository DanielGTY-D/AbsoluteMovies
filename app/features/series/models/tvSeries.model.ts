import {z} from "zod";
import { TvSerieResponseSchema, TvSeriesReseponseSchema, TvSerieResponseByIdSchema, TvSeriesResponseWithPaginationSchema } from "~/features/series/schemas/";

export type TvSerieApiResponse = z.infer<typeof TvSerieResponseSchema>;
export type TvSeriesApiResponse = z.infer<typeof TvSeriesReseponseSchema>;
export type TvSeriesApiResponseWithPagination = z.infer<typeof TvSeriesResponseWithPaginationSchema>;
export type TvSerieApiResponseById = z.infer<typeof TvSerieResponseByIdSchema>;