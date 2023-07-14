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
    .max(10, 'Can be no more than 10 characters')
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
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .required("Required Field!"),
});

export const validationSchemaOrder = Yup.object({
  name: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+$/, 'Must be a-z A-Z а-я А-Я')
    .trim()
    .required("Required Field!"),
    email: Yup.string()
    .email('Invalid email')
    .required('Required'),
    telephone: Yup.string()
    .matches(/^\+380\d{3}\d{2}\d{2}\d{2}$/)
    .required("Required Field!"),
});

export const validationSchemaCard = Yup.object({
  cardNumber: Yup.string()
  .label('Card Number')
  .length(19)
  .required("Required Field!"),
  validity:Yup.string()
  .typeError('Not a valid expiration date. Example: MM/YY')
  .max(5, 'Not a valid expiration date. Example: MM/YY')
  .matches(
    /([0-9]{2})\/([0-9]{2})/,
    'Not a valid expiration date. Example: MM/YY')
  .required('Expiration date is required'),
  cvv: Yup.string()
    .label('CVV')
    .length(3)
    .required(),
});

export const validationSchemaProduct = Yup.object().shape({
  enabled: Yup.boolean(),
  imageUrls: Yup.array().of(Yup.string()).required("Required Field!"),
  quantity: Yup.number().integer().positive().required("Required Field!"),
  _id: Yup.string(),
  name: Yup.string().required("Required Field!"),
  author: Yup.string().required("Required Field!"),
  categories: Yup.string().required("Required Field!"),
  theme: Yup.array().of(Yup.string()).required("Required Field!"),
  currentPrice: Yup.number().positive().required("Required Field!"),
  details: Yup.string(),
  itemNo: Yup.string(),
});
