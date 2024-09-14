import styles from "./SubmitButton.module.css";

export const SubmitButton = ({ onSubmit, disabled }) => {
  return (
    <button
      type="button"
      className={styles.addButton}
      onClick={onSubmit}
      disabled={disabled}
    >
      აგენტის დამატება
    </button>
  );
};
