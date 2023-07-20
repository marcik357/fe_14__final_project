import FormikForm from '../FormikForm';
import { validationSchemaLogin } from '../../validation';
import { logInFormFields } from './logInFormFields';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { setErrorAction } from '../../redux/actions/errorActions';
import { setModalType } from '../../redux/actions/modalActions';
import { fetchData } from '../../utils';
import { baseUrl, reqPost } from '../../utils/vars';


export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmitHandler(values) {
    try {
      const response = await fetchData(`${baseUrl}customers/login`, reqPost(JSON.stringify(values)))
      const token = response.token;
      localStorage.setItem('token', token);
      dispatch(setTokenAction(token));
      navigate("/")
    } catch (error) {
      dispatch(setErrorAction(error.message));
      dispatch(setModalType('error'))
    }
  }

  return (
    <FormikForm
      initialValues={{
        loginOrEmail: '',
        password: '',
      }}
      validationSchema={validationSchemaLogin}
      fields={logInFormFields}
      callback={onSubmitHandler}
      submitBtn='Log In' />
  )
}
