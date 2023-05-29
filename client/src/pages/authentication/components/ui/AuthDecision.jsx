import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/SignIn.module.css";
import { UilAngleLeftB } from "@iconscout/react-unicons";

const AuthDecision = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/signin" && (
        <>
          <div className="flex text-sm justify-between">
            <Link
              to="/forget-password"
              className="text-gray-100 hover:underline hover:text-stone-200"
            >
              Forgot your password?
            </Link>

            <Link
              to="/signup"
              className="text-gray-100 hover:underline hover:text-stone-200"
            >
              Sign Up
            </Link>
          </div>

          <div className="flex gap-1 my-3 flex-col justify-center items-center">
            <span className={styles.form__decision__icon}>
              or you can sign in with
            </span>
            <div className="flex gap-2 ">
              <span className={`${styles.social__icon} ${styles.google}`}>
                <i className="fa-brands fa-google"></i>
              </span>
              <span className={`${styles.social__icon} ${styles.facebook}`}>
                <i className="fa-brands fa-facebook-f"></i>
              </span>
            </div>
          </div>
        </>
      )}

      {pathname === "/signup" && (
        <>
          <Link
            to="/signin"
            className="text-gray-100  text-sm hover:underline hover:text-stone-200"
          >
            I'm already a member
          </Link>
        </>
      )}

      {pathname === "/forget-password" && (
        <>
          <Link
            to="/signin"
            className="text-gray-100 flex items-center  text-sm hover:underline hover:text-stone-200"
          >
            <UilAngleLeftB /> Back to sign in
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthDecision;
