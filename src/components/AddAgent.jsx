import { useNavigate } from "react-router-dom";
import styles from "../components/AddAgent.module.css";

export const AddAgent = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/agents");
  };

  return (
    <button className={styles.button} onClick={handleButtonClick}>
      + აგენტის დამატება
    </button>
  );
};
