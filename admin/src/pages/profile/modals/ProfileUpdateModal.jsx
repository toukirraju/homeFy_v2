import Styles from "./ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

function ProfileUpdateModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="sm"
      fullScreen={isMobile}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Update profile</h3>
        <div>
          <input
            type="text"
            className={Styles.infoInput}
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
            placeholder="First Name"
          />
          <input
            type="text"
            className={Styles.infoInput}
            name="lastname"
            onChange={handleChange}
            value={formData.lastname}
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            type="text"
            className={Styles.infoInput}
            name="livesin"
            onChange={handleChange}
            value={formData.livesin}
            placeholder="Lives in"
          />
          <input
            type="text"
            className={Styles.infoInput}
            name="phoneNo"
            onChange={handleChange}
            value={formData.phoneNo}
            placeholder="Phone No"
          />
        </div>
        <div>
          <input
            type="text"
            className={Styles.infoInput}
            name="worksAt"
            onChange={handleChange}
            value={formData.worksAt}
            placeholder="Works at"
          />
        </div>

        <button
          className={`button ${Styles.infoButton}`}
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileUpdateModal;
