import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./Input.module.css";

export const TextInput = ({
  label,
  value,
  onChange,
  name,
  required,
  minLength,
  pattern,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (isTouched || value.length > 0) {
      validate();
    }
  }, [value, isTouched]);

  const validate = () => {
    if (required) {
      if (
        value.length < minLength ||
        (pattern && !new RegExp(pattern).test(value))
      ) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    validate();
  };

  const handleChange = (e) => {
    onChange(e);
    if (isTouched) {
      validate();
    }
  };

  const validationMessage = `✓ მინიმუმ  ${minLength} სიმბოლო`;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        className={`${styles.textInput} ${
          !isValid && isTouched ? styles.invalid : ""
        }`}
        value={value}
        onChange={handleChange}
        name={name}
        onBlur={handleBlur}
        required={required}
      />
      <div
        className={`${styles.validationMessage} ${
          !isValid && isTouched
            ? styles.invalidMessage
            : isValid && value.length > 0
            ? styles.validMessage
            : ""
        }`}
      >
        {value.length === 0 && !isTouched
          ? `✓ მინიმუმ  ${minLength} სიმბოლო`
          : !isValid
          ? validationMessage
          : isValid && value.length > 0
          ? `✓ მინიმუმ  ${minLength} სიმბოლო`
          : ""}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  minLength: PropTypes.number.isRequired,
  pattern: PropTypes.string,
};

TextInput.defaultProps = {
  value: "",
  required: false,
  pattern: "",
};
