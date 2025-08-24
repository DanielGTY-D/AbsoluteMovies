import { api } from "~/services/instanceAPI";

const useFavoriteContent = () => {
  const addFavoriteContent = async (
    newFavoriteContent: any,
    username: string
  ) => {
    const toStringigiedData = JSON.stringify(newFavoriteContent);

    try {
      const response = await api.post(`/favorite-content/add/${username}`, {
        data: toStringigiedData,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error updating favorite content", error);
    }
  };

  return {
    addFavoriteContent,
  };
};

export default useFavoriteContent;
