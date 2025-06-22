import {z} from "zod";

export const VideoResponseSchema = z.object({
  name: z.string(),
  key: z.string(),
  type: z.string(),
});

export const VideosResponseSchema = z.array(VideoResponseSchema);