import Styles from "./ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { GetHouses, CreateHouse } from "../../../redux/slices/ownerSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import MapWindow from "../../../Components/CustomMap/MapWindow";
import { UilLocationPoint } from "@iconscout/react-unicons";

function CreateNewHouseModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [mapWindowOpen, setMapWindowOpen] = useState(false);

  const [address, setAddress] = useState({});

  const [initialValues, setInitialValues] = useState({
    houseName: "",
    houseNo: "",
    number_of_floors: "",
    number_of_apartments: "",
    address_display_name: "",
    streetNo: "",
    state: "",
    state_district: "",
    postCode: "",
    lat: "",
    lon: "",
    country: "",
    country_code: "",
    place_id: "",
  });

  // console.log(address);

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      address_display_name: address?.display_name,
      state: address?.address?.state,
      state_district: address?.address?.state_district,
      postCode: address?.address?.postcode ? address?.address?.postcode : "",
      lat: address?.lat,
      lon: address?.lon,
      country: address?.address?.country,
      country_code: address?.address?.country_code,
      place_id: address?.place_id,
    });
  }, [address, address?.display_name]);

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInitialValues((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(initialValues);
    setisLoading(true);
    dispatch(CreateHouse(initialValues))
      .then(() => {
        setisLoading(false);
        toast.success("New house created");
        setModalOpened(false);
        dispatch(GetHouses());
      })
      .catch((err) => toast.error("Somthing went wrong!"));
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
      <div>
        <form onSubmit={handleSubmit}>
          <div className={Styles.input__container}>
            <label htmlFor="houseName" className={Styles.input__label}>
              House name
            </label>
            <input
              required
              value={initialValues.houseName}
              onChange={handleChange}
              name="houseName"
            />
          </div>

          <div className={Styles.address_container}>
            <div className={Styles.input__container}>
              <label htmlFor="houseNo" className={Styles.input__label}>
                House number
              </label>
              <input
                required
                value={initialValues.houseNo}
                onChange={handleChange}
                name="houseNo"
              />
            </div>
            <div className={Styles.input__container}>
              <label htmlFor="streetNo" className={Styles.input__label}>
                Street number
              </label>
              <input
                value={initialValues.streetNo}
                onChange={handleChange}
                name="streetNo"
              />
            </div>
          </div>
          <div className={Styles.address_container}>
            <div className={Styles.input__container}>
              <label htmlFor="number_of_floors" className={Styles.input__label}>
                Number of floors
              </label>
              <input
                value={initialValues.number_of_floors}
                onChange={handleChange}
                name="number_of_floors"
                type="number"
              />
            </div>
            <div className={Styles.input__container}>
              <label
                htmlFor="number_of_apartments"
                className={Styles.input__label}
              >
                Number of apartments
              </label>
              <input
                value={initialValues.number_of_apartments}
                onChange={handleChange}
                name="number_of_apartments"
                type="text"
              />
            </div>
          </div>
          <div className={Styles.address_container}>
            <div className={Styles.input__container}>
              <div
                id="map"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setMapWindowOpen(true)}
              >
                <UilLocationPoint /> Pick your location
              </div>
            </div>
          </div>

          <div className={Styles.input__container}>
            <label
              htmlFor="address_display_name"
              className={Styles.input__label}
            >
              Address
            </label>
            <input
              required
              value={initialValues.address_display_name}
              onChange={handleChange}
              name="address_display_name"
              type="text"
            />
          </div>

          <div className={Styles.address_container}>
            <div>
              <label htmlFor="state_district" className={Styles.input__label}>
                Area
              </label>
              <input
                required
                value={initialValues.state_district}
                onChange={handleChange}
                name="state_district"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="state" className={Styles.input__label}>
                City/Town
              </label>
              <input
                required
                value={initialValues.state}
                onChange={handleChange}
                name="state"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="postCode" className={Styles.input__label}>
                Zip / Postcode
              </label>
              <input
                value={initialValues.postCode}
                onChange={handleChange}
                name="postCode"
                type="text"
              />
            </div>
          </div>

          <div className={Styles.address_container}>
            <div className={Styles.input__container}>
              <label htmlFor="lat" className={Styles.input__label}>
                Latitude
              </label>
              <input
                required
                value={initialValues.lat}
                onChange={handleChange}
                name="lat"
                type="text"
              />
            </div>
            <div className={Styles.input__container}>
              <label htmlFor="lon" className={Styles.input__label}>
                Longitude
              </label>
              <input
                required
                value={initialValues.lon}
                onChange={handleChange}
                name="lon"
                type="text"
              />
            </div>
          </div>

          <button
            className={Styles.submit_button}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "Submit"}
          </button>
        </form>

        <MapWindow
          mapWindowOpen={mapWindowOpen}
          setMapWindowOpen={setMapWindowOpen}
          setAddress={setAddress}
        />
      </div>
    </Modal>
  );
}

export default CreateNewHouseModal;
