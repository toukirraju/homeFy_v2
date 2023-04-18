import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import MapWindow from "../../../../Components/CustomMap/MapWindow";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { useUpdateProfileMutation } from "../../../../redux/features/profile/profileRTKquery";
import SingleInput from "./ui/SingleInput";
import styles from "./updateProfile.module.css";

const UpdateProfile = ({ updateModalOpened, setUpdateModalOpened, data }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [formData, setFormData] = useState(data);
  const [mapWindowOpen, setMapWindowOpen] = useState(false);
  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();

  const [address, setAddress] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile({
      _id: formData._id,
      fullname: formData.fullname,
      permanent_address: formData.permanent_address,
      postcode: formData.postcode,
      street_no: formData.street_no,
      NID_no: formData.NID_no,
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      permanent_address: address?.display_name,
      postcode: address?.address?.postcode ? address?.address?.postcode : "",
    });
  }, [address, address?.display_name]);

  useEffect(() => {
    setFormData(data);
  }, [updateModalOpened, data?._id]);

  useEffect(() => {
    if (isSuccess) {
      setUpdateModalOpened(false);
    }
  }, [isSuccess]);

  return (
    <>
      <Modal
        overlayOpacity={0.55}
        overlayBlur={3}
        classNames={{
          modal: `modal__Body`,
          title: `modal__title`,
          close: `modal__close`,
        }}
        size={isMobile ? "sm" : "lg"}
        // fullScreen={isMobile}
        opened={updateModalOpened}
        onClose={() => setUpdateModalOpened(false)}
      >
        <div className={styles.form__container}>
          <form className={styles.input__form} onSubmit={handleSubmit}>
            <h3 className={styles.form__title}>Update Profile</h3>

            <SingleInput
              title="Full Name"
              type="text"
              name="fullname"
              onChange={handleChange}
              value={formData?.fullname}
              placeholder="Enter your full name"
            />

            <SingleInput
              title="Phone Number"
              type="tel"
              name="phone"
              onChange={handleChange}
              value={formData?.phone}
              placeholder="Enter your phone number"
            />

            {/* <!-- location picker --> */}
            <div
              className={styles.location__picker}
              onClick={() => setMapWindowOpen(true)}
            >
              <label
                htmlFor="location"
                className={styles.location__picker__label}
              >
                Pick your location
              </label>
              <span id="location">
                <i
                  className={`fa-solid fa-map-location-dot ${styles.location__picker__icon}`}
                ></i>
              </span>
            </div>

            <SingleInput
              title="Address"
              type="text"
              name="permanent_address"
              onChange={handleChange}
              value={formData?.permanent_address}
              placeholder="Enter your Permanent address"
            />

            {/* <!-- double input in a row start --> */}
            <div className={styles.form__group__double}>
              <div>
                <label className={styles.form__label}>Zipcode</label>
                <input
                  className={styles.form__group__double__input}
                  type="text"
                  name="postcode"
                  onChange={handleChange}
                  value={formData?.postcode}
                  placeholder="Enter postcode"
                />
              </div>
              <div>
                <label className={styles.form__label}>Street no</label>
                <input
                  className={styles.form__group__double__input}
                  type="text"
                  name="street_no"
                  onChange={handleChange}
                  value={formData?.street_no}
                  placeholder="Enter street number"
                />
              </div>
            </div>
            {/* <!-- double input in a row end --> */}

            <SingleInput
              title="NID Number"
              type="text"
              name="NID_no"
              onChange={handleChange}
              value={formData?.NID_no}
              placeholder="Enter your NID number"
            />

            <div className={styles.center__button}>
              <button
                className={`${styles.btn} ${styles.form__submit__btn} `}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    update <LoadingSpinner />{" "}
                  </>
                ) : (
                  "update"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <MapWindow
        mapWindowOpen={mapWindowOpen}
        setMapWindowOpen={setMapWindowOpen}
        setAddress={setAddress}
      />
    </>
  );
};

export default UpdateProfile;
