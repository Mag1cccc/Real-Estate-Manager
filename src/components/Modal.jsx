import { useState } from "react";
import styles from "./Modal.module.css";
import { TextInput } from "./TextInput";
import { EmailInput } from "./EmailInput";
import { PhoneInput } from "./PhoneInput";
import { FileUpload } from "./FileUpload";

export const Modal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h1 className={styles.modalTitle}>აგენტის დამატება</h1>
        <form>
          <div className={styles.inputs}>
            <TextInput
              label="სახელი*"
              value={formData.name}
              onChange={handleInputChange}
              name="name"
              required
              minLength={2}
            />
            <TextInput
              label="გვარი"
              value={formData.surname}
              onChange={handleInputChange}
              name="surname"
              required
              minLength={2}
            />
          </div>

          <div className={styles.inputs}>
            <EmailInput
              label="ელ-ფოსტა*"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@redberry\.ge$"
            />

            <PhoneInput
              label="ტელეფონის ნომერი"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
              required
              pattern="^5\d{8}$"
            />
          </div>

          <div className={styles.fileDiv}>
            <FileUpload
              label="ატვირთეთ ფოტო*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              გაუქმება
            </button>
            <button
              type="button"
              className={styles.addButton}
              onClick={handleSubmit}
            >
              აგენტის დამატება
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
