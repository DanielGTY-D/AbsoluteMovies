import { InstanceAPI } from "~/services/instanceAPI";

const useDataFetcher = () => {
  const searchDataFetcher = async (query: string) => {
    try {
      const response = await InstanceAPI(`search/movie/query${query}`);
      if (response.status === 200) {
        console.log(response.data);
      }
      console.error(`failed while fetch data of your search`);
    } catch (error) {
      console.log(`Cannot get data of api `);
    }
  };

  return {
    searchDataFetcher,
  };
};

export default useDataFetcher;
