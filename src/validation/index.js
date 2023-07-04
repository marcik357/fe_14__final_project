import * as Yup from 'yup';

export const validationSchemaUser = Yup.object({
  firstName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+$/, 'Must be a-z A-Z а-я А-Я')
    .trim()
    .required("Required Field!"),
  lastName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+$/, 'Must be a-z A-Z а-я А-Я')
    .trim()
    .required("Required Field!"),
  login: Yup.string()
    .min(3, 'Must contain at least 3 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Must be a-z A-Z 0-9')
    .trim()
    .required("Required Field!"),
  password: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Must be a-z A-Z 0-9')
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

export const validationSchemaProduct = Yup.object().shape({
  enabled: Yup.boolean(),
  imageUrls: Yup.array().of(Yup.string()),
  quantity: Yup.number().integer().positive(),
  _id: Yup.string(),
  name: Yup.string(),
  author: Yup.string(),
  categories: Yup.string(),
  theme: Yup.array().of(Yup.string()),
  currentPrice: Yup.number().positive(),
  details: Yup.string(),
  itemNo: Yup.string(),
});
