import styles from "../../styles/SignIn.module.css";

const AuthInput = ({
  type,
  title,
  value,
  onChange,
  onFocus,
  onBlur,
  name,
  error,
  icon,
  required,
}) => {
  return (
    <div className={styles.form__group}>
      <div
        className={`${styles.form__group__content} ${styles.relative__form__group}`}
      >
        {icon}
        <input
          placeholder="not necessary"
          className={styles.form__input}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
        />
        <label
          className={`${styles.form__lable} ${styles.absolute__form__lable}`}
        >
          {title}
        </label>
      </div>
      {error && (
        <p id="filled_success" className="error">
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
