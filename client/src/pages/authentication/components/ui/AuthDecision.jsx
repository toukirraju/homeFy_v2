import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/SignIn.module.css";

const AuthDecision = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.form__decision}>
      {pathname === "/signin" && (
        <>
          <Link to="/signup" className={styles.form__decision__link}>
            Create an account
          </Link>
          <span className={styles.form__decision__icon}>
            <b>or</b> login with
          </span>
          <span className={`${styles.social__icon} ${styles.google}`}>
            <i className="fa-brands fa-google"></i>
          </span>
          <span className={`${styles.social__icon} ${styles.facebook}`}>
            <i className="fa-brands fa-facebook-f"></i>
          </span>
        </>
      )}

      {pathname === "/signup" && (
        <>
          <Link to="/signin" className={styles.form__decision__link}>
            I'm already a member
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthDecision;
