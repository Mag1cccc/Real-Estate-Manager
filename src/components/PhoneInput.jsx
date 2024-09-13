import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./Input.module.css";

export const PhoneInput = ({
  label,
  value,
  onChange,
  name,
  required,
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
      if (pattern && !new RegExp(pattern).test(value)) {
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

  const validationMessage = `✓ იწყება 5-ით და შემდეგ გრძელდება 8 ციფრით`;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        className={`${styles.phoneInput} ${
          !isValid && isTouched ? styles.invalid : ""
        } ${isValid && isTouched ? styles.valid : ""}`}
        value={value}
        onChange={handleChange}
        name={name}
        onBlur={handleBlur}
        required={required}
        pattern={pattern}
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
          ? `✓ იწყება 5-ით და შემდეგ გრძელდება 8 ციფრით`
          : !isValid
          ? validationMessage
          : isValid && value.length > 0
          ? `ვალიდურია`
          : ""}
      </div>
    </div>
  );
};

PhoneInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  pattern: PropTypes.string,
};

PhoneInput.defaultProps = {
  value: "",
  required: false,
  pattern: "",
};
