import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const token = "9d065d29-08fb-4362-9a6a-735c85c68faa";

const fetchAgents = async () => {
  const response = await axios.get(
    "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export const useAgents = () => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
