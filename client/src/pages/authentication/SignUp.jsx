import styles from "./styles/SignIn.module.css";
import logo from "../../assets/logo.png";
import AuthForm from "./components/AuthForm";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className={styles.auth__body}>
      <div className={styles.auth__card__wrapper}>
        <div className={styles.auth__card__container}>
          <div
            className={`${styles.left__container} ${styles.left__card__order}`}
          >
            {/* Form title  */}
            <p className={styles.form__title}>Sign up</p>
            {/* Form  */}
            <AuthForm authType="signupForm" />
          </div>
          <div
            className={`${styles.right_container} ${styles.right__card__order}`}
          >
            <img className={styles.right__image} src={logo} alt="" />

            <div class={styles.return__container}>
              <Link to="/">
                <span class={styles.return__button}>Return HomeFy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;