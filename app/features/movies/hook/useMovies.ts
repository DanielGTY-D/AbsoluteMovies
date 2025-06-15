import { moviesAPI } from "~/services/instanceAPI"
import { upcomingMoviesAPISchema } from "../schemas/movies.schema";
import type { upcomingMoviesAPIResponse } from "../models/movies";

const useMoviesFetcher = () => {
  const fetchUpcomingMovies = async () : Promise<upcomingMoviesAPIResponse> => {
    try {
       const response = await moviesAPI(`/upcoming`)
       if(response.status !== 200) {
          console.error("Failed to fetch movies:", response.statusText);
       }

       const result = upcomingMoviesAPISchema.safeParse(response.data.results);
        if (!result.success) {
            console.error("Invalid data format:", result.error);
            return [] as upcomingMoviesAPIResponse;
        }
        return result.data
        // setUpcomingMovies(result.data.results);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }

    return [] as upcomingMoviesAPIResponse;
  }

  return {
    fetchUpcomingMovies
  }
}

export default useMoviesFetcher;