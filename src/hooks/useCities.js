import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCities = async (regionId) => {
  if (!regionId) return []; // Return empty array if no region selected

  try {
    const response = await axios.get(
      `https://api.real-estate-manager.redberryinternship.ge/api/cities`
    );
    // Filter cities by regionId
    return response.data.filter(
      (city) => city.region_id === parseInt(regionId)
    );
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Failed to fetch cities");
  }
};

export const useCities = (regionId) => {
  return useQuery({
    queryKey: ["cities", regionId],
    queryFn: () => fetchCities(regionId),
    enabled: !!regionId, // Only fetch cities if a region is selected
    onError: (error) => {
      console.error("Error fetching cities:", error);
      // Handle error or show message to the user
    },
  });
};
