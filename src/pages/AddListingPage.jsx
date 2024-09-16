import styles from "./AddListingPage.module.css";
import { Header } from "../components/Header";
import { useState } from "react";
import ForSaleRent from "../components/ForSaleRent";
import { Location } from "../components/Location";
import { ApartmentDetails } from "../components/ApartmentDetails ";
import { ImageUpload } from "../components/ImageUpload";
import { AgentDropdown } from "../components/AgentDropdown";
import { CancelButton } from "../components/CancelButton";
import { SubmitButton } from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { SubmitListingButton } from "../components/SubmitListingButton";

export const AddListingPage = () => {
  const navigate = useNavigate();

  const [forSaleRent, setForSaleRent] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [image, setImage] = useState(null);

  const handleForSaleRentChange = (event) => {
    setForSaleRent(event.target.value);
  };

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setFormErrors((prevErrors) => ({ ...prevErrors, agent: false }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    alert("!");
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
        <ApartmentDetails />
        <ImageUpload onImageChange={setImage} />
        <AgentDropdown onAgentSelect={handleAgentSelect} />
        <div className={styles.buttonsContainer}>
          <CancelButton onClick={handleCancel} />
          <SubmitListingButton onClick={handleSubmit} />
        </div>
      </form>
    </main>
  );
};
