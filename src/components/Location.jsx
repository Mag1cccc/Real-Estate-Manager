import { useState, useEffect } from "react";
import styles from "./Location.module.css";
import { useRegions } from "../hooks/useRegions";
import { useCities } from "../hooks/useCities";
import { RegionSelect } from "./RegionSelect";
import { CitySelect } from "./CitySelect";

export const Location = ({
  address,
  onAddressChange,
  postalCode,
  onPostalCodeChange,
}) => {
  const [addressError, setAddressError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");

  const {
    data: regions,
    isLoading: regionsLoading,
    error: regionsError,
  } = useRegions();

  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useCities(selectedRegion);

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

  const handleRegionChange = (event) => {
    const regionId = event.target.value;
    setSelectedRegion(regionId);
    setSelectedRegionId(regionId); // Update selectedRegionId
    setSelectedCity(""); // Clear city selection when region changes
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    console.log("Selected Region ID:", selectedRegionId);
  }, [selectedRegionId]);

  if (regionsLoading || citiesLoading) return <div>Loading...</div>;
  if (regionsError)
    return <div>Error fetching regions: {regionsError.message}</div>;
  if (citiesError)
    return <div>Error fetching cities: {citiesError.message}</div>;

  if (regionsLoading || citiesLoading) return <div>Loading...</div>;
  if (regionsError)
    return <div>Error fetching regions: {regionsError.message}</div>;
  if (citiesError)
    return <div>Error fetching cities: {citiesError.message}</div>;
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div>
          <label htmlFor="address" className={styles.label}>
            მისამართი *
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            className={`${styles.input} ${
              addressError ? styles.errorInput : ""
            }`}
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
      <div className={styles.inputContainer}>
        <RegionSelect
          regions={regions}
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
        />

        {selectedRegion && (
          <CitySelect
            regionId={selectedRegion}
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
        )}
      </div>
    </div>
  );
};
