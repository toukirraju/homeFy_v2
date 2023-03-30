import { Modal, useMantineTheme } from "@mantine/core";
import Styles from "../../../Styles/ModalStyle.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  allApartments,
  createMultiApartment,
} from "../../../redux/slices/apartmentSlice";
import { setReload } from "../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { toast } from "react-toastify";
import { clearMessage } from "../../../redux/slices/message";

const validation = Yup.object().shape({
  numOfFloors: Yup.number()
    .min(1, " Zero '0' not accepted. Minimum length is 1-100")
    .max(100, "Too Long! Maximum length is 1-100")
    .required("Required"),
});

const CreateBulkApartment = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { apartmentData } = useSelector((state) => state.apartmentInfo);

  const initialValues = {
    numOfFloors: 0,
  };

  const resetInput = (e) => {
    e.target.value = "";
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
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values, { resetForm }) => {
            // same shape as initial values
            // console.log(values);
            setLoading(true);
            dispatch(createMultiApartment(values))
              .unwrap()
              .then(() => {
                setModalOpened(false);
                setLoading(false);
                dispatch(allApartments());

                resetForm();
                toast.success("Created multiple apartment");

                dispatch(clearMessage());
              })
              .catch(() => {
                setLoading(false);
              });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={Styles.Modal_header}>
                <h3 className={Styles.Modal_header_title}>
                  {apartmentData.length === 0
                    ? "Create Multipule Apartment"
                    : "Create Apartment"}
                </h3>
                <span className={Styles.Modal_header_subtitle}>
                  {apartmentData.length === 0
                    ? "* if you want to create multiple apartment then you just enter how many floors you want to create"
                    : "* You just enter floor number where you want to create apartment"}
                </span>
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="numOfFloors" className={Styles.input__label}>
                  {apartmentData.length === 0
                    ? "Enter Number of Floor's"
                    : "Enter floor number"}
                </label>
                <Field
                  name="numOfFloors"
                  type="number"
                  onFocus={(e) => resetInput(e)}
                />
                {errors.numOfFloors && touched.numOfFloors ? (
                  <div className={Styles.input__error}>
                    {errors.numOfFloors}
                  </div>
                ) : null}
              </div>
              <button
                className={Styles.submit_button}
                type="submit"
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : "Create"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CreateBulkApartment;
