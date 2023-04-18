import styles from "./styles/SignIn.module.css";
import logo from "../../assets/logo.png";
import AuthForm from "./components/AuthForm";
import { Link } from "react-router-dom";
import { UilAngleRightB, UilRotate360 } from "@iconscout/react-unicons";
const SignIn = () => {
  return (
    <div className={styles.auth__body}>
      <div className={styles.auth__card__wrapper}>
        <div className={styles.auth__card__container}>
          <div
            className={`${styles.left__container} ${styles.left__card__order}`}
          >
            {/* Form title  */}
            <p className={styles.form__title}>Sign in</p>
            {/* Form  */}
            <AuthForm />

            <div className="text-gray-600 dark:text-slate-400 mt-5 text-justify flex justify-center items-center flex-col">
              <span>Are you Home owner ?</span>
              <span>You can't to manage your home properly?</span>

              <button className="my-2 hover:bg-teal-700 duration-300  bg-teal-600 shadow-md shadow-gray-500 text-gray-300 drop-shadow-md font-bold py-1 px-2 flex justify-center items-center rounded-md">
                Go for Dashboard <UilAngleRightB />
              </button>

              <span>
                Effortlessly manage your property with our user-friendly
                dashboard! log in or register now.
              </span>
            </div>
          </div>
          <div
            className={`${styles.right_container} ${styles.right__card__order}`}
          >
            <img className={styles.right__image} src={logo} alt="" />

            <div className="flex justify-center items-center ">
              <Link to="/">
                <span className="text-gray-400 rounded-md bg-gray-500 duration-300 hover:bg-gray-600 dark:bg-transparent dark:hover:bg-slate-600 dark:hover:bg-opacity-20 shadow-sm shadow-gray-400 px-2 py-1 flex gap-2">
                  <UilRotate360 /> Return HomeFy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
