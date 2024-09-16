import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRegions = async () => {
  const response = await axios.get(
    "https://api.real-estate-manager.redberryinternship.ge/api/regions"
  );
  return response.data;
};

export const useRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegions,
  });
};
