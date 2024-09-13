import { useState } from "react";
import PropTypes from "prop-types";

export const Filter = ({ onFilterChange }) => {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [region, setRegion] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleApplyFilters = () => {
    if (parseFloat(priceMin) > parseFloat(priceMax)) {
      alert("Please enter valid numbers for price range.");
      return;
    }
    if (parseFloat(areaMin) > parseFloat(areaMax)) {
      alert("Please enter valid numbers for area range.");
      return;
    }

    onFilterChange({
      priceMin: parseFloat(priceMin) || 0,
      priceMax: parseFloat(priceMax) || Infinity,
      areaMin: parseFloat(areaMin) || 0,
      areaMax: parseFloat(areaMax) || Infinity,
      region,
      bedrooms: parseInt(bedrooms) || null,
    });
  };

  return (
    <div>
      <h2>Filter Listings</h2>
      <label>
        Price Min:
        <input
          type="number"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
        />
      </label>
      <label>
        Price Max:
        <input
          type="number"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
        />
      </label>
      <label>
        Area Min:
        <input
          type="number"
          value={areaMin}
          onChange={(e) => setAreaMin(e.target.value)}
        />
      </label>
      <label>
        Area Max:
        <input
          type="number"
          value={areaMax}
          onChange={(e) => setAreaMax(e.target.value)}
        />
      </label>
      <label>
        Region:
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        ></select>
      </label>
      <label>
        Number of Bedrooms:
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </label>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
