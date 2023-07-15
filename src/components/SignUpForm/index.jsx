import { signInFormFields } from './signUpFormFields';
import { validationSchemaUser } from '../../validation';
import { fetchData } from '../../utils';
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';
import { baseUrl } from '../../utils/vars';
import FormikForm from '../FormikForm';

export default function SignUpForm({ callback }) {
  const dispatch = useDispatch();

  async function onSubmitHandler(values) {
    try {
      await fetchData(`${baseUrl}customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      callback(true)
      dispatch(setModalType('registred'))
    } catch (error) {
      dispatch(setErrorAction(error.message));
      dispatch(setModalType('error'))
    }
  }

  return (
    <FormikForm
      initialValues={{
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        password: '',
        telephone: '',
      }}
      validationSchema={validationSchemaUser}
      fields={signInFormFields}
      callback={onSubmitHandler}
      submitBtn='Sign Up' />
  )
}