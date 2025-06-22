import {z} from "zod";
import { GenreSchema } from "~/schemas/shared/genres.schema";

export const MovieResponseSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()).nullable(),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

export const MoviesResponseWithNameGenreSchema = MovieResponseSchema.extend({
  genres: GenreSchema.array().nullable(),
  tagline: z.string().nullable(),
  video: z.boolean().optional(),
}).omit({genre_ids: true,})

export const MoviesResponseSchema = z.array(MovieResponseSchema);

export const MoviesResponseWithPaginationSchema = z.object({
  results: MoviesResponseSchema,
  total_pages: z.number(),
  page: z.number(),
})