import styleText from '../../pages/Order/order.module.scss';
import FormikForm from '../FormikForm';
import { useSelector } from 'react-redux';
import { paymentForm }from './paymentForm.js';
import { validationSchemaCard } from '../../validation';

export function PaymentForm({getOrder,setContactValue}) {
    const token = useSelector(state=> state.token.token);
    function handleSubmit (value,token){
        setContactValue(value)
        getOrder(token)
    }

    return(
        <>
        <h2 className={styleText.user_info__title}>Payment</h2>
        <FormikForm
         initialValues={{
            card: '',
            validity:'',
            cvv:''
         }}
        validationSchema={validationSchemaCard}
        fields={paymentForm}
        submitBtn="Make an order"
        callback={handleSubmit}
        />
        </>
    )
}