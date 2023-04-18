import styles from "../../styles/SignIn.module.css";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const AuthButton = ({ type, title, icon, disabled, loading }) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles.form__submit__btn}`}
      disabled={disabled}
    >
      {loading ? (
        <>
          {title}
          <LoadingSpinner />
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default AuthButton;
