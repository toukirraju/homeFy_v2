import styles from "../../styles/SignIn.module.css";

const AuthButton = ({ type, title, icon }) => {
  return (
    <button type={type} className={`${styles.btn} ${styles.form__submit__btn}`}>
      {title}
    </button>
  );
};

export default AuthButton;
