import Styles from "./ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { OwnerInfo, updateHouseInfo } from "../../../redux/slices/ownerSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import AddressDropDown from "../../../Components/AddressDropDown";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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

function CreateNewHouseIModal({ modalOpened, setModalOpened, homeData }) {
  const { isPending } = useSelector((state) => state.houseInfo);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [address, setAddress] = useState();
  const [formData, setFormData] = useState({});

  // const initialValues = {
  //   ...formData,
  //   ...address,
  // };
  useEffect(() => {
    // setFormData(homeData);
    setFormData((data) => ({ ...data, ...homeData, ...address }));
  }, [homeData, address]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    // dispatch(updateHouseInfo(formData));
    setModalOpened(false);
  };
  const resetInput = (e) => {
    e.target.value = "";
  };

  const getAddressData = (value) => {
    // setFormData(value);
    setAddress(value);
    // console.log(value);
  };
  // useEffect(() => {
  //   const initialValues = {
  //     ...formData,
  //     ...address,
  //   };
  // }, [address])

  // console.log(initialValues);

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
      {/* <div>
        <Formik
          initialValues={formData}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={Styles.input__container}>
                <label htmlFor="houseName" className={Styles.input__label}>
                  House Name
                </label>
                <Field name="houseName" />
                {errors.houseName && touched.houseName ? (
                  <div className={Styles.input__error}>{errors.houseName}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="houseNo" className={Styles.input__label}>
                  House Number
                </label>
                <Field name="houseNo" />
                {errors.houseNo && touched.houseNo ? (
                  <div className={Styles.input__error}>{errors.houseNo}</div>
                ) : null}
              </div>
              <AddressDropDown getAddressData={getAddressData} />
              <div className={Styles.input__container}>
                <label htmlFor="postCode" className={Styles.input__label}>
                  Postal code
                </label>
                <Field name="postCode" type="postCode" />
                {errors.postCode && touched.postCode ? (
                  <div className={Styles.input__error}>{errors.postCode}</div>
                ) : null}
              </div>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div> */}
      <form className="infoForm">
        <div className={Styles.input__container}>
          <label htmlFor="houseName" className={Styles.input__label}>
            House Name
          </label>
          <input
            type="text"
            className={Styles.infoInput}
            name="houseName"
            onChange={handleChange}
            value={formData.houseName}
            onFocus={(e) => resetInput(e)}
            placeholder="House Name"
          />
        </div>
        <div className={Styles.input__container}>
          <label htmlFor="houseNo" className={Styles.input__label}>
            House Number
          </label>
          <input
            type="text"
            className={Styles.infoInput}
            name="houseNo"
            onChange={handleChange}
            value={formData.houseNo}
            onFocus={(e) => resetInput(e)}
            placeholder="House no"
          />
        </div>

        <AddressDropDown getAddressData={getAddressData} />
        {/* <div>
          <input
            type="text"
            className={Styles.infoInput}
            name="district"
            onChange={handleChange}
            value={formData.district}
            onFocus={(e) => resetInput(e)}
            placeholder="District"
          />
          <input
            type="text"
            className={Styles.infoInput}
            name="division"
            onChange={handleChange}
            value={formData.division}
            onFocus={(e) => resetInput(e)}
            placeholder="Division "
          />
        </div> */}

        <button
          className={`button ${Styles.infoButton}`}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? <LoadingSpinner /> : "Update"}
        </button>
      </form>
    </Modal>
  );
}

export default CreateNewHouseIModal;
