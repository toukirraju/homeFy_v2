import * as yup from "yup";

const createAdminSchema = yup.object().shape({
  firstname: yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
  lastname: yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
  username: yup.string().email().required(),
  phone: yup
    .string()
    .matches(/^(\+88|88)?(01[3-9]\d{8})$/)
    .required(),
  password: yup.string().min(4).required(),
  role: yup.string().required(),
});

export default createAdminSchema;
