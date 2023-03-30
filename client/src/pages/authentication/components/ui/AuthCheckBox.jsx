import styles from "../../styles/SignIn.module.css";

const AuthCheckBox = ({
  type,
  title,
  value,
  checked,
  onChange,
  name,
  error,
}) => {
  return (
    <div>
      <input
        className={styles.form__check}
        type={type}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label
        style={{
          color: "lightgray",
          fontSize: "12px",
          fontWeight: "normal",
        }}
      >
        {title}
      </label>
      {error && (
        <p id="filled_success" className={styles.form__message}>
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthCheckBox;
