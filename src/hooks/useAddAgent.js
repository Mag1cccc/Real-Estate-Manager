import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddAgent = () => {
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        formData,
        {
          headers: {
            Authorization: "Bearer 9d065d29-08fb-4362-9a6a-735c85c68faa",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Error adding agent:", error);
    },
  });

  return mutation;
};
