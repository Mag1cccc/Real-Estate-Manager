import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const API_URL =
  "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";

export const useAddListing = () => {
  return useMutation(
    async (formData) => {
      const response = await axios.post(`${API_URL}/add-listing`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer 9d065d29-08fb-4362-9a6a-735c85c68faa`,
        },
      });
      return response.data;
    },
    {
      onError: (error) => {
        console.error("Error adding listing:", error);
      },
      onSuccess: (data) => {
        console.log("Listing added successfully:", data);
      },
    }
  );
};
