import style from './signInForm.module.scss'
import { Formik, Form } from 'formik';
import Input from '../Input';
import InputMasked from '../InputMasked';
import { validationSchemaUser } from '../../validation';
import { signInFormFields } from './signInFormFields';
import { postData } from '../../utils';

export default function SignInForm() {

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
        <h2 className={style.form__title}>Sign In</h2>
        {signInFormFields.map(field => {
          if (field.tagType === 'masked') {
            return <InputMasked key={field.name} {...field} />
          }
          return <Input key={field.name} {...field} />
        })}
        <button text='Checkout' className={style.form__submit} type='submit' />
      </Form>
    </Formik>
  )
}