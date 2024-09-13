import styles from "../components/AddAgent.module.css";

export const AddAgent = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      + აგენტის დამატება
    </button>
  );
};
