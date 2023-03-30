import styles from "../updateProfile.module.css";

const SingleInput = ({
  title,
  type,
  name,
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
}) => {
  return (
    <div className={styles.form__group}>
      <label className={styles.form__label}>{title}</label>
      <input
        className={styles.form__input}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default SingleInput;
