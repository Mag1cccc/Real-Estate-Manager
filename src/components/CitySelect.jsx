import { useCities } from "../hooks/useCities";
import styles from "./CitySelect.module.css";

export const CitySelect = ({
  regionId,
  cities,
  selectedCity,
  onCityChange,
}) => {
  return (
    <div>
      <label htmlFor="city" className={styles.label}>
        ქალაქი *
      </label>
      <select
        id="city"
        value={selectedCity}
        onChange={onCityChange}
        disabled={!regionId}
        className={styles.select}
      >
        <option value="">აირჩიეთ ქალაქი</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};
