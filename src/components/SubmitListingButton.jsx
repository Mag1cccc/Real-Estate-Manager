import styles from "./SubmitListingButton.module.css";

export const SubmitListingButton = ({ onClick }) => {
  return (
    <button type="button" className={styles.addButton} onClick={onClick}>
      ლისტინგის დამატება
    </button>
  );
};
