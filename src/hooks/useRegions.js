// src/hooks/useRegions.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRegions = async () => {
  const response = await axios.get(
    "https://api.real-estate-manager.redberryinternship.ge/api/regions"
  );
  return response.data; // Adjust this line if the data structure is different
};

export const useRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegions,
  });
};
