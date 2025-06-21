import { z } from 'zod';
import type { MovieResponseSchema, MoviesResponseSchema, MoviesResponseWithPaginationSchema } from '../schemas/movies.schema';

export type MovieApiResponse = z.infer<typeof MovieResponseSchema>
export type MoviesApiResponse  = z.infer<typeof MoviesResponseSchema>
export type MoviesApiResponseWithPagination = z.infer<typeof MoviesResponseWithPaginationSchema>