import style from './loginForm.module.scss';
import { Formik, Form } from 'formik';
import Input from '../Input';
import { validationSchemaLogin } from '../../validation';
import { login } from '../../utils';
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';


export default function LoginForm() {
  const dispatch = useDispatch()
  const baseUrl = 'https://plankton-app-6vr5h.ondigitalocean.app/api/'
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
        try {
          await login(`${baseUrl}customers/login`, values, dispatch)
          setSubmitting(false);
        } catch (error) {
          dispatch(setErrorAction(error.message));
          dispatch(setModalType('error'))
        }
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
