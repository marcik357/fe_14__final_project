import Input from '../Input';
import style from './addProductForm.module.scss';
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';
import { baseUrl } from '../../utils/vars';
import { Formik, Form } from 'formik';
import { validationSchemaProduct } from '../../validation';
import Select from '../Select';
import { fetchData } from '../../utils';
import Checkbox from '../Checkbox';
import { addProductFormFields } from './addProductFormField';
import PhotoUploader from '../PhotoUploader/index';
import { reqPost } from '../../utils/requestBody';

export default function AddProductForm({ onCloseForm, isInAccount }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        enabled: true,
        imageUrls: [],
        quantity: 0,
        author: '',
        categories: '',
        theme: '',
        currentPrice: 0,
        details: '',
      }}
      validationSchema={validationSchemaProduct}
      onSubmit={
        async (values, { setSubmitting }) => {
          try {
            await fetchData(`${baseUrl}products`, reqPost(JSON.stringify(values)));
            onCloseForm()
            setSubmitting(false);
            dispatch(setModalType('saved'))
          } catch (error) {
            dispatch(setErrorAction(error.message));
            dispatch(setModalType('error'))
          }
        }}>
      <Form className={style.form}>
        {addProductFormFields.map((field) => {
          if (field.tagType === 'regular') {
            return (
              <Input
                key={field.name}
                {...field} />);
          } else if (field.tagType === 'button') {
            return (
              <PhotoUploader
                key={field.id}
                isInAccount={isInAccount} />);
          }
          else if (field.tagType === 'select') {
            return (
              <Select
                key={field.name}
                isInAccount={isInAccount}
                {...field} />);
          } else if (field.tagtype === 'checkbox') {
            return (
              <div key={field.name}>
                <div className={field.labelclass}>
                  {field.label}
                </div>
                <div className={field.divclass} role="group" aria-labelledby="checkbox-group">
                  {field?.options.map((option) => {
                    return (
                      <Checkbox
                        key={option}
                        children={option}
                        {...field} />)
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
        <div className={style.form__btns}>
          <button
            className={`${style.form__submit} ${isInAccount && style.form__submit_inAccount}`}
            type="submit">
            Save Changes
          </button>
          <button
            onClick={onCloseForm}
            type='button'
            className={`${style.form__submit} ${isInAccount && style.form__submit_inAccount}`}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}