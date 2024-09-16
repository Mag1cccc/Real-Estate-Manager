import PropTypes from "prop-types";
import { useState, useRef } from "react";
import styles from "./Input.module.css";

export const FileUpload = ({ label, onChange, required, allowedFormats }) => {
  const [fileName, setFileName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const fileExtension = file.name.split(".").pop();
      if (allowedFormats.includes(fileExtension)) {
        setIsValid(true);
        setErrorMessage("ფოტო ატვირთულია");
      } else {
        setIsValid(false);
        setErrorMessage(
          `ატვირთული ფოტო უნდა იყოს ერთ-ერთი შემდეგი ფორმატიდან: ${allowedFormats.join(
            ", "
          )}`
        );
      }
    } else {
      setFileName("");
      setIsValid(true);
      setErrorMessage("");
    }
    onChange(e);
  };

  return (
    <div className={styles.fileUploadContainer}>
      <label className={styles.label}>{label}</label>
      <div
        className={`${styles.fileUploadWrapper} ${
          !isValid && fileName
            ? styles.invalid
            : isValid && fileName
            ? styles.valid
            : ""
        }`}
        onClick={handleClick}
      >
        <input
          type="file"
          onChange={handleFileChange}
          required={required}
          className={styles.fileInput}
          ref={fileInputRef}
        />
        <div className={styles.fileIcon}></div>
      </div>
      <p
        className={`${styles.validationMessage} ${
          !isValid && fileName
            ? styles.invalidMessage
            : isValid && fileName
            ? styles.validMessage
            : ""
        }`}
      >
        {errorMessage || (required && !fileName ? "ატვირთეთ ფოტო" : "")}
      </p>
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  allowedFormats: PropTypes.arrayOf(PropTypes.string),
};

FileUpload.defaultProps = {
  required: false,
  allowedFormats: ["jpg", "jpeg", "png", "webp", "svg", "gif"],
};
