import type { MoviesApiResponseWithPagination } from "~/features/movies/models";
import { MoviesResponseWithPaginationSchema } from "~/features/movies/schemas/movies.schema";
import { InstanceAPI } from "~/services/instanceAPI";

const useDataFetcher = () => {
  const searchDataFetcher = async (
    query: string,
    page: string
  ): Promise<MoviesApiResponseWithPagination> => {
    try {
      const response = await InstanceAPI(`/search/movie`, {
        params: {
          page,
          query,
        },
      });
      if (response.status === 200) {
        const result = MoviesResponseWithPaginationSchema.safeParse(
          response.data
        );
        if (result.success) {
          return result.data;
        }
        return {} as MoviesApiResponseWithPagination;
        console.log("cannot parse data");
      }
      console.error(`failed while fetch data of your search `);
    } catch (error) {
      console.log(`Cannot get data of api ${error}`);
    }

    return {} as MoviesApiResponseWithPagination;
  };

  return {
    searchDataFetcher,
  };
};

export default useDataFetcher;
