import { useState } from "react";
import styles from "./NumberOfBedrooms.module.css";

export const NumberOfBedrooms = ({ bedrooms, onBedroomsChange }) => {
  const [bedroomsError, setBedroomsError] = useState("");

  const handleBedroomsChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setBedroomsError("✓ მხოლოდ რიცხვები");
    } else if (!/^\d+$/.test(value)) {
      setBedroomsError("✓მხოლოდ რიცხვები");
    } else if (parseInt(value, 10) < 1) {
      setBedroomsError("✓ მხოლოდ რიცხვები");
    } else {
      setBedroomsError("");
    }

    onBedroomsChange(value);
  };

  return (
    <div>
      <label htmlFor="bedrooms" className={styles.label}>
        საძინებლების რაოდენობა*
      </label>
      <input
        type="text"
        id="bedrooms"
        value={bedrooms}
        onChange={handleBedroomsChange}
        required
        className={`${styles.input} ${bedroomsError ? styles.errorInput : ""}`}
      />
      <p
        className={`${styles.helperText} ${
          bedroomsError ? styles.errorText : bedrooms ? styles.validText : ""
        }`}
      >
        {bedroomsError ||
          (bedrooms ? "✓ მხოლოდ რიცხვები" : "✓ მხოლოდ რიცხვები")}
      </p>
    </div>
  );
};
