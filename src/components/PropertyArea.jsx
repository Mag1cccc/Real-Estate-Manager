import { useState } from "react";
import styles from "./PropertyArea.module.css";

export const PropertyArea = ({ area, onAreaChange }) => {
  const [touched, setTouched] = useState(false);

  const handleAreaChange = (e) => {
    const value = e.target.value;

    if (!touched) {
      setTouched(true);
    }

    if (!value) {
      onAreaChange(value);
      return;
    } else if (!/^\d*$/.test(value)) {
      onAreaChange(value);
      return;
    }

    onAreaChange(value);
  };

  const isValid = /^\d*$/.test(area) && area !== "";
  const showError = touched && !isValid;

  return (
    <div>
      <label htmlFor="area" className={styles.label}>
        ფართობი
      </label>
      <input
        type="text"
        id="area"
        value={area}
        onChange={handleAreaChange}
        className={`${styles.input} ${
          showError ? styles.errorInput : isValid ? styles.validInput : ""
        }`}
        onBlur={() => setTouched(true)}
      />
      <p
        className={`${styles.helperText} ${
          showError ? styles.errorText : isValid ? styles.validText : ""
        }`}
      >
        {showError ? "✓ მხოლოდ რიცხვები" : "✓ მხოლოდ რიცხვები"}
      </p>
    </div>
  );
};
