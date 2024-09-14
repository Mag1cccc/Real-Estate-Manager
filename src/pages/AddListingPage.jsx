import styles from "./AddListingPage.module.css";
import { Header } from "../components/Header";
import { useState } from "react";
import ForSaleRent from "../components/ForSaleRent";
import { Location } from "../components/Location";

export const AddListingPage = () => {
  const [forSaleRent, setForSaleRent] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleForSaleRentChange = (event) => {
    setForSaleRent(event.target.value);
  };

  return (
    <main className={styles.addListingPage}>
      <Header />
      <h1 className={styles.title}>ლისტინგის დამატება</h1>
      <form className={styles.form}>
        <ForSaleRent value={forSaleRent} onChange={handleForSaleRentChange} />
        <Location
          address={address}
          onAddressChange={setAddress}
          postalCode={postalCode}
          onPostalCodeChange={setPostalCode}
        />
      </form>
    </main>
  );
};
