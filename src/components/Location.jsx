import { useState } from "react";
import styles from "./Location.module.css";

export const Location = ({
  address,
  onAddressChange,
  postalCode,
  onPostalCodeChange,
}) => {
  const [addressError, setAddressError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");

  const validateAddress = (value) => {
    if (value.length < 2) {
      setAddressError("✓ მინიმუმ ორი სიმბოლო");
      return false;
    } else {
      setAddressError("");
      return true;
    }
  };

  const validatePostalCode = (value) => {
    if (!/^\d{4,5}$/.test(value)) {
      setPostalCodeError("✓ უნდა იყოს 4 ან 5 მხოლოდ რიცხვები");
      return false;
    } else {
      setPostalCodeError("");
      return true;
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    onAddressChange(value);
    validateAddress(value);
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    onPostalCodeChange(value);
    validatePostalCode(value);
  };
  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="address" className={styles.label}>
          მისამართი *
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          className={`${styles.input} ${addressError ? styles.errorInput : ""}`}
          required
          minLength={2}
        />
        <p
          className={`${styles.helperText} ${
            addressError
              ? styles.errorText
              : address.length > 0
              ? styles.validText
              : ""
          }`}
        >
          {addressError ||
            (address.length === 0
              ? "✓ მინიმუმ ორი სიმბოლო"
              : "✓ მინიმუმ ორი სიმბოლო")}
        </p>
      </div>
      <div>
        <label htmlFor="postalCode" className={styles.label}>
          საფოსტო ინდექსი *
        </label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={handlePostalCodeChange}
          className={`${styles.input} ${
            postalCodeError ? styles.errorInput : ""
          }`}
          required
          pattern="\d*"
        />
        <p
          className={`${styles.helperText} ${
            postalCodeError
              ? styles.errorText
              : postalCode.length > 0
              ? styles.validText
              : ""
          }`}
        >
          {postalCodeError ||
            (postalCode.length === 0
              ? "✓ უნდა იყოს 4 ან 5 ნიშნა მხოლოდ რიცხვები"
              : "✓ უნდა იყოს 4 ან 5 ნიშნა მხოლოდ რიცხვები")}
        </p>
      </div>
    </div>
  );
};
