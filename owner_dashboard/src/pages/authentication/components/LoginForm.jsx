import { Formik } from "formik";
import { useState } from "react";
import Style from "../styles/loginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { UilEstate } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import AlertPoPUP from "../../../Components/AlertPoPUP";
import { clearMessage } from "../../../redux/slices/message";

const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  cpassword: "",
  phone: "",
  role: "",
};

const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.username) {
    errors.username = "Username is required";
  }
  //  else if (!regex.test(values.username)) {
  //   errors.username = "Invalid Email";
  // }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password too short";
  }

  if (!values.cpassword) {
    // console.log(values.cpassword);
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password does not match";
  }

  return errors;
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPending } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [isSignUp, setIsSignUp] = useState(false);

  const submitForm = (values, { resetForm }) => {
    resetForm();
    if (isSignUp) {
      dispatch(register(values))
        .unwrap()
        .then(() => {
          toast.success("Successfully registred");
          dispatch(clearMessage());
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(login(values))
        .unwrap()
        .then(() => {
          toast.success("Successfully login");
          dispatch(clearMessage());
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
          resetForm,
        } = formik;
        return (
          <div className={Style.container}>
            {message && <AlertPoPUP message={message} />}

            <h3 className={Style.title}>
              {isSignUp
                ? "Sign up for new account"
                : "Sign for Owner Dashboard"}
            </h3>
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div
                  className={Style.form__row}
                  style={{ display: "flex", gap: "10px" }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <label htmlFor="firstname">First name</label>
                    <input
                      type="firstname"
                      name="firstname"
                      id="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.firstname && touched.firstname
                          ? "input-error"
                          : null
                      }
                    />
                    {errors.firstname && touched.firstname && (
                      <span className={Style.error}>{errors.firstname}</span>
                    )}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <label htmlFor="lastname">Last name</label>
                    <input
                      type="lastname"
                      name="lastname"
                      id="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.lastname && touched.lastname
                          ? "input-error"
                          : null
                      }
                    />
                    {errors.lastname && touched.lastname && (
                      <span className={Style.error}>{errors.lastname}</span>
                    )}
                  </div>
                </div>
              )}

              <div className={Style.form__row}>
                <label htmlFor="username">Email/Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username ? "input-error" : null
                  }
                />
                {errors.username && touched.username && (
                  <span className={Style.error}>{errors.username}</span>
                )}
              </div>

              <div
                className={Style.form__row}
                style={{ display: "flex", gap: "10px" }}
              >
                <div style={{ flexGrow: 1 }}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? Style.input__error
                        : null
                    }
                  />
                  {errors.password && touched.password && (
                    <span className={Style.error}>{errors.password}</span>
                  )}
                </div>
                {isSignUp && (
                  <div style={{ flexGrow: 1 }}>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      value={values.cpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.cpassword && touched.cpassword
                          ? Style.input__error
                          : null
                      }
                    />
                    {errors.cpassword && touched.cpassword && (
                      <span className={Style.error}>{errors.cpassword}</span>
                    )}
                  </div>
                )}
              </div>

              {isSignUp && (
                <div className={Style.form__row}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.phone && touched.phone ? "input-error" : null
                    }
                  />
                  {errors.phone && touched.phone && (
                    <span className={Style.error}>{errors.phone}</span>
                  )}
                </div>
              )}

              {isSignUp && (
                <div className={Style.form__row}>
                  <label htmlFor="role">Role</label>

                  <select
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // style={{ display: "block" }}
                  >
                    <option value="" label="Select a role">
                      Select a role{" "}
                    </option>
                    <option value="owner" label="owner">
                      owner
                    </option>
                    <option value="manager" label="manager">
                      manager
                    </option>
                  </select>
                  {errors.role && touched.role && (
                    <span className="input-feedback">{errors.role}</span>
                  )}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span
                    className={Style.isAccount}
                    onClick={() => {
                      setIsSignUp((prev) => !prev);
                      resetForm();
                      // dispatch(clearMessage());
                    }}
                  >
                    {isSignUp
                      ? "Already have an account. Sign in"
                      : "Don't have an account? Sign Up"}
                  </span>
                </div>
                {isSignUp && <div></div>}
              </div>

              <button
                type="submit"
                className={
                  !(dirty && isValid) ? "disabled-btn" : Style.signinButton
                }
                disabled={!(dirty && isValid)}
                style={{ margin: "auto" }}
              >
                {/* {isSignUp ? "Sign up" : "Sign in"} */}
                {isPending ? (
                  <LoadingSpinner />
                ) : isSignUp ? (
                  "Sign up"
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
