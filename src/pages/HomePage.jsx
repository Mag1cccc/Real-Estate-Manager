import { Header } from "../components/Header";
import { useState } from "react";
import styles from "./HomePage.module.css";

import { RegionSelector } from "../components/RegionSelector";
import { PriceCategory } from "../components/PriceCategory";
import { Area } from "../components/Area";
import { BedroomCategory } from "../components/BedroomCategory";
import { AddListing } from "../components/AddListing";
import { AddAgent } from "../components/AddAgent";
import { Modal } from "../components/Modal";
import { useAgents } from "../hooks/useListing";
import { ApartmentCard } from "../components/ApartmentCard";

export const HomePage = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  const [areaRange, setAreaRange] = useState({ minArea: "", maxArea: "" });
  const [selectedBedroomRange, setSelectedBedroomRange] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: apartments, error, isLoading } = useAgents();

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    console.log("Selected Region:", region, selectedRegion);
  };

  const handlePriceRangeSelect = (range) => {
    setPriceRange(range);
    console.log("Selected Price Range:", range, priceRange);
  };

  const handleAreaRangeSelect = (range) => {
    setAreaRange(range);
    console.log("Selected Area Range:", range, areaRange);
  };

  const handleBedroomSelect = (bedroomRange) => {
    setSelectedBedroomRange(bedroomRange);
    console.log("Selected Bedroom Count:", bedroomRange, selectedBedroomRange);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddAgent = (agentData) => {
    console.log("Agent added:", agentData);
    handleCloseModal();
  };

  return (
    <main className={styles.homepage}>
      <Header />
      <main>
        <div className={styles.main}>
          <RegionSelector onSelectRegion={handleRegionSelect} />
          <PriceCategory onSelectPriceRange={handlePriceRangeSelect} />
          <Area onSelectAreaRange={handleAreaRangeSelect} />
          <BedroomCategory onSelectBedroomRange={handleBedroomSelect} />

          <div className={styles.rightDiv}>
            <AddListing />
            <AddAgent onClick={handleOpenModal} />
          </div>
        </div>

        <div className={styles.cardContainer}>
          {apartments?.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddAgent={handleAddAgent}
          />
        )}
      </main>
    </main>
  );
};
