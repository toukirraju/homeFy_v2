import styles from "./styles/SignIn.module.css";
import logo from "../../assets/logo.png";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import ReturnButton from "./components/ui/ReturnButton";
const SignIn = () => {
  return (
    <div className={`relative ${styles.auth__body}`}>
      <Header />
      <div className={styles.auth__card__wrapper}>
        <div className={styles.auth__card__container}>
          <div
            className={`${styles.left__container} ${styles.left__card__order}`}
          >
            {/* Form title  */}
            <p className={styles.form__title}>Sign in</p>
            {/* Form  */}
            <AuthForm />
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

export default SignIn;
