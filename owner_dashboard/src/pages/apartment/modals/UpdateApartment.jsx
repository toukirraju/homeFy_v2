import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal, Switch, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allApartments,
  createMultiApartment,
  update,
} from "../../../redux/slices/apartmentSlice";
import { setReload } from "../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { UilBuilding, UilReceipt } from "@iconscout/react-unicons";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const UpdateApartment = ({ updateModalOpened, setUpdateModalOpened, data }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [billChecked, setBillChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState(data);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const initialValues = {
    ...data,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(update(formData))
      .unwrap()
      .then(() => {
        setUpdateModalOpened(false);
        setLoading(false);
        dispatch(setReload());
        // toast.success("Successfully registered!");

        // dispatch(clearMessage());
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setFormData(data);
  }, [data]);
  // console.log("apart" + data);
  const resetInput = (e) => {
    e.target.value = "";
  };
  // console.log(data);
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
        size="sm"
        // fullScreen={isMobile}
        opened={updateModalOpened}
        onClose={() => setUpdateModalOpened(false)}
      >
        <div>
          <Formik
            initialValues={initialValues}
            // validationSchema={SignupSchema}
            onSubmit={(values) => {
              // console.log(values);
              setLoading(true);
              dispatch(update(values))
                .unwrap()
                .then(() => {
                  setUpdateModalOpened(false);
                  setLoading(false);
                  dispatch(allApartments());
                  toast.success("Successfully Updated");

                  // dispatch(clearMessage());
                })
                .catch(() => {
                  toast.error("Somthing wrong!");
                  setLoading(false);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Apartment secton  */}
                <div className={Styles.widget__innerCard}>
                  <div className={Styles.widget__card__content}>
                    <span></span>
                    <span>{<UilBuilding />}</span>

                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // gap: "5px",
                        paddingRight: "8px",
                      }}
                    >
                      Apartment Details{" "}
                      <Switch
                        onLabel="ON"
                        offLabel="OFF"
                        checked={checked}
                        onChange={(event) =>
                          setChecked(event.currentTarget.checked)
                        }
                      />
                    </span>
                  </div>
                </div>
                {checked && (
                  <>
                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="apartmentName"
                          className={Styles.input__label}
                        >
                          Apartment name
                        </label>
                        <Field name="apartmentDetails.apartmentName" />
                        {errors.apartmentName && touched.apartmentName ? (
                          <div className={Styles.input__error}>
                            {errors.apartmentName}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="apartment_number"
                          className={Styles.input__label}
                        >
                          Apartment number
                        </label>
                        <Field name="apartmentDetails.apartment_number" />
                        {errors.apartment_number && touched.apartment_number ? (
                          <div className={Styles.input__error}>
                            {errors.apartment_number}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="apartmentType"
                          className={Styles.input__label}
                        >
                          Apartment Type
                        </label>
                        <Field
                          name="apartmentDetails.apartmentType"
                          component="select"
                        >
                          <option value="">Type</option>
                          <option value="family">Family</option>
                          <option value="bachelor">Bachelor</option>
                        </Field>
                        {errors.apartmentType && touched.apartmentType ? (
                          <div className={Styles.input__error}>
                            {errors.apartmentType}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="roomNumber"
                          className={Styles.input__label}
                        >
                          Room no
                        </label>
                        <Field name="apartmentDetails.roomNumber" />
                        {errors.roomNumber && touched.roomNumber ? (
                          <div className={Styles.input__error}>
                            {errors.roomNumber}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="number_of_bed_room"
                          className={Styles.input__label}
                        >
                          Beds
                        </label>
                        <Field
                          name="apartmentDetails.number_of_bed_room"
                          type="number"
                        />
                        {errors.number_of_bed_room &&
                        touched.number_of_bed_room ? (
                          <div className={Styles.input__error}>
                            {errors.number_of_bed_room}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="number_of_balcony"
                          className={Styles.input__label}
                        >
                          Balcony
                        </label>
                        <Field
                          name="apartmentDetails.number_of_balcony"
                          type="number"
                        />
                        {errors.number_of_balcony &&
                        touched.number_of_balcony ? (
                          <div className={Styles.input__error}>
                            {errors.number_of_balcony}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="number_of_kitchen"
                          className={Styles.input__label}
                        >
                          Kitchen
                        </label>
                        <Field
                          name="apartmentDetails.number_of_kitchen"
                          type="number"
                        />
                        {errors.number_of_kitchen &&
                        touched.number_of_kitchen ? (
                          <div className={Styles.input__error}>
                            {errors.number_of_kitchen}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="number_of_baths"
                          className={Styles.input__label}
                        >
                          Bath
                        </label>
                        <Field
                          name="apartmentDetails.number_of_baths"
                          type="number"
                        />
                        {errors.number_of_baths && touched.number_of_baths ? (
                          <div className={Styles.input__error}>
                            {errors.number_of_baths}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className={Styles.input__container}>
                      <label
                        htmlFor="apartment_length"
                        className={Styles.input__label}
                      >
                        Apartment length
                      </label>
                      <Field
                        name="apartmentDetails.apartment_length"
                        type="number"
                      />
                      {errors.apartment_length && touched.apartment_length ? (
                        <div className={Styles.input__error}>
                          {errors.apartment_length}
                        </div>
                      ) : null}
                    </div>
                  </>
                )}

                {/* bill secton  */}
                <div className={Styles.widget__innerCard}>
                  <div className={Styles.widget__card__content}>
                    <span></span>
                    <span>{<UilReceipt />}</span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // gap: "5px",
                        paddingRight: "8px",
                      }}
                    >
                      bill Details{" "}
                      <Switch
                        onLabel="ON"
                        offLabel="OFF"
                        checked={billChecked}
                        onChange={(event) =>
                          setBillChecked(event.currentTarget.checked)
                        }
                      />
                    </span>
                  </div>
                </div>
                {billChecked && (
                  <>
                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label htmlFor="rent" className={Styles.input__label}>
                          Rent
                        </label>
                        <Field name="billDetails.rent" type="number" />
                        {errors.rent && touched.rent ? (
                          <div className={Styles.input__error}>
                            {errors.rent}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="gas_bill"
                          className={Styles.input__label}
                        >
                          Gas bill
                        </label>
                        <Field name="billDetails.gas_bill" type="number" />
                        {errors.gas_bill && touched.gas_bill ? (
                          <div className={Styles.input__error}>
                            {errors.gas_bill}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="water_bill"
                          className={Styles.input__label}
                        >
                          Water bill
                        </label>
                        <Field name="billDetails.water_bill" type="number" />
                        {errors.water_bill && touched.water_bill ? (
                          <div className={Styles.input__error}>
                            {errors.water_bill}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="service_charge"
                          className={Styles.input__label}
                        >
                          Service charge
                        </label>
                        <Field
                          name="billDetails.service_charge"
                          type="number"
                        />
                        {errors.service_charge && touched.service_charge ? (
                          <div className={Styles.input__error}>
                            {errors.service_charge}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.input__container}>
                      <label htmlFor="others" className={Styles.input__label}>
                        Others
                      </label>
                      <Field name="billDetails.others" type="number" />
                      {errors.others && touched.others ? (
                        <div className={Styles.input__error}>
                          {errors.others}
                        </div>
                      ) : null}
                    </div>
                  </>
                )}

                <button
                  className={Styles.submit_button}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default UpdateApartment;
