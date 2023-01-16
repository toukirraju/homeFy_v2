import Styles from "../ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createRenter } from "../../../redux/slices/renterSlice";
import { setReload } from "../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../LoadingSpinner";

const CreateRenter = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    ownerId: user._id,
    username: "",
    phoneNo: "",
    firstname: "",
    lastname: "",
    livesin: "",
    nid: "",
    advanceRent: 0,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(createRenter(formData))
      .unwrap()
      .then(() => {
        setModalOpened(false);
        setLoading(false);
        dispatch(setReload());
        setFormData({
          ownerId: user._id,
          username: "",
          phoneNo: "",
          firstname: "",
          lastname: "",
          livesin: "",
          nid: "",
          advanceRent: 0,
        });
        // toast.success("Successfully registered!");

        // dispatch(clearMessage());
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "lg"}
        // fullScreen={isMobile}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <form className={Styles.modalForm}>
          <h3>Create new renter</h3>

          <div className={`${Styles.form__inputs} ${Styles.input__container}`}>
            <span className="subtitle">
              * if renter dose not have an account, then you can create one for
              him.
            </span>
            <hr />
            <input
              type="text"
              className={Styles.infoInput}
              name="username"
              onChange={handleChange}
              value={formData.username}
              placeholder="Username *"
            />

            <input
              type="text"
              className={Styles.infoInput}
              name="phoneNo"
              onChange={handleChange}
              value={formData.phoneNo}
              placeholder="Phone number *"
            />
            <input
              type="text"
              className={Styles.infoInput}
              name="firstname"
              onChange={handleChange}
              value={formData.firstname}
              placeholder="First name"
            />
            <input
              type="text"
              className={Styles.infoInput}
              name="lastname"
              onChange={handleChange}
              value={formData.lastname}
              placeholder="Last name"
            />

            <input
              type="text"
              className={Styles.infoInput}
              name="livesin"
              onChange={handleChange}
              value={formData.livesin}
              placeholder="Address"
            />
            <input
              type="text"
              className={Styles.infoInput}
              name="nid"
              onChange={handleChange}
              value={formData.nid}
              placeholder="Nid"
            />
            <input
              type="number"
              className={Styles.infoInput}
              name="advanceRent"
              onChange={handleChange}
              value={formData.advanceRent}
              placeholder="Advance rent"
            />

            <button
              className="button infoButton"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? <LoadingSpinner /> : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateRenter;
