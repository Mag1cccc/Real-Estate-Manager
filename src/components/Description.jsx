import { useState } from "react";
import styles from "./Description.module.css";

export const Description = ({ description, onDescriptionChange }) => {
  const [descriptionError, setDescriptionError] = useState("");

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    if (value.trim().split(/\s+/).filter(Boolean).length < 5) {
      setDescriptionError("✓ მინიმუმ ხუთი სიტყვა");
    } else {
      setDescriptionError("");
    }

    onDescriptionChange(value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="description" className={styles.label}>
        აღწერა*
      </label>
      <textarea
        id="description"
        value={description}
        onChange={handleDescriptionChange}
        className={`${styles.textarea} ${
          descriptionError ? styles.errorInput : ""
        }`}
        required
      />
      <p
        className={`${styles.helperText} ${
          descriptionError
            ? styles.errorText
            : description.length > 0
            ? styles.validText
            : ""
        }`}
      >
        {descriptionError || "✓ მინიმუმ ხუთი სიტყვა"}
      </p>
    </div>
  );
};
