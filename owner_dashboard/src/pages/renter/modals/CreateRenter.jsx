import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createRenter, getAllrenters } from "../../../redux/slices/renterSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { toast } from "react-toastify";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const CreateRenter = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);

  const initialValues = {
    username: "",
    phone: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    area: "",
    postCode: "",
    National_ID_Passport_no: "",
    advanceRent: 0,
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
        size={isMobile ? "sm" : "md"}
        // fullScreen={isMobile}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // same shape as initial values
            // console.log(values);
            setisLoading(true);
            dispatch(createRenter(values))
              .then(() => {
                setisLoading(false);
                resetForm();
                toast.success("New renter created");
                setModalOpened(false);
                dispatch(getAllrenters());
              })
              .catch((err) => toast.error("Somthing went wrong!"));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={Styles.input__container}>
                <label htmlFor="username" className={Styles.input__label}>
                  Username/E-mail
                </label>
                <Field name="username" />
                {errors.username && touched.username ? (
                  <div className={Styles.input__error}>{errors.username}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="phone" className={Styles.input__label}>
                  Phone
                </label>
                <Field name="phone" type="number" />
                {errors.phone && touched.phone ? (
                  <div className={Styles.input__error}>{errors.phone}</div>
                ) : null}
              </div>

              <div className={Styles.address_container}>
                <div className={Styles.input__container}>
                  <label htmlFor="firstname" className={Styles.input__label}>
                    First name
                  </label>
                  <Field name="firstname" />
                  {errors.firstname && touched.firstname ? (
                    <div className={Styles.input__error}>
                      {errors.firstname}
                    </div>
                  ) : null}
                </div>
                <div className={Styles.input__container}>
                  <label htmlFor="lastname" className={Styles.input__label}>
                    Last name
                  </label>
                  <Field name="lastname" />
                  {errors.lastname && touched.lastname ? (
                    <div className={Styles.input__error}>{errors.lastname}</div>
                  ) : null}
                </div>
              </div>

              <div className={Styles.input__container}>
                <label htmlFor="address" className={Styles.input__label}>
                  Address
                </label>
                <Field name="address" type="text" />
                {errors.address && touched.address ? (
                  <div className={Styles.input__error}>{errors.address}</div>
                ) : null}
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
                  htmlFor="National_ID_Passport_no"
                  className={Styles.input__label}
                >
                  National ID or Passport no
                </label>
                <Field name="National_ID_Passport_no" type="text" />
                {errors.National_ID_Passport_no &&
                touched.National_ID_Passport_no ? (
                  <div className={Styles.input__error}>
                    {errors.National_ID_Passport_no}
                  </div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="advanceRent" className={Styles.input__label}>
                  Advance Rent
                </label>
                <Field name="advanceRent" type="text" />
                {errors.advanceRent && touched.advanceRent ? (
                  <div className={Styles.input__error}>
                    {errors.advanceRent}
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
      </Modal>
    </>
  );
};

export default CreateRenter;
