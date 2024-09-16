import styles from "./ApartmentDetails.module.css";
import { useState } from "react";
import { Price } from "./Price";
import { PropertyArea } from "./PropertyArea";
import { NumberOfBedrooms } from "./NumberOfBedrooms";
import { Description } from "./Description";

export const ApartmentDetails = () => {
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [description, setDescription] = useState("");

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handleAreaChange = (value) => {
    setArea(value);
  };

  const handleBedroomsChange = (value) => {
    setBedrooms(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <div>
      <h4>ბინის დეტალები</h4>
      <div className={styles.container}>
        <Price price={price} onPriceChange={handlePriceChange} />
        <PropertyArea area={area} onAreaChange={handleAreaChange} />
      </div>
      <NumberOfBedrooms
        bedrooms={bedrooms}
        onBedroomsChange={handleBedroomsChange}
      />
      <Description
        description={description}
        onDescriptionChange={handleDescriptionChange}
      />
    </div>
  );
};
