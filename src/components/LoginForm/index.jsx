import style from './loginForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Input from '../Input';
import { logInFormFields } from './logInFormFields';
import { validationSchemaLogin } from '../../validation';
import { fetchData, postData } from '../../utils';
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { baseUrl } from '../../utils/vars';


export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        loginOrEmail: '',
        password: '',
      }}
      validationSchema={validationSchemaLogin}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await fetchData(`${baseUrl}customers/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          const token = response.token;
          localStorage.setItem('token', token);
          dispatch(setTokenAction(token));
          navigate("/")
          // await login(`${baseUrl}customers/login`, values, dispatch)
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
