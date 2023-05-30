import styles from "./styles/SignIn.module.css";
import logo from "../../assets/logo.png";
import ReturnButton from "./components/ui/ReturnButton";
import AuthInput from "./components/ui/AuthInput";
import AuthButton from "./components/ui/AuthButton";
import { useNavigate, useParams } from "react-router-dom";
import isTokenExpired from "../../utility/checkTokenExpiration";
import { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../redux/features/users/userApi";
import Alert from "../../Components/UI/Alert";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [resetPassword, { data, isLoading, isError, isSuccess, error }] =
    useResetPasswordMutation();
  const isExpired = isTokenExpired(token);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      resetPassword({
        id,
        token,
        password,
      });
    } else {
      setConfirmPasswordError("Passwords do not match");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/signin");
      toast.success(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className={`relative ${styles.auth__body}`}>
      <div className={styles.auth__card__wrapper}>
        <div className={styles.auth__card__container}>
          <div
            className={`${styles.left__container} ${styles.left__card__order}`}
          >
            {/* Form title  */}
            <p className={styles.form__title}>Reset Password</p>

            {isError && error && (
              <Alert message={error?.data?.message} type="error" />
            )}

            {isExpired ? (
              <Alert
                message={
                  "Token has expired. Please request for a new password reset link."
                }
                type="error"
              />
            ) : (
              <form onSubmit={handleSubmit}>
                <AuthInput
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  title="New password"
                  icon={
                    <i className={`fa-solid fa-lock ${styles.form__icon}`}></i>
                  }
                />

                <AuthInput
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  title="Re-enter new password"
                  icon={
                    <i className={`fa-solid fa-lock ${styles.form__icon}`}></i>
                  }
                  onBlur={() => {
                    if (password !== confirmPassword) {
                      setConfirmPasswordError("Passwords do not match");
                    } else {
                      setConfirmPasswordError(null);
                    }
                  }}
                  error={confirmPasswordError}
                />
                <AuthButton
                  title="Continue"
                  authType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                />
              </form>
            )}
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
