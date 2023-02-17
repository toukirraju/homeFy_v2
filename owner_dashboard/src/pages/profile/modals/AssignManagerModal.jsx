import Styles from "./ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AssignRole, GetManagers } from "../../../redux/slices/ownerSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useState } from "react";
import { toast } from "react-toastify";

const validation = Yup.object().shape({
  house: Yup.string().required("Required"),
  // houseName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // houseNo: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // postCode: Yup.string().required("Required"),
});

function AssignManagerModal({
  modalOpened,
  setModalOpened,
  data,
  closeSearchModal,
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const { profileData, houses, managers } = useSelector((state) => state.owner);
  const initialValues = {
    ...data,
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
      // fullScreen={isMobile}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values) => {
            // same shape as initial values
            const house = JSON.parse(values.house);
            const formData = {
              ...values,
              defaultHomeID: house._id,
              houseName: house.houseName,
            };
            setisLoading(true);
            dispatch(AssignRole(formData))
              .unwrap()
              .then((result) => {
                setisLoading(false);
                dispatch(GetManagers());
                setModalOpened(false);
                toast.success("Manager assigned");
                // setSearchResult(result);
                closeSearchModal();
              })
              .catch((err) => setisLoading(false));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <div className={Styles.widget__innerCard}>
                  <div className={Styles.widget__card__content}>
                    <span>{/* <UilBuilding /> */}</span>
                    <span>Name</span>
                    <span>{data.firstname + " " + data.lastname}</span>
                  </div>
                </div>
                <div className={Styles.widget__innerCard}>
                  <div className={Styles.widget__card__content}>
                    <span>{/* <UilBuilding /> */}</span>
                    <span>Phone</span>
                    <span>{data.phone}</span>
                  </div>
                </div>
                <div className={Styles.widget__innerCard}>
                  <div className={Styles.widget__card__content}>
                    <span>{/* <UilBuilding /> */}</span>
                    <span>Role</span>
                    <span>{data.role}</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="house" className={Styles.input__label}>
                  Select house for assign manager
                </label>

                <Field id="house" name="house" component="select">
                  <option value="">Select house</option>
                  {houses.map((house) => (
                    <option key={house._id} value={JSON.stringify(house)}>
                      {house.houseName}
                    </option>
                  ))}
                </Field>
                {errors.house && touched.house ? (
                  <div className={Styles.input__error}>{errors.house}</div>
                ) : null}
              </div>

              <button
                disabled={isLoading}
                className={Styles.infoButton}
                type="submit"
              >
                {isLoading ? <LoadingSpinner /> : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default AssignManagerModal;
