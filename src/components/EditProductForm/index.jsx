import Input from '../Input';
import style from './editProductForm.module.scss';
import { editProductFormFields } from './editProductFormField';
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';
import { baseUrl } from '../../utils/vars';
import { Formik, Form } from 'formik';
import { validationSchemaProduct } from '../../validation';
import Select from '../Select';
import { putData } from '../../utils';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Checkbox from '../Checkbox';

export default function EditProductForm({ product, onCloseForm }) {
  const dispatch = useDispatch();
  const [selectedThemes, setSelectedThemes] = useState(product.theme || []);
  // const navigate = useNavigate();
  // const handleCheckboxChange  = (value) => {
  //   setSelectedThemes(value);
  // };

  return (
    <Formik
      initialValues={{
        ...product,
        theme: product.theme || [],
      }}
      validationSchema={validationSchemaProduct}
      onSubmit={
        async (values, { setSubmitting }) => {
          try {
            await putData(`${baseUrl}products/${product._id}`, values)
            // navigate("/admin")
            onCloseForm()
            setSubmitting(false);
          } catch (error) {
            dispatch(setErrorAction(error.message));
            dispatch(setModalType('error'))
          }
        }
      }
    >
      <Form className={style.form}>
        {editProductFormFields.map((field) => {
          if (field.tagType === 'regular') {
            return (
              <Input
                key={field.name}
                value={product[field.name]}
                {...field} />
            );
          } else if (field.tagType === 'select') {
            return (
              <Select
                key={field.name}
                {...field} />
            );
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
                        value={product.theme}
                        // onChange={setSelectedThemes}
                        {...field} />
                    )
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
        <button className={style.form__submit} type="submit">
          Save Changes
        </button>
      </Form>
    </Formik>
  )
}