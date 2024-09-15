import styles from "./RegionSelect.module.css";

export const RegionSelect = ({ regions, selectedRegion, onRegionChange }) => {
  return (
    <div>
      <label htmlFor="region" className={styles.label}>
        რეგიონი *
      </label>
      <select
        id="region"
        value={selectedRegion}
        onChange={onRegionChange}
        required
        className={styles.select}
      >
        <option value="">აირჩიეთ რეგიონი</option>
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>
    </div>
  );
};
