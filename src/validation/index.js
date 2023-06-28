import * as Yup from 'yup';

export const validationSchemaCart = Yup.object({
  firstName: Yup.string()
    .min(2, 'Має містити принаймні 2 літери')
    .max(25, 'Може бути не більше 25 символів')
    .trim()
    .required("Обов'язкове поле!"),
  lastName: Yup.string()
    .min(2, 'Має містити принаймні 2 літери')
    .max(25, 'Може бути не більше 25 символів')
    .trim()
    .required("Обов'язкове поле!"),
  login: Yup.string()
    .min(3, 'Має містити принаймні 3 літери')
    .max(25, 'Може бути не більше 25 символів')
    .trim()
    .required("Обов'язкове поле!"),
  password: Yup.string()
    .min(6, 'Має містити принаймні 6 символів')
    .max(18, 'Може бути не більше 18 символів')
    .trim()
    .required("Обов'язкове поле!"),
  email: Yup.string().email('Invalid email').required('Required'),
  // telephone: Yup.string()
  //   .matches(/^[^#]*$/)
  //   .required("Обов'язкове поле!"),
})