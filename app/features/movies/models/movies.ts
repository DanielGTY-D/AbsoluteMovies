import { z } from 'zod';
import type { upcomingMovieAPISchema, upcomingMoviesAPISchema } from '../schemas/movies.schema';

export type upcomingMovieAPIResponse = z.infer<typeof upcomingMovieAPISchema>
export type upcomingMoviesAPIResponse = z.infer<typeof upcomingMoviesAPISchema>