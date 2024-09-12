import redberryLogo from "../assets/redberry-logo.png";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={redberryLogo} alt="redberry logo" />
    </header>
  );
};
