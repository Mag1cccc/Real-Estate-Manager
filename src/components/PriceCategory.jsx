import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./PriceCategory.module.css";
import Icon from "../assets/Icon.svg";
import { SelectButton } from "../components/SelectButton";

const predefinedPrices = [
  "50,000 ₾",
  "100,000 ₾",
  "150,000 ₾",
  "200,000 ₾",
  "300,000 ₾",
];

export const PriceCategory = ({ onSelectPriceRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };

  const handleSelectButtonClick = () => {
    onSelectPriceRange({ minPrice, maxPrice });
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.priceCategory}>
        საფასო კატეგორია
        <img src={Icon} alt="icon" />
      </div>
      {isOpen && (
        <div className={styles.priceContainer}>
          <h1 className={styles.h1}>ფასის მიხედვით</h1>
          <div className={styles.inputsContainer}>
            <input
              type="text"
              name="minPrice"
              value={minPrice}
              onChange={handlePriceChange}
              placeholder="დან                         ₾"
              className={styles.priceInput}
            />
            <input
              type="text"
              name="maxPrice"
              value={maxPrice}
              onChange={handlePriceChange}
              placeholder="მდე                         ₾"
              className={styles.priceInput}
            />
          </div>
          <div className={styles.priceOptions}>
            <div className={styles.priceColumn}>
              <p className={styles.p}>მინ.ფასი</p>
              {predefinedPrices.map((price) => (
                <div
                  key={price}
                  onClick={() => setSelectedMinPrice(price)}
                  className={`${styles.priceOption} ${
                    selectedMinPrice === price ? styles.selected : ""
                  }`}
                >
                  {price}
                </div>
              ))}
            </div>

            <div className={styles.priceColumn}>
              <p className={styles.p}>მაქს.ფასი</p>
              {predefinedPrices.map((price) => (
                <div
                  key={price}
                  onClick={() => setSelectedMaxPrice(price)}
                  className={`${styles.priceOption} ${
                    selectedMaxPrice === price ? styles.selected : ""
                  }`}
                >
                  {price}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.selectButtonContainer}>
            <SelectButton onClick={handleSelectButtonClick} />
          </div>
        </div>
      )}
    </div>
  );
};

PriceCategory.propTypes = {
  onSelectPriceRange: PropTypes.func.isRequired,
};
