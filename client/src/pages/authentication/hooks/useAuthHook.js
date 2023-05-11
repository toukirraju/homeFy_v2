import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../../redux/features/auth/authRTKquery";
import {
  clearMessage,
  setError,
  setMessage,
} from "../../../redux/slices/message";
import { authValidation } from "../../../utility/validations/authValidation";
import { useGoogleAnalytics } from "../../../hooks/useGoogleAnalytics";

export const useAuthHook = ({ authType }) => {
  const dispatch = useDispatch();
  const { trackEvent } = useGoogleAnalytics();
  const [
    signIn,
    {
      isLoading: signInLoading,
      isSuccess: signInSuccess,
      isError: isSignInError,
      error: signInError,
    },
  ] = useSignInMutation();
  const [
    signUp,
    {
      isLoading: signUpLoading,
      isSuccess: signUpSuccess,
      isError: isSignUpError,
      error: signUpError,
    },
  ] = useSignUpMutation();
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
  const [loading, setLoading] = useState(false);

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
        trackEvent("User", "Logged in", "Signin");
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

  useEffect(() => {
    setLoading(false);
    if (signInLoading || signUpLoading) {
      setLoading(true);
    }
  }, [signInLoading, signUpLoading]);

  useEffect(() => {
    dispatch(clearMessage());
    if (isSignInError || isSignUpError) {
      dispatch(setError(signInError || signUpError));
    }
  }, [isSignInError, isSignUpError]);

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
    loading,
    errors,
  };
};
