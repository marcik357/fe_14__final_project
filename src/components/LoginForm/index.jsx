import style from './loginForm.module.scss';
import { Formik, Form } from 'formik';
import Input from '../Input';
import { validationSchemaLogin } from '../../validation';
import { login } from '../../utils';
import { useDispatch } from 'react-redux';


export default function LoginForm() {
  const dispatch = useDispatch()

    const logInFormFields = [
        {
          tagType: 'regular',
          label: "Login or Email",
          labelClass: style.form__label,
          inputClass: style.form__input,
          errorClass: style.form__error,
          id: "loginOrEmail",
          name: "loginOrEmail",
          type: "text",
          placeholder: "Enter your login or email",
        },
        {
          tagType: 'regular',
          label: "Password",
          labelClass: style.form__label,
          inputClass: style.form__input,
          errorClass: style.form__error,
          id: "password",
          name: "password",
          type: "password",
          placeholder: "Enter your password",
        }
      ];
  return (
    <Formik
      initialValues={{
        loginOrEmail: '',
        password: '',
      }}
      validationSchema={validationSchemaLogin}
      onSubmit={async (values, { setSubmitting }) => {
        login('https://plankton-app-6vr5h.ondigitalocean.app/api/customers/login', values, dispatch)
        // повідомлення про успішний вхід
        setSubmitting(false);
      }} >
      <Form className={style.form}>
        {logInFormFields.map(field => (
          <Input key={field.name} {...field} />
        ))}
        <button text='Checkout' className={style.form__submit} type='submit'>Log In</button>
      </Form>
    </Formik>
  )
}
