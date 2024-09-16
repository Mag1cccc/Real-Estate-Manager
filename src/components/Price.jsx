import { useState } from "react";
import styles from "./Price.module.css";

export const Price = ({ price, onPriceChange }) => {
  const [priceError, setPriceError] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePriceChange = (e) => {
    const value = e.target.value;

    if (!hasInteracted) setHasInteracted(true);

    if (value === "") {
      setPriceError("✓ მხოლოდ რიცხვები");
    } else if (!/^\d*$/.test(value)) {
      setPriceError("✓ მხოლოდ რიცხვები");
    } else {
      setPriceError("");
    }

    onPriceChange(value);
  };

  return (
    <div>
      <label htmlFor="price" className={styles.label}>
        ფასი
      </label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={handlePriceChange}
        required
        className={`${styles.input} ${
          priceError && hasInteracted ? styles.errorInput : ""
        }`}
      />
      <p
        className={`${styles.helperText} ${
          hasInteracted
            ? priceError
              ? styles.errorText
              : styles.validText
            : ""
        }`}
      >
        {hasInteracted && priceError ? priceError : "✓ მხოლოდ რიცხვები"}
      </p>
    </div>
  );
};
