import { useState, useEffect } from "react";

export const usePersistedForm = (key, initialData) => {
  const [formData, setFormData] = useState(() => {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : initialData;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, formData]);

  const clearFormData = () => {
    try {
      localStorage.removeItem(key);
      setFormData(initialData);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return [formData, setFormData, clearFormData];
};
