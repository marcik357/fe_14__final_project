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
import { useNavigate } from 'react-router-dom';


export default function EditProductForm({product, onCloseForm}){
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    return(
     
        <Formik
        initialValues={{
          ...product,
          theme: product.theme || []
        }
          
        }
      validationSchema={validationSchemaProduct}
      onSubmit={
        async (values, { setSubmitting }) => {
        try {
          await putData(`${baseUrl}products/${product._id}`, values)
          // navigate("/admin")
          setSubmitting(false);
          onCloseForm()
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
              <Input key={field.name} {...field} value={product[field.name]}/>
            );
          } else if (field.tagType === 'select') {
            return (
              <Select key={field.name} {...field}/>
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