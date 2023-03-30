import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../../redux/features/auth/authRTKquery";
import { authValidation } from "../../../utility/validations/authValidation";

export const useAuthHook = ({ authType }) => {
  const [signIn, { isSuccess: signInSuccess }] = useSignInMutation();
  const [signUp, { isSuccess: signUpSuccess }] = useSignUpMutation();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    fullname: "",
    username: "",
    phone: "",
    password: "",
    cpassword: "",
    agree: false,
  });

  const [touchedFields, setTouchedFields] = useState({
    fullname: false,
    username: false,
    phone: false,
    password: false,
    cpassword: false,
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormValue({
      fullname: "",
      username: "",
      phone: "",
      password: "",
      cpassword: "",
      agree: false,
    });
    setTouchedFields({
      fullname: false,
      username: false,
      phone: false,
      password: false,
      cpassword: false,
      agree: false,
    });
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleFocus = (e) => {
    setTouchedFields({ ...touchedFields, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    setTouchedFields({ ...touchedFields, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validated = authValidation(formValue, touchedFields, true, authType);

    if (authType === "signupForm") {
      //sign up form
      if (Object.keys(validated).length === 0) {
        console.log("Register");
        signUp(formValue);
      } else {
        console.log("Register error");
      }
    } else {
      // login form

      if (Object.keys(validated).length === 0) {
        signIn({
          username: formValue.username,
          password: formValue.password,
        });
        // console.log(formValue);
      } else {
        console.log("Login error");
      }
    }
  };

  useEffect(() => {
    if (signInSuccess || signUpSuccess) {
      resetForm();
      navigate("/profile");
      toast.success("Success");
    }
  }, [signInSuccess, signUpSuccess]);

  const errors = authValidation(
    formValue,
    touchedFields,
    isSubmitting,
    authType
  );

  return {
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    formValue,
    touchedFields,
    errors,
  };
};
