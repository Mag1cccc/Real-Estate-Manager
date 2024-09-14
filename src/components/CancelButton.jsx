import styles from "./CancelButton.module.css";

export const CancelButton = ({ onClick }) => {
  return (
    <button type="button" className={styles.cancelButton} onClick={onClick}>
      გაუქმება
    </button>
  );
};
