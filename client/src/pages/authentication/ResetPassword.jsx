import styles from "./styles/SignIn.module.css";
import logo from "../../assets/logo.png";
import ReturnButton from "./components/ui/ReturnButton";
import AuthInput from "./components/ui/AuthInput";
import AuthButton from "./components/ui/AuthButton";
const ResetPassword = () => {
  return (
    <div className={`relative ${styles.auth__body}`}>
      <div className={styles.auth__card__wrapper}>
        <div className={styles.auth__card__container}>
          <div
            className={`${styles.left__container} ${styles.left__card__order}`}
          >
            {/* Form title  */}
            <p className={styles.form__title}>Reset Password</p>

            <form>
              <AuthInput
                required
                name="password"
                // value={formValue.password}
                // onChange={handleChange}
                title="New password"
                icon={
                  <i className={`fa-solid fa-lock ${styles.form__icon}`}></i>
                }
                // onBlur={handleBlur}
                // error={touchedFields.password && errors.password}
              />

              <AuthInput
                required
                name="confirmPassword"
                // value={formValue.confirmPassword}
                // onChange={handleChange}
                title="Re-enter new password"
                icon={
                  <i className={`fa-solid fa-lock ${styles.form__icon}`}></i>
                }
                // onBlur={handleBlur}
                // error={touchedFields.confirmPassword && errors.confirmPassword}
              />
              <AuthButton
                title="Continue"
                authType="submit"
                // loading={loading}
                // disabled={loading}
              />
            </form>
          </div>
          <div
            className={`${styles.right_container} ${styles.right__card__order}`}
          >
            <img className={styles.right__image} src={logo} alt="" />

            <ReturnButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
