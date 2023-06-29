import style from './signUpForm.module.scss'
import { Formik, Form } from 'formik';
import Input from '../Input';
import InputMasked from '../InputMasked';
import { validationSchemaUser } from '../../validation';
import { signInFormFields } from './signUpFormFields';
import { postData } from '../../utils';
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';

export default function SignUpForm() {
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        password: '',
        telephone: '',
      }}
      validationSchema={validationSchemaUser}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await postData('https://plankton-app-6vr5h.ondigitalocean.app/api/customers', values)
          setSubmitting(false);
        } catch (error) {
          dispatch(setErrorAction(error.message));
          dispatch(setModalType('error'))
        }
        // повідомлення про реєстрацію
        // і потрібно залогінитись
      }} >
      <Form className={style.form}>
        {signInFormFields.map(field => {
          if (field.tagType === 'masked') {
            return <InputMasked key={field.name} {...field} />
          }
          return <Input key={field.name} {...field} />
        })}
        <button text='Checkout' className={style.form__submit} type='submit'>Sign Up</button>
      </Form>
    </Formik>
  )
}