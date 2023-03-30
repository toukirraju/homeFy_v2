import Styles from "./ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  GetHouses,
  GetProfileInfo,
  MakeDefaultHouse,
  UpdateHouse,
  UpdatePersonalProfile,
} from "../../../redux/slices/ownerSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import {
  UilBookReader,
  UilBuilding,
  UilUser,
  UilSimCard,
  UilLayerGroup,
  UilListOl,
  UilBedDouble,
  UilBath,
  UilUtensils,
  UilLaptopCloud,
  UilRulerCombined,
  UilTextFields,
  UilBill,
  UilFire,
  UilTear,
  UilWrench,
  UilElipsisDoubleVAlt,
  UilSigma,
  UilListOlAlt,
  UilPanelAdd,
} from "@iconscout/react-unicons";
import {
  getPostWidget,
  getSpecificHousePosts,
} from "../../../redux/slices/postSlice";

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

function DefaultHousePopupModal({
  defaultPopUpModalOpened,
  setDefaultPopUpModalOpened,
  data,
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

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
      opened={defaultPopUpModalOpened}
      onClose={() => setDefaultPopUpModalOpened(false)}
    >
      <div>
        <Formik
          initialValues={initialValues}
          // validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            // console.log(values);
            setisLoading(true);
            dispatch(MakeDefaultHouse(values))
              .then(() => {
                setisLoading(false);
                toast.success("This house is default now");
                setDefaultPopUpModalOpened(false);
                dispatch(GetHouses());
                dispatch(getSpecificHousePosts());
                dispatch(getPostWidget());
                dispatch(GetProfileInfo());
              })
              .catch((err) => toast.error("Somthing went wrong!"));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={Styles.widget__innerCard}>
                <div className={Styles.widget__card__content}>
                  <span>{<UilBuilding />}</span>
                  <span>House Name</span>
                  <span>{data.houseName}</span>
                </div>
              </div>

              <div className={Styles.widget__innerCard}>
                <div className={Styles.widget__card__content}>
                  <span>{<UilListOlAlt />}</span>
                  <span>House Number</span>
                  <span>{data.houseNo}</span>
                </div>
              </div>
              <div className={Styles.widget__innerCard}>
                <div className={Styles.widget__card__content}>
                  <span>{<UilLayerGroup />}</span>
                  <span>Number of floors</span>
                  <span>{data.number_of_floors}</span>
                </div>
              </div>
              <div className={Styles.widget__innerCard}>
                <div className={Styles.widget__card__content}>
                  <span>{<UilPanelAdd />}</span>
                  <span>Number of apartments</span>
                  <span>{data.number_of_apartments}</span>
                </div>
              </div>
              <div className={Styles.widget__innerCard}>
                <div className={Styles.popUp__body}>
                  Are you sure? You want to set default this house?
                </div>
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
      </div>
    </Modal>
  );
}

export default DefaultHousePopupModal;
