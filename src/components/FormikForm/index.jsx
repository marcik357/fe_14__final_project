import style from './form.module.scss'
import { Formik, Form } from 'formik';
import Input from '../Input';
import InputMasked from '../InputMasked';

export default function FormikForm({ initialValues, validationSchema, fields, callback, submitBtn }) {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        callback(values);
        setSubmitting(false);
      }} >
      <Form className={style.form}>
        {fields?.map(field => {
          if (field.tagType === 'masked') {
            return <InputMasked key={field.name} {...field} />
          }
          return <Input key={field.name} {...field} />
        })}
        <button text='Checkout' className={style.form__submit} type='submit'>{submitBtn}</button>
      </Form>
    </Formik>
  )
}