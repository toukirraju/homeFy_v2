import styles from "./styles/SignIn.module.css";
import logo from "../../assets/logo.png";
import ReturnButton from "./components/ui/ReturnButton";
import AuthDecision from "./components/ui/AuthDecision";
import AuthInput from "./components/ui/AuthInput";
import AuthButton from "./components/ui/AuthButton";
import { useState } from "react";
import { useForgetPasswordMutation } from "../../redux/features/users/userApi";
import Alert from "../../Components/UI/Alert";
const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [forgetPassword, { data, isLoading, isError, error, isSuccess }] =
    useForgetPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgetPassword({ username });
  };
  console.log(data);
  return (
    <div className={`relative ${styles.auth__body}`}>
      <div className={styles.auth__card__wrapper}>
        <div className={styles.auth__card__container}>
          <div
            className={`${styles.left__container} ${styles.left__card__order}`}
          >
            {/* Form title  */}
            <p className={styles.form__title}>Forgot Password</p>

            {isSuccess && data && (
              <Alert message={data?.message} type="success" />
            )}

            {isError && error && (
              <Alert message={error?.data?.message} type="error" />
            )}

            <form onSubmit={handleSubmit}>
              <AuthInput
                required
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                title="E-mail"
                icon={
                  <i
                    className={`fa-solid fa-envelope ${styles.form__icon}`}
                  ></i>
                }
              />
              <AuthButton
                title="Continue"
                authType="submit"
                loading={isLoading}
                disabled={isLoading}
              />
            </form>

            <AuthDecision />
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

export default ForgetPassword;
