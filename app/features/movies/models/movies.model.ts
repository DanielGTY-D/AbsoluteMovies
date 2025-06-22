import { z } from 'zod';
import type { MovieResponseSchema, MoviesResponseSchema, MoviesResponseWithPaginationSchema } from '../schemas/movies.schema';
import { MoviesResponseWithNameGenreSchema } from '../schemas/movies.schema';
import type { VideosApiResponse } from './videos.model';

export type MovieApiResponse = z.infer<typeof MovieResponseSchema>
export type MoviesApiResponse  = z.infer<typeof MoviesResponseSchema>
export type MoviesApiResponseWithPagination = z.infer<typeof MoviesResponseWithPaginationSchema>
export type MovieApiResponseWithNameGenre = z.infer<typeof MoviesResponseWithNameGenreSchema>;

export interface MovieApiResponseWithSimilarContent {
  movies: MovieApiResponseWithNameGenre;
  videos: VideosApiResponse;
  similarMovies: MoviesApiResponse;
}