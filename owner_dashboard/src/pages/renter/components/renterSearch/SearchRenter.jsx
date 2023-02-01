import React, { useState } from "react";
import styles from "./SearchRenter.module.css";
import { UilSearch, UilTimes } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { searchRenter } from "../../../../redux/slices/renterSlice";
import SearchPopUp from "../../modals/SearchPopUp";
import { Loader } from "@mantine/core";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const ValidatinSchema = Yup.object().shape({
  search: Yup.string().required("Required"),
});

const SearchRenter = () => {
  const dispatch = useDispatch();
  const initialValues = {
    search: "",
  };
  const [loading, setLoading] = useState(false);
  const [searchPopUp, setSearchPopUp] = useState(false);
  const [searchData, setSearchData] = useState({});

  return (
    <>
      <SearchPopUp
        searchPopUp={searchPopUp}
        setSearchPopUp={setSearchPopUp}
        data={searchData}
      />
      {loading ? <Loader color="teal" variant="bars" /> : null}

      <div className={styles.Search_Wrapper}>
        {/* <img src={Logo} alt="" /> */}
        <Formik
          initialValues={initialValues}
          validationSchema={ValidatinSchema}
          onSubmit={(values) => {
            // same shape as initial values
            // console.log(values);
            setLoading(true);
            dispatch(searchRenter(values.search))
              .unwrap()
              .then((res) => {
                setLoading(false);
                setSearchData(res.renter);
                setSearchPopUp(true);
              })
              .catch((error) => {
                setLoading(false);
              });
          }}
        >
          {({ errors, touched, resetForm }) => (
            <Form>
              <div className={styles.Search}>
                <Field
                  type="text"
                  name="search"
                  placeholder="#Find Renter"
                  // onChange={(e) => setSearchId(e.target.value)}
                />
                {errors.search && touched.search ? (
                  <div className={styles.input__error}>{errors.search}</div>
                ) : null}
                <div className={styles.s_buttons}>
                  {initialValues && (
                    <UilTimes cursor="pointer" onClick={() => resetForm()} />
                  )}

                  <button className={styles.s_icon} type="submit">
                    <UilSearch />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SearchRenter;
