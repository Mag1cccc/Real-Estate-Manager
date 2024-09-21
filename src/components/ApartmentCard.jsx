import styles from "./ApartmentCard.module.css";
import locationIcon from "../assets/location-marker.svg";
import bedIcon from "../assets/bed.svg";
import vector from "../assets/Vector.svg";
import zipVector from "../assets/zipvector.svg";
import { useNavigate } from "react-router-dom";

export const ApartmentCard = ({ apartment }) => {
  const navigate = useNavigate();

  const { address, zip_code, price, area, bedrooms, is_rental, image, city } =
    apartment;

  const handleClick = () => {
    navigate(`/apartment/${apartment.id}`);
  };

  return (
    <div className={styles.parentContainer} onClick={handleClick}>
      <div className={styles.saleRent}>
        <p className={styles.type}>{is_rental ? "იყიდება" : "ქირავდება"}</p>
      </div>
      <img
        src={image}
        alt={`Apartment in ${city.name}`}
        className={styles.image}
      />
      <div className={styles.details}>
        <p className={styles.price}>{price.toLocaleString()}₾</p>
        <div className={styles.addressContainer}>
          <img src={locationIcon} alt="location icon" />
          <h2 className={styles.address}>{address}</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.addressContainer}>
            <img src={bedIcon} alt="bed icon" />
            <p className={styles.bedrooms}> {bedrooms}</p>
          </div>
          <div className={styles.addressContainer}>
            <img src={vector} alt="vector icon" />
            <p className={styles.area}> {area} მ²</p>
          </div>
          <div className={styles.addressContainer}>
            <img src={zipVector} alt="zip vector icon" />
            <p className={styles.zipcode}>{zip_code}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
