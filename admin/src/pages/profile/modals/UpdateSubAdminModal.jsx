import Styles from "./ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import MapWindow from "../../../Components/CustomMap/MapWindow";
import { useEffect, useState } from "react";
import { useUpdateAdminMutation } from "../../../redux/features/profile/profileApi";
import { toast } from "react-toastify";

function UpdateSubAdminModal({
  updateAdminModalOpened,
  setUpdateAdminModalOpened,
  data,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [mapWindowOpen, setMapWindowOpen] = useState(false);
  const [address, setAddress] = useState({});

  const [updateAdmin, { isSuccess }] = useUpdateAdminMutation();

  const [initialValues, setInitialValues] = useState({
    ...data,
    address: "",
    country: "",
    country_code: "",
    postcode: "",
    state: "",
    state_district: "",
    nid: "",
  });

  useEffect(() => {
    setInitialValues({ ...data });
  }, [updateAdminModalOpened]);

  useEffect(() => {
    if (address?.address) {
      const { country, country_code, postcode, state, state_district } =
        address.address;

      setInitialValues({
        ...initialValues,
        address: address.display_name,
        country: country,
        country_code: country_code,
        postcode: postcode,
        state: state,
        state_district: state_district,
      });
    }
  }, [address]);

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInitialValues((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAdmin(initialValues);
  };

  useEffect(() => {
    if (isSuccess) {
      setUpdateAdminModalOpened(false);
      toast.success("Updated!");
    }
  }, [isSuccess]);

  return (
    <Modal
      classNames={{
        modal: `bg-gray-300 dark:bg-gray-800`,
        title: `modal__title`,
        close: `modal__close`,
      }}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="sm"
      fullScreen={isMobile}
      opened={updateAdminModalOpened}
      onClose={() => setUpdateAdminModalOpened(false)}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className={Styles.input__container}>
            <label className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 ">
              First Name
            </label>
            <input
              className=" dark:bg-slate-900 dark:text-gray-200"
              required
              value={initialValues.firstname}
              onChange={handleChange}
              name="firstname"
            />
          </div>

          <div className={Styles.input__container}>
            <label className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 ">
              Last Name
            </label>
            <input
              className=" dark:bg-slate-900 dark:text-gray-200"
              required
              value={initialValues.lastname}
              onChange={handleChange}
              name="lastname"
            />
          </div>

          <div className={Styles.input__container}>
            <label className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 ">
              Phone Number
            </label>
            <input
              className=" dark:bg-slate-900 dark:text-gray-200"
              required
              value={initialValues.phone}
              onChange={handleChange}
              name="phone"
            />
          </div>

          <div className={Styles.input__container}>
            <label className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 ">
              National Id
            </label>
            <input
              className=" dark:bg-slate-900 dark:text-gray-200"
              required
              value={initialValues.nid}
              onChange={handleChange}
              name="nid"
            />
          </div>

          <div className={Styles.input__container}>
            <label
              htmlFor="address"
              className={`dark:text-gray-100 ${Styles.input__label}`}
            >
              Address
            </label>
            {initialValues.address
              ? initialValues.address
              : address?.display_name}
          </div>

          <div className={Styles.input__container}>
            <span onClick={() => setMapWindowOpen(true)}>Map</span>
            <MapWindow
              mapWindowOpen={mapWindowOpen}
              setMapWindowOpen={setMapWindowOpen}
              setAddress={setAddress}
            />
          </div>

          <button className="primaryButton px-3 py-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default UpdateSubAdminModal;
