import * as Yup from 'yup';

export const validationSchemaUser = Yup.object({
  firstName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+$/)
    .trim()
    .required("Required Field!"),
  lastName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+$/)
    .trim()
    .required("Required Field!"),
  login: Yup.string()
    .min(3, 'Must contain at least 3 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Z0-9]+$/)
    .trim()
    .required("Required Field!"),
  password: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[a-zA-Z0-9]+$/)
    .trim()
    .required("Required Field!"),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  telephone: Yup.string()
    .matches(/^\+380\d{3}\d{2}\d{2}\d{2}$/)
    .required("Required Field!"),
})

export const validationSchemaLogin = Yup.object({
  loginOrEmail: Yup.string()
    .required("Required Field!"),
  password: Yup.string()
    .required("Required Field!"),
});