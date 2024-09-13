import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./BedroomCategory.module.css";
import { SelectButton } from "./SelectButton";
import Icon from "../assets/Icon.svg";

export const BedroomCategory = ({ onSelectBedroomRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bedrooms, setBedrooms] = useState("");

  const handleBedroomInputChange = (e) => {
    setBedrooms(e.target.value);
  };

  const handleSelectButtonClick = () => {
    onSelectBedroomRange({ bedrooms });
    setIsOpen(false);
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={styles.bedroomCategory}
      >
        საძინებლების რაოდეონობა
        <img src={Icon} alt="icon" />
      </div>
      {isOpen && (
        <div className={styles.bedroomContainer}>
          <h1 className={styles.h1}>საძინებლების რაოდენობა</h1>
          <div>
            <input
              type="text"
              name="bedrooms"
              value={bedrooms}
              onChange={handleBedroomInputChange}
              placeholder="2"
              className={styles.input}
            />
          </div>
          <div className={styles.selectButtonContainer}>
            <SelectButton onClick={handleSelectButtonClick} />
          </div>
        </div>
      )}
    </div>
  );
};

BedroomCategory.propTypes = {
  onSelectBedroomRange: PropTypes.func.isRequired,
};
