import { z } from "zod";

export const TvSerieResponseSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  first_air_date: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const TvSerieResponseByIdSchema = z.object({
  id: z.number(),
  adult: z.boolean(),
  created_by: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  episode_run_time: z.array(z.number()),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  homepage: z.string().nullable(),
  name: z.string(),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  seasons: z.array(
    z.object({
      air_date: z.string().nullable(),
      episode_count: z.number(),
      id: z.number(),
      name: z.string(),
      overview: z.string(),
      poster_path: z.string().nullable(),
      season_number: z.number(),
    })
  ),
  tagline: z.string().nullable(),
});

export const TvSeriesReseponseSchema = z.array(TvSerieResponseSchema);

export const TvSeriesResponseWithPaginationSchema = z.object({
  page: z.number(),
  results: TvSeriesReseponseSchema,
  total_pages: z.number(),
  total_results: z.number(),
});

