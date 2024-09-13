import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const RealEstateListings = ({ filters }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://api.example.com/listings");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setListings(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredListings = listings.filter((listing) => {
    return (
      listing.price >= Number(filters.priceMin) &&
      listing.price <= Number(filters.priceMax) &&
      listing.area >= Number(filters.areaMin) &&
      listing.area <= Number(filters.areaMax) &&
      (filters.region ? listing.region === filters.region : true) &&
      (filters.bedrooms ? listing.bedrooms === Number(filters.bedrooms) : true)
    );
  });

  return (
    <div>
      <h1>Real Estate Listings</h1>
      <ul>
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <li key={listing.id}>
              <img
                src={listing.imageUrl}
                alt={`Property at ${listing.address}`}
              />
              <h2>{listing.address}</h2>
              <p>City: {listing.city}</p>
              <p>ZIP Code: {listing.zipCode}</p>
              <p>Price: ${listing.price}</p>
              <p>Area: {listing.area} sqm</p>
              <p>Bedrooms: {listing.bedrooms}</p>
              <p>{listing.forSale ? "For Sale" : "For Rent"}</p>
            </li>
          ))
        ) : (
          <p>No listings match the selected criteria.</p>
        )}
      </ul>
    </div>
  );
};

RealEstateListings.propTypes = {
  filters: PropTypes.shape({
    priceMin: PropTypes.number.isRequired,
    priceMax: PropTypes.number.isRequired,
    areaMin: PropTypes.number.isRequired,
    areaMax: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    bedrooms: PropTypes.number,
  }).isRequired,
};
