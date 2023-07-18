import Input from '../Input';
import style from './addProductForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';
import { baseUrl } from '../../utils/vars';
import { Formik, Form } from 'formik';
import { validationSchemaProduct } from '../../validation';
import Select from '../Select';
import { fetchData } from '../../utils';
import Checkbox from '../Checkbox';
import FormData from 'form-data';
import { addProductFormFields } from './addProductFormField';
import { useState } from 'react';

export default function AddProductForm({ onCloseForm }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
//   const [isFileUploaded, setIsFileUploaded] = useState(false);
//   const [uploadedFileName, setUploadedFileName] = useState('');

  const [file, setFile] = useState()
    function handleFile (event){
setFile(event.target.files[0])
console.log(event.target.files[0]);
    }
    
    function handleUpload (){
      event.preventDefault()
      const formData = new FormData()
      formData.append("photos", file)
      console.log(formData);
fetch (`${baseUrl}products/images`,
{
  method : 'POST',
  headers: {
    path: `./static/images/products/`,
  },
  body : formData
}).then((response) => response.json).then(
  (result) => {
    // setIsFileUploaded(true);
    // setUploadedFileName(file.name);
    // if (file) {
        // setUploadedFileName(file.name);
        console.log('success',result);
      
  }
).catch(error => {
  console.error('Error', error)
})}

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
  details: ''

        
      }}
      validationSchema={validationSchemaProduct}
      onSubmit={
        async (values, { setSubmitting }) => {
          try {
            await fetchData(`${baseUrl}products`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            });
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
        {addProductFormFields.map((field) => {
          if (field.tagType === 'regular') {
            return (
              <Input
                key={field.name}
                {...field} />
            );
          } else if (field.tagType === 'button') {
            return (<div>
              <Input
                key={field.name}
                {...field}
                onChange = {() => handleFile}
                // value={uploadedFileName || ''}
                // style={{ color: isFileUploaded ? 'green' : 'inherit' }}
                />
                <button type='button' onClick={handleUpload} className={style.form__submit} >Upload</button>
                </div>
            );
          }
          else if (field.tagType === 'select') {
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
                        {...field} />
                    )
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
        <div className={style.form__btns}>
          <button className={style.form__submit} type="submit">
            Save Changes
          </button>
          <button onClick={onCloseForm} type='button' className={style.form__submit}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  )
}