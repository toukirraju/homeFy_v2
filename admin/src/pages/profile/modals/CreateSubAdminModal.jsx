import Styles from "./ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Formik, Form, Field } from "formik";
import createAdminSchema from "../../../utility/validators/createAdminSchema";
import { useCreateAdminMutation } from "../../../redux/features/profile/profileApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Error from "../../../Components/Error";

function CreateSubAdminModal({ modalOpened, setModalOpened }) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const error = useSelector((state) => state.error);
  const [createAdmin, { isError, isLoading, isSuccess }] =
    useCreateAdminMutation();

  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    username: "",
    role: "",
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully created");
      setModalOpened(false);
    }
  }, [isSuccess]);

  return (
    <Modal
      classNames={{
        modal: `bg-gray-300 dark:bg-gray-800`,
        title: `modal__title`,
        close: `modal__close`,
      }}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="sm"
      fullScreen={isMobile}
      opened={modalOpened}
      title="create sub-admin"
      onClose={() => setModalOpened(false)}
    >
      {error && <Error message={error?.data?.message} />}
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={createAdminSchema}
          onSubmit={(values) => {
            // same shape as initial values
            createAdmin(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={`dark:text-gray-100 ${Styles.input__container}`}>
                <label
                  htmlFor="firstname"
                  className={`dark:text-gray-100 ${Styles.input__label}`}
                >
                  First Name
                </label>
                <Field name="firstname" />
                {errors.firstname && touched.firstname ? (
                  <div className={Styles.input__error}>{errors.firstname}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label
                  htmlFor="lastname"
                  className={`dark:text-gray-100 ${Styles.input__label}`}
                >
                  Last Name
                </label>
                <Field name="lastname" />
                {errors.lastname && touched.lastname ? (
                  <div className={Styles.input__error}>{errors.lastname}</div>
                ) : null}
              </div>

              <div className={Styles.input__container}>
                <label
                  htmlFor="phone"
                  className={`dark:text-gray-100 ${Styles.input__label}`}
                >
                  Phone Number
                </label>
                <Field name="phone" />
                {errors.phone && touched.phone ? (
                  <div className={Styles.input__error}>{errors.phone}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label
                  htmlFor="username"
                  className={`dark:text-gray-100 ${Styles.input__label}`}
                >
                  Email
                </label>
                <Field name="username" />
                {errors.username && touched.username ? (
                  <div className={Styles.input__error}>{errors.username}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label
                  htmlFor="password"
                  className={`dark:text-gray-100 ${Styles.input__label}`}
                >
                  Password
                </label>
                <Field name="password" type="password" />
                {errors.password && touched.password ? (
                  <div className={Styles.input__error}>{errors.password}</div>
                ) : null}
              </div>

              <div className={Styles.input__container}>
                <label
                  htmlFor="role"
                  className={`dark:text-gray-100 ${Styles.input__label}`}
                >
                  Role:
                </label>
                <Field as="select" name="role">
                  <option value="">select your role</option>
                  <option value="admin">admin</option>
                  <option value="editor">editor</option>
                  <option value="viewer">viewer</option>
                </Field>
                {errors.role && touched.role ? (
                  <div className={Styles.input__error}>{errors.role}</div>
                ) : null}
              </div>
              <button className="primaryButton px-3 py-2" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default CreateSubAdminModal;
