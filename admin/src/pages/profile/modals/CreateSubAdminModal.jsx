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
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  postCode: Yup.string().required("Required"),
});

function CreateSubAdminModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const initialValues = {
    name: "",
    phone: "",
    password: "",
    email: "",
    address: "",
    city: "",
    area: "",
    postCode: "",
    nid: "",
    role: [],
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
      title="create sub-admin"
      onClose={() => setModalOpened(false)}
    >
      <div>
        <Formik
          initialValues={initialValues}
          // validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={Styles.input__container}>
                <label htmlFor="name" className={Styles.input__label}>
                  Name
                </label>
                <Field name="name" />
                {errors.name && touched.name ? (
                  <div className={Styles.input__error}>{errors.name}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="phone" className={Styles.input__label}>
                  Phone Number
                </label>
                <Field name="phone" />
                {errors.phone && touched.phone ? (
                  <div className={Styles.input__error}>{errors.phone}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="email" className={Styles.input__label}>
                  Email
                </label>
                <Field name="email" />
                {errors.email && touched.email ? (
                  <div className={Styles.input__error}>{errors.email}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="password" className={Styles.input__label}>
                  Password
                </label>
                <Field name="password" type="password" />
                {errors.password && touched.password ? (
                  <div className={Styles.input__error}>{errors.password}</div>
                ) : null}
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
                  <label htmlFor="city" className={Styles.input__label}>
                    City
                  </label>
                  <Field name="city" type="text" />
                  {errors.city && touched.city ? (
                    <div className={Styles.input__error}>{errors.city}</div>
                  ) : null}
                </div>
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
                <label htmlFor="nid" className={Styles.input__label}>
                  National id number
                </label>
                <Field name="nid" type="text" />
                {errors.nid && touched.nid ? (
                  <div className={Styles.input__error}>{errors.nid}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="role" className={Styles.input__label}>
                  Role:
                </label>
                <div className={Styles.checkbox_container}>
                  <div className={Styles.checkbox_1}>
                    <label htmlFor="admin">Admin</label>
                    <Field type="checkbox" name="role" value="admin" />
                    {errors.admin && <p>{errors.admin}</p>}
                  </div>
                  <div className={Styles.checkbox_1}>
                    <label htmlFor="editor">Editor</label>
                    <Field type="checkbox" name="role" value="editor" />
                    {errors.editor && <p>{errors.editor}</p>}
                  </div>
                  <div className={Styles.checkbox_1}>
                    <label htmlFor="moderator">Moderator</label>
                    <Field type="checkbox" name="role" value="moderator" />
                    {errors.moderator && <p>{errors.moderator}</p>}
                  </div>
                </div>
              </div>
              <button className={Styles.submit_button} type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default CreateSubAdminModal;
