import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const token = "9d065d29-08fb-4362-9a6a-735c85c68faa";

const deleteApartment = async (id) => {
  try {
    const response = await axios.delete(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete apartment"
    );
  }
};

export const useDeleteApartment = () => {
  return useMutation({
    mutationFn: deleteApartment,
  });
};
