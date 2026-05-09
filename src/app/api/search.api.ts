import api from "@/lib/service";

export const searchProducts = async (query: string) => {
  try {
    const response = await api.get(`/api/Search`, {
      params: {
        query: query 
      }
    });

    return response.data;
  } catch (error) {
    console.error("Search API Error:", error);
    throw error;
  }
};