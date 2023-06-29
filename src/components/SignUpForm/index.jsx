import style from './signUpForm.module.scss'
import { Formik, Form } from 'formik';
import Input from '../Input';
import InputMasked from '../InputMasked';
import { validationSchemaUser } from '../../validation';
import { signInFormFields } from './signUpFormFields';
import { postData } from '../../utils';

export default function SignUpForm() {

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
        postData('https://plankton-app-6vr5h.ondigitalocean.app/api/customers', values)
        // повідомлення про реєстрацію
        // і потрібно залогінитись
        setSubmitting(false);
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