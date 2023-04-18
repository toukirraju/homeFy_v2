import { useState } from "react";
import { useSelector } from "react-redux";
import ErrorMessage from "../../../Components/UI/Error/ErrorMessage";
import { useAuthHook } from "../hooks/useAuthHook";
import styles from "../styles/SignIn.module.css";
import AuthButton from "./ui/AuthButton";
import AuthCheckBox from "./ui/AuthCheckBox";
import AuthDecision from "./ui/AuthDecision";
import AuthInput from "./ui/AuthInput";

const AuthForm = ({ authType }) => {
  const {
    formValue,
    touchedFields,
    loading,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    handleFocus,
  } = useAuthHook({ authType });
  const { errorMessage } = useSelector((state) => state.message);

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <ErrorMessage message={errorMessage?.data.message} />}

      {authType === "signupForm" && (
        <AuthInput
          required
          name="fullname"
          value={formValue.fullname}
          onChange={handleChange}
          title="Full Name"
          icon={<i className={`fa-solid fa-user ${styles.form__icon}`}></i>}
          // onFocus={handleFocus}
          onBlur={handleBlur}
          error={touchedFields.fullname && errors.fullname}
        />
      )}
      <AuthInput
        required
        name="username"
        value={formValue.username}
        onChange={handleChange}
        title="E-mail"
        icon={<i className={`fa-solid fa-envelope ${styles.form__icon}`}></i>}
        // onFocus={handleFocus}
        onBlur={handleBlur}
        error={touchedFields.username && errors.username}
      />
      {authType === "signupForm" && (
        <AuthInput
          required
          name="phone"
          value={formValue.phone}
          onChange={handleChange}
          title="Phone"
          authType="tel"
          icon={<i className={`fa-solid fa-phone ${styles.form__icon}`}></i>}
          // onFocus={handleFocus}
          onBlur={handleBlur}
          error={touchedFields.phone && errors.phone}
        />
      )}
      <AuthInput
        required
        name="password"
        value={formValue.password}
        onChange={handleChange}
        title="Password"
        icon={<i className={`fa-solid fa-lock ${styles.form__icon}`}></i>}
        type="password"
        // onFocus={handleFocus}
        onBlur={handleBlur}
        error={touchedFields.password && errors.password}
      />

      {authType === "signupForm" && (
        <AuthInput
          required
          name="cpassword"
          value={formValue.cpassword}
          onChange={handleChange}
          title="Confirm Password"
          type="password"
          icon={<i className={`fa-solid fa-lock ${styles.form__icon}`}></i>}
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={
            touchedFields.cpassword &&
            formValue.password !== formValue.cpassword &&
            errors.cpassword
          }
        />
      )}

      {authType === "signupForm" && (
        <AuthCheckBox
          title="I will agree all terms & conditions"
          type="checkbox"
          name="agree"
          onChange={handleChange}
          checked={formValue.agree}
          error={touchedFields.fullname && errors.agree}
        />
      )}

      <AuthDecision />

      {/* submit button  */}
      <div className={styles.center__button}>
        <AuthButton
          title={authType === "signupForm" ? "Register" : "Log in"}
          authType="submit"
          loading={loading}
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default AuthForm;
