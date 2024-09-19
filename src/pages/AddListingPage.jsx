import { useState, useEffect } from "react";
import styles from "./AddListingPage.module.css";
import { Header } from "../components/Header";
import ForSaleRent from "../components/ForSaleRent";
import { Price } from "../components/Price";
import { PropertyArea } from "../components/PropertyArea";
import { NumberOfBedrooms } from "../components/NumberOfBedrooms";
import { Description } from "../components/Description";
import { ImageUpload } from "../components/ImageUpload";
import { AgentDropdown } from "../components/AgentDropdown";
import { CancelButton } from "../components/CancelButton";
import { useNavigate } from "react-router-dom";
import { SubmitListingButton } from "../components/SubmitListingButton";
import { useAddListing } from "../hooks/useAddListing";
import { useRegions } from "../hooks/useRegions";
import { useCities } from "../hooks/useCities";
import { RegionSelect } from "../components/RegionSelect";
import { CitySelect } from "../components/CitySelect";

export const AddListingPage = () => {
  const navigate = useNavigate();
  const mutation = useAddListing();

  const [forSaleRent, setForSaleRent] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [image, setImage] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [addressError, setAddressError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: regions,
    isLoading: regionsLoading,
    error: regionsError,
  } = useRegions();

  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useCities(selectedRegion);

  const validateAddress = (value) => {
    if (value.length < 2) {
      setAddressError("✓ მინიმუმ ორი სიმბოლო");
      return false;
    } else {
      setAddressError("");
      return true;
    }
  };

  const validatePostalCode = (value) => {
    if (!/^\d{4,5}$/.test(value)) {
      setPostalCodeError("✓ უნდა იყოს 4 ან 5 მხოლოდ რიცხვები");
      return false;
    } else {
      setPostalCodeError("");
      return true;
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    validateAddress(value);
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    setPostalCode(value);
    validatePostalCode(value);
  };

  const handleRegionChange = (event) => {
    const regionId = event.target.value;
    setSelectedRegion(regionId);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

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

  useEffect(() => {
    console.log("Selected Region ID:", selectedRegion);
  }, [selectedRegion]);

  if (regionsLoading || citiesLoading) return <div>Loading...</div>;
  if (regionsError)
    return <div>Error fetching regions: {regionsError.message}</div>;
  if (citiesError)
    return <div>Error fetching cities: {citiesError.message}</div>;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      addressError ||
      postalCodeError ||
      !address ||
      !postalCode ||
      !selectedRegion ||
      !selectedCity ||
      !price ||
      !area ||
      !bedrooms ||
      !description ||
      !image ||
      !selectedAgent ||
      !forSaleRent
    ) {
      alert("გთხოვთ, შეასწოროთ შეცდომები გაგზავნამდე.");
      return;
    }

    Number(price);
    Number(area);
    Number(bedrooms);
    Number(selectedRegion);
    Number(selectedCity);
    Number(forSaleRent);

    const formData = new FormData();
    formData.append("address", address);
    formData.append("zip_code", postalCode);
    formData.append("price", price);
    formData.append("area", area);
    formData.append("bedrooms", bedrooms);
    formData.append("description", description);
    formData.append("region_id", selectedRegion);
    formData.append("city_id", selectedCity);
    formData.append("is_rental", forSaleRent === "forRent" ? 1 : 0);
    formData.append("agent_id", selectedAgent.id);

    if (image) {
      formData.append("image", image);
    }

    mutation.mutate(formData, {
      onSuccess: (formData) => {
        console.log("Agent added successfully:", formData);
        navigate("/");
      },
      onError: (error) => {
        console.error("Error submitting form:", error);
      },
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main className={styles.addListingPage}>
      <Header />
      <h1 className={styles.title}>ლისტინგის დამატება</h1>
      <form className={styles.form}>
        <ForSaleRent value={forSaleRent} onChange={setForSaleRent} />
        <div className={styles.container}>
          <h4>მდებარეობა</h4>
          <div className={styles.inputContainer}>
            <div>
              <label htmlFor="address" className={styles.label}>
                მისამართი *
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={handleAddressChange}
                className={`${styles.input} ${
                  addressError ? styles.errorInput : ""
                }`}
                required
                minLength={2}
              />
              <p
                className={`${styles.helperText} ${
                  addressError
                    ? styles.errorText
                    : address.length > 0
                    ? styles.validText
                    : ""
                }`}
              >
                {addressError ||
                  (address.length === 0
                    ? "✓ მინიმუმ ორი სიმბოლო"
                    : "✓ მინიმუმ ორი სიმბოლო")}
              </p>
            </div>
            <div>
              <label htmlFor="postalCode" className={styles.label}>
                საფოსტო ინდექსი *
              </label>
              <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={handlePostalCodeChange}
                className={`${styles.input} ${
                  postalCodeError ? styles.errorInput : ""
                }`}
                required
                pattern="\d*"
              />
              <p
                className={`${styles.helperText} ${
                  postalCodeError
                    ? styles.errorText
                    : postalCode.length > 0
                    ? styles.validText
                    : ""
                }`}
              >
                {postalCodeError ||
                  (postalCode.length === 0
                    ? "✓ უნდა იყოს 4 ან 5 ნიშნა მხოლოდ რიცხვები"
                    : "✓ უნდა იყოს 4 ან 5 ნიშნა მხოლოდ რიცხვები")}
              </p>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <RegionSelect
              regions={regions}
              selectedRegion={selectedRegion}
              onRegionChange={handleRegionChange}
            />
            {selectedRegion && (
              <CitySelect
                regionId={selectedRegion}
                cities={cities}
                selectedCity={selectedCity}
                onCityChange={handleCityChange}
              />
            )}
          </div>
        </div>
        <div className={styles.apartmentDetails}>
          <h4>ბინის დეტალები</h4>
          <div className={styles.containerTwo}>
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
        <ImageUpload onImageChange={setImage} />
        <AgentDropdown onAgentSelect={setSelectedAgent} />
        <div className={styles.buttonsContainer}>
          <CancelButton onClick={handleCancel} />
          <SubmitListingButton onClick={handleSubmit} />
        </div>
      </form>
    </main>
  );
};
