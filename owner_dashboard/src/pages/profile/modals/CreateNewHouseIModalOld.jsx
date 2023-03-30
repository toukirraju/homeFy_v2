import Styles from "./ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  GetHouses,
  CreateHouse,
  GetProfileInfo,
  UpdateHouse,
  UpdatePersonalProfile,
} from "../../../redux/slices/ownerSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import MapWindow from "../../../Components/CustomMap/MapWindow";
import { UilLocationPoint } from "@iconscout/react-unicons";

const SignupSchema = Yup.object().shape({
  houseName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  houseNo: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  postCode: Yup.string().required("Required"),
});

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
    address: "",
    streetNo: "",
    city: "",
    area: "",
    postCode: "",
    number_of_floors: "",
    number_of_apartments: "",
  });

  const formik = useFormik({
    initialValues,
  });

  console.log(initialValues);
  useEffect(() => {
    setInitialValues({
      ...initialValues,
      address: address?.display_name,
      city: address?.address?.state,
      area: address?.address?.state_district,
      postCode: address?.address?.postcode,
    });
    formik.setFieldValue("address", address?.display_name);
  }, [address]);

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
        <Formik
          initialValues={initialValues}
          // validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            // console.log(values);
            setisLoading(true);
            dispatch(CreateHouse(values))
              .then(() => {
                setisLoading(false);
                toast.success("New house created");
                setModalOpened(false);
                dispatch(GetHouses());
              })
              .catch((err) => toast.error("Somthing went wrong!"));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={Styles.input__container}>
                <label htmlFor="houseName" className={Styles.input__label}>
                  House name
                </label>
                <Field name="houseName" />
                {errors.houseName && touched.houseName ? (
                  <div className={Styles.input__error}>{errors.houseName}</div>
                ) : null}
              </div>

              <div className={Styles.address_container}>
                <div className={Styles.input__container}>
                  <label htmlFor="houseNo" className={Styles.input__label}>
                    House number
                  </label>
                  <Field name="houseNo" />
                  {errors.houseNo && touched.houseNo ? (
                    <div className={Styles.input__error}>{errors.houseNo}</div>
                  ) : null}
                </div>
                <div className={Styles.input__container}>
                  <label htmlFor="streetNo" className={Styles.input__label}>
                    Street number
                  </label>
                  <Field name="streetNo" />
                  {errors.streetNo && touched.streetNo ? (
                    <div className={Styles.input__error}>{errors.streetNo}</div>
                  ) : null}
                </div>
              </div>
              <div className={Styles.address_container}>
                <div className={Styles.input__container}>
                  <label htmlFor="address" className={Styles.input__label}>
                    Address
                  </label>
                  <Field name="address" type="text" />
                  {errors.address && touched.address ? (
                    <div className={Styles.input__error}>{errors.address}</div>
                  ) : null}
                </div>
                <div className={Styles.input__container}>
                  <label htmlFor="map" className={Styles.input__label}>
                    Map
                  </label>
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
              <div className={Styles.address_container}>
                <div>
                  <label htmlFor="area" className={Styles.input__label}>
                    Area
                  </label>
                  <Field name="area" type="text" />
                  {errors.area && touched.area ? (
                    <div className={Styles.input__error}>{errors.area}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="city" className={Styles.input__label}>
                    City/Town
                  </label>
                  <Field name="city" type="text" />
                  {errors.city && touched.city ? (
                    <div className={Styles.input__error}>{errors.city}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="postCode" className={Styles.input__label}>
                    Zip / Postcode
                  </label>
                  <Field name="postCode" type="text" />
                  {errors.postCode && touched.postCode ? (
                    <div className={Styles.input__error}>{errors.postCode}</div>
                  ) : null}
                </div>
              </div>
              <div className={Styles.input__container}>
                <label
                  htmlFor="number_of_floors"
                  className={Styles.input__label}
                >
                  Number of floors
                </label>
                <Field name="number_of_floors" type="number" />
                {errors.number_of_floors && touched.number_of_floors ? (
                  <div className={Styles.input__error}>
                    {errors.number_of_floors}
                  </div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label
                  htmlFor="number_of_apartments"
                  className={Styles.input__label}
                >
                  Number of apartments
                </label>
                <Field name="number_of_apartments" type="text" />
                {errors.number_of_apartments && touched.number_of_apartments ? (
                  <div className={Styles.input__error}>
                    {errors.number_of_apartments}
                  </div>
                ) : null}
              </div>
              <button
                className={Styles.submit_button}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : "Submit"}
              </button>
            </Form>
          )}
        </Formik>

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
