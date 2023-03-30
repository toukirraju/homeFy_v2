export const authValidation = (
  values,
  touchedFields,
  isSubmitting,
  authType
) => {
  let errors = {};

  const nameCheckRegex = /^[a-zA-Z ]{4,30}$/;
  const emailCheckRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // name check
  if (!values.fullname && authType === "signupForm") {
    if (touchedFields.fullname || isSubmitting) {
      errors.fullname = "Full name is required";
    }
  } else if (
    (touchedFields.username || isSubmitting) &&
    authType === "signupForm" &&
    !nameCheckRegex.test(values.fullname)
  ) {
    errors.fullname = "Full name is too short";
  }

  // username check
  if (!values.username) {
    if (touchedFields.username || isSubmitting) {
      errors.username = "Email is required";
    }
  } else if (
    (touchedFields.username || isSubmitting) &&
    !emailCheckRegex.test(values.username)
  ) {
    errors.username = "Invalid Email";
  }

  // phone check
  if (!values.phone && authType === "signupForm") {
    errors.phone = "Phone is required";
  } else if (values.phone.length < 10 && authType === "signupForm") {
    errors.phone = "Phone number is too short";
  }
  // password check
  if (!values.password) {
    if (touchedFields.password || isSubmitting) {
      errors.password = "Password is required";
    }
  } else if (values.password.length < 4) {
    errors.password = "Password too short";
  }
  // confirm password check
  if (!values.cpassword) {
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password does not match";
  }

  // agree check

  if (!values.agree && authType === "signupForm") {
    if (touchedFields.agree || isSubmitting) {
      errors.agree =
        "Please agree to the terms and conditions before registration";
    }
  }

  return errors;
};
