import { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import { TextInput } from "./TextInput";
import { EmailInput } from "./EmailInput";
import { PhoneInput } from "./PhoneInput";
import { FileUpload } from "./FileUpload";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";
import { useAddAgent } from "../hooks/useAddAgent";

export const Modal = ({ onClose, onAddAgent }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: null,
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const mutation = useAddAgent();

  useEffect(() => {
    const isValid =
      formData.name.length >= 2 &&
      formData.surname.length >= 2 &&
      /^[a-zA-Z0-9._%+-]+@redberry\.ge$/.test(formData.email) &&
      /^5\d{8}$/.test(formData.phone) &&
      formData.avatar;

    setIsSubmitDisabled(!isValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

    mutation.mutate(data, {
      onSuccess: (agentData) => {
        console.log("Agent added successfully:", agentData);
        onAddAgent(agentData);
        onClose();
      },
      onError: (error) => {
        console.error("Error submitting form:", error);
      },
    });
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
              value={formData.phone}
              onChange={handleInputChange}
              name="phone"
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
            <CancelButton onClick={onClose} />
            <SubmitButton
              onSubmit={handleSubmit}
              disabled={isSubmitDisabled || mutation.isLoading}
            />
          </div>
        </form>
        {mutation.error && (
          <p className={styles.error}>Error: {mutation.error.message}</p>
        )}
      </div>
    </div>
  );
};
