import { z } from 'zod';
import type { MovieResponseSchema, MoviesResponseSchema } from '../schemas/movies.schema';

export type MovieApiResponse = z.infer<typeof MovieResponseSchema>
export type MoviesApiResponse  = z.infer<typeof MoviesResponseSchema>