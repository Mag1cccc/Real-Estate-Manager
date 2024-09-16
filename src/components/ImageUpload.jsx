import { useState, useRef } from "react";
import styles from "./ImageUpload.module.css";

export const ImageUpload = ({ onImageChange }) => {
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSuccess, setImageSuccess] = useState(""); // New state for success message

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImageError("✓ სურათი აუცილებელია");
      setImagePreview(null);
      setImageSuccess(""); // Clear success message if there's no file
      return;
    }

    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.type)) {
      setImageError(
        "✓ დასაშვებია მხოლოდ გამოსახულების ფაილები (JPEG, PNG, GIF, WEBP)."
      );
      setImagePreview(null);
      setImageSuccess(""); // Clear success message if there's an error
      return;
    }

    const maxFileSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxFileSize) {
      setImageError("✓ ფაილის ზომა არ უნდა აღემატებოდეს 1 მბ");
      setImagePreview(null);
      setImageSuccess(""); // Clear success message if there's an error
      return;
    }

    // Clear error and set success message
    setImageError("");
    setImageSuccess("✓ სურათი წარმატებით აიტვირთა"); // Set success message

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    onImageChange(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = "";
    setImageError("✓ სურათი აუცილებელია");
    setImageSuccess(""); // Clear success message on delete
    onImageChange(null);
  };

  return (
    <>
      <label htmlFor="image" className={styles.label}>
        ატვირთეთ ფოტო *
      </label>
      <div className={styles.fileUploadWrapper} onClick={handleClick}>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className={`${styles.input} ${imageError ? styles.errorInput : ""}`}
          required
        />

        {!imagePreview && <div className={styles.fileIcon}></div>}

        {imagePreview && (
          <div className={styles.imagePreviewWrapper}>
            <img
              src={imagePreview}
              alt="Preview"
              className={styles.imagePreview}
            />

            <div
              className={styles.deleteIcon}
              onClick={handleDeleteImage}
            ></div>
          </div>
        )}
      </div>

      {/* Error message */}
      <p
        className={`${styles.helperText} ${
          imageError ? styles.errorText : styles.validText
        }`}
      >
        {imageError || ""}
      </p>

      {/* Success message */}
      {imageSuccess && (
        <p className={styles.successText}>{imageSuccess}</p> // Show success message in green
      )}
    </>
  );
};
