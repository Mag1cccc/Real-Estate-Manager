import { useState, useRef } from "react";
import styles from "./ImageUpload.module.css";

export const ImageUpload = ({ onImageChange }) => {
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSuccess, setImageSuccess] = useState("");

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImageError("✓ სურათი აუცილებელია");
      setImagePreview(null);
      setImageSuccess("");
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
      setImageSuccess("");
      return;
    }

    const maxFileSize = 1 * 1024 * 1024;
    if (file.size > maxFileSize) {
      setImageError("✓ ფაილის ზომა არ უნდა აღემატებოდეს 1 მბ");
      setImagePreview(null);
      setImageSuccess("");
      return;
    }

    setImageError("");
    setImageSuccess("✓ სურათი წარმატებით აიტვირთა");

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
    setImageSuccess("");
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

      <p
        className={`${styles.helperText} ${
          imageError ? styles.errorText : styles.validText
        }`}
      >
        {imageError || ""}
      </p>

      {imageSuccess && <p className={styles.successText}>{imageSuccess}</p>}
    </>
  );
};
