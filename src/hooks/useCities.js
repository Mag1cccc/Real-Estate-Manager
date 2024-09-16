import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCities = async (regionId) => {
  if (!regionId) return [];

  try {
    const response = await axios.get(
      `https://api.real-estate-manager.redberryinternship.ge/api/cities`
    );

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
    enabled: !!regionId,
    onError: (error) => {
      console.error("Error fetching cities:", error);
    },
  });
};
