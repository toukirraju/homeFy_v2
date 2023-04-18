import { useDispatch } from "react-redux";
import { clearMessage } from "../../../redux/slices/message";
import styles from "./Error.module.css";
const ErrorMessage = ({ message }) => {
  const dispatch = useDispatch();
  return (
    <div class={styles.error__wrapper}>
      <div class={styles.error__container}>
        <span class={styles.error__message}>{message}</span>
      </div>
      <div class={styles.error__btn} onClick={() => dispatch(clearMessage())}>
        <span class={styles.error__btn__icon}>X</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
