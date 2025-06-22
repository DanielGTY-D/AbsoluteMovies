
import type { z } from "zod";
import { VideoResponseSchema, VideosResponseSchema } from "../schemas/videos.schema";

export type VideoApiResponse = z.infer<typeof VideoResponseSchema>;
export type VideosApiResponse = z.infer<typeof VideosResponseSchema>;