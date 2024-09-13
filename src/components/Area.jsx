import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Area.module.css";
import { SelectButton } from "../components/SelectButton";
import Icon from "../assets/Icon.svg";

const predefinedAreas = [
  "50,000 მ²,",
  "50,000 მ²,",
  "50,000 მ²,",
  "50,000 მ²,",
  "50,000 მ²,",
];

export const Area = ({ onSelectAreaRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [selectedMinArea, setSelectedMinArea] = useState("");
  const [selectedMaxArea, setSelectedMaxArea] = useState("");

  const handleAreaChange = (e) => {
    const { name, value } = e.target;
    if (name === "minArea") {
      setMinArea(value);
    } else if (name === "maxArea") {
      setMaxArea(value);
    }
  };

  const handleSelectButtonClick = () => {
    onSelectAreaRange({ minArea, maxArea });
    setIsOpen(false); // Close the list after selection
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.areaCategory}>
        ფართობი
        <img src={Icon} alt="icon" />
      </div>
      {isOpen && (
        <div className={styles.areaContainer}>
          <h1 className={styles.h1}>ფართობის მიხედვით</h1>
          <div className={styles.inputsContainer}>
            <input
              type="text"
              name="minArea"
              value={minArea}
              onChange={handleAreaChange}
              placeholder="დან                         მ²"
              className={styles.areaInput}
            />
            <input
              type="text"
              name="maxArea"
              value={maxArea}
              onChange={handleAreaChange}
              placeholder="დან                         მ²"
              className={styles.areaInput}
            />
          </div>
          <div className={styles.areaOptions}>
            <div className={styles.areaColumn}>
              <p className={styles.p}>მინ. მ²</p>
              {predefinedAreas.map((area) => (
                <div
                  key={area}
                  onClick={() => setSelectedMinArea(area)}
                  className={`${styles.areaOption} ${
                    selectedMinArea === area ? styles.selected : ""
                  }`}
                >
                  {area}
                </div>
              ))}
            </div>
            <div className={styles.areaColumn}>
              <p className={styles.p}>მაქს. მ²</p>
              {predefinedAreas.map((area) => (
                <div
                  key={area}
                  onClick={() => setSelectedMaxArea(area)}
                  className={`${styles.areaOption} ${
                    selectedMaxArea === area ? styles.selected : ""
                  }`}
                >
                  {area}
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

Area.propTypes = {
  onSelectAreaRange: PropTypes.func.isRequired,
};
