import { useState } from "react";
import { useAgents } from "../hooks/useAgents";
import styles from "./AgentDropdown.module.css";
import plusCircleIcon from "../assets/plus-circle.svg";
import addIcon from "../assets/Icon.svg"; // Adjust the path as needed

export const AgentDropdown = ({ onAgentSelect }) => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data: agents, isLoading, error } = useAgents();

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    onAgentSelect(agent);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>აგენტი</h3>
      <div className={styles.dropdownWrapper}>
        <label htmlFor="agent" className={styles.label}>
          აირჩიე
        </label>
        {isLoading ? (
          <p>Loading agents...</p>
        ) : error ? (
          <p className={styles.errorText}>Error fetching agents</p>
        ) : (
          <div className={styles.dropdownContainer}>
            <div
              className={styles.selectedValue}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={styles.selectedText}>
                {selectedAgent
                  ? `${selectedAgent.name} ${selectedAgent.surname}`
                  : "დაამატე აგენტი"}
              </span>
              {/* Show add icon when an agent is selected */}
              {selectedAgent && (
                <img src={addIcon} alt="Add Icon" className={styles.addIcon} />
              )}
              {/* Show plus circle icon when no agent is selected */}
              {!selectedAgent && (
                <img
                  src={plusCircleIcon}
                  alt="Add Agent Icon"
                  className={styles.addAgentIcon}
                />
              )}
            </div>
            {isOpen && (
              <div className={styles.dropdownMenu}>
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={styles.dropdownItem}
                    onClick={() => handleAgentSelect(agent)}
                  >
                    {agent.name} {agent.surname}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
