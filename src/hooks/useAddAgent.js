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
            Authorization: "Bearer 9d01b5b6-9107-4551-87ae-127927ac31b3",
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
