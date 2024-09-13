import { useState } from "react";
import PropTypes from "prop-types";
import Icon from "../assets/Icon.svg";
import styles from "./RegionSelector.module.css";
import { SelectButton } from "./SelectButton";

const regions = [
  "ქართლი",
  "კახეთი",
  "იმერეთი",
  "სამეგრელო",
  "რაჭა",
  "ლეჩხუმი",
  "სამცხე-ჯავახეთი",
  "სვანეთი",
  "გურია",
  "მცხეთა-მთიანეთი",
  "თბილისი",
  "აჭარა",
];

export const RegionSelector = ({ onSelectRegion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const handleRegionClick = (region) => {
    const updatedSelectedRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region) // Remove if already selected
      : [...selectedRegions, region]; // Add if not selected

    setSelectedRegions(updatedSelectedRegions);
    onSelectRegion(updatedSelectedRegions); // Pass selected regions to parent
  };

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.region}>
        რეგიონი
        <img src={Icon} alt="icon" />
      </div>
      {isOpen && (
        <div>
          <div className={styles.list}>
            <h1 className={styles.h1}>რეგიონის მიხედვით</h1>
            <div className={styles.listItem}>
              {regions.map((region) => (
                <div
                  key={region}
                  onClick={() => handleRegionClick(region)}
                  className={styles.div}
                >
                  <input type="checkbox" className={styles.listInput}></input>
                  <span className={styles.span}>{region}</span>
                </div>
              ))}
            </div>
            <div className={styles.selectButton}>
              <SelectButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

RegionSelector.propTypes = {
  onSelectRegion: PropTypes.func.isRequired,
};
