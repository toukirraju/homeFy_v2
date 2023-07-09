import Styles from "./ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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

function ProfileUpdateModal({ modalOpened, setModalOpened, data }) {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const initialValues = {
    ...data,
  };

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
      opened={modalOpened}
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
              <div className={Styles.address_container}>
                <div className={Styles.input__container}>
                  <label htmlFor="firstname" className={Styles.input__label}>
                    First Name
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
                    Last Name
                  </label>
                  <Field name="lastname" />
                  {errors.lastname && touched.lastname ? (
                    <div className={Styles.input__error}>{errors.lastname}</div>
                  ) : null}
                </div>
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

export default ProfileUpdateModal;
