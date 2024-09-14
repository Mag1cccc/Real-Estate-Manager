import { useNavigate } from "react-router-dom";
import styles from "./AddListing.module.css";

export const AddListing = () => {
  const navigate = useNavigate();

  const handleAddListingClick = () => {
    navigate("/add-listing");
  };

  return (
    <button className={styles.button} onClick={handleAddListingClick}>
      + ლისტინგის დამატება
    </button>
  );
};
