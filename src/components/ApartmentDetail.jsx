import { useNavigate, useParams } from "react-router-dom";
import { useApartmentDetails } from "../hooks/useApartmentDetails";
import { Header } from "./Header";
import styles from "./ApartmentDetails.module.css";
import locationIcon from "../assets/location-marker.svg";
import bedIcon from "../assets/bed.svg";
import vector from "../assets/vector.svg";
import zipVector from "../assets/zipvector.svg";
import emailIcon from "../assets/email.svg";
import phoneIcon from "../assets/phone.svg";
import { useDeleteApartment } from "../hooks/useDeleteApartment";

export const ApartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: apartment, error, isLoading } = useApartmentDetails(id);
  const { mutate: deleteApartment, isLoading: isDeleting } =
    useDeleteApartment();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      deleteApartment(id, {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error) => {
          alert(`Error deleting apartment: ${error.message}`);
        },
      });
    }
  };
  if (isLoading) {
    return <p>Loading apartment details...</p>;
  }

  if (error) {
    return <p>Error fetching apartment details: {error.message}</p>;
  }

  const {
    address,
    price,
    area,
    bedrooms,
    city,
    zip_code,
    is_rental,
    image,
    agent,
    description,
  } = apartment;

  return (
    <>
      <Header />
      <div className={styles.parentContainer}>
        <div>
          <div className={styles.status}>
            {is_rental ? "ქირავდება" : "იყიდება"}
          </div>
          <img
            src={image}
            alt={`Apartment in ${city.name}`}
            className={styles.img}
          />
        </div>
        <div className={styles.childContainer}>
          <h1>{price.toLocaleString()}₾</h1>
          <div className={styles.iconContainer}>
            <div>
              <img src={locationIcon} alt="location icon" />
            </div>
            <h3 className={styles.h3}>
              {city.name} {address}
            </h3>
          </div>
          <div className={styles.iconContainer}>
            <img src={vector} alt="vector icon" />
            <h3 className={styles.h3}>{area} m²</h3>
          </div>
          <div className={styles.iconContainer}>
            <img src={bedIcon} alt="bed icon" />
            <h3 className={styles.h3}>{bedrooms}</h3>
          </div>
          <div className={styles.iconContainer}>
            <img src={zipVector} alt="zip code icon" />
            <h3 className={styles.h3}>{zip_code}</h3>
          </div>
          <p className={styles.description}> {description}</p>

          <div className={styles.agentParentContainer}>
            <div className={styles.agentContainer}>
              <img src={agent.avatar} alt={`${agent.name}'s avatar`} />
              <div>
                <h4 className={styles.h4}>
                  <strong></strong> {agent.name} {agent.surname}
                </h4>
                <h5 className={styles.h5}>აგენტი</h5>
              </div>
            </div>

            <div className={styles.contact}>
              <div className={styles.contactContainer}>
                <img src={emailIcon} alt="email icon" />
                <p>{agent.email}</p>
              </div>
              <div className={styles.contactContainer}>
                <img src={phoneIcon} alt="phone icon" />
                <p>{agent.phone}</p>
              </div>
            </div>
          </div>
          <button
            className={styles.button}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "იშლება..." : "ლისტინგის წაშლა"}
          </button>
        </div>
      </div>
    </>
  );
};
