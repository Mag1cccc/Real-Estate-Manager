import styles from "./ForSaleRent.module.css";

const ForSaleRent = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div className={styles.container}>
      <label className={styles.label}>გარიგების ტიპი</label>
      <div className={styles.radioGroup}>
        <label>
          <input
            className={styles.inputs}
            type="radio"
            name="forSaleRent"
            value="forSale"
            checked={value === "forSale"}
            onChange={handleChange}
            required
          />
          იყიდება
        </label>
        <label>
          <input
            className={styles.inputs}
            type="radio"
            name="forSaleRent"
            value="forRent"
            checked={value === "forRent"}
            onChange={handleChange}
            required
          />
          ქირავდება
        </label>
      </div>
    </div>
  );
};

export default ForSaleRent;
