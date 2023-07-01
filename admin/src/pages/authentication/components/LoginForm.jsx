import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
// import { clearMessage } from "../../../redux/slices/message";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import Error from "../../../Components/Error";

const initialValues = {
  username: "",
  password: "",
};

const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password too short";
  }

  return errors;
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.error);

  const [login] = useLoginMutation();

  const submitForm = (values, { resetForm }) => {
    resetForm();
    login(values)
      .unwrap()
      .then(() => {
        toast.success("Successfully login");
        navigate("/dashboard");
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;
        return (
          <div className="w-full md:w-4/6 px-3">
            <h3 className="text-2xl font-extrabold uppercase dark:text-gray-300 mx-auto my-2">
              Sign in
            </h3>
            {error && <Error message={error?.data?.message} />}
            <form onSubmit={handleSubmit}>
              <div className="w-full flex gap-1 text-gray-600 dark:text-gray-300 flex-col">
                <label htmlFor="username">Email/Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username ? "error" : null
                  }
                />
                {errors.username && touched.username && (
                  <span className="error">{errors.username}</span>
                )}
              </div>

              <div className="w-full flex gap-1 text-gray-600 dark:text-gray-300 flex-col mb-8">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? "error" : null
                  }
                />
                {errors.password && touched.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className="py-2 px-3 primaryButton"
                disabled={!(dirty && isValid)}
              >
                {/* {isPending ? <LoadingSpinner /> : "Sign in"} */}
                sign in
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
