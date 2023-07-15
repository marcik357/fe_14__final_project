import styleText from '../../pages/Order/order.module.scss';
import FormikForm from '../FormikForm';
import { useSelector, useDispatch } from 'react-redux';
import { paymentForm } from './paymentForm.js';
import { setModalType } from '../../redux/actions/modalActions';
import { validationSchemaCard } from '../../validation';
import { cleanCart } from '../../redux/actions/cartActions.js'

export function PaymentForm({ sendOrder, setContactValue }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.token);

  function handleSubmit(value) {
    setContactValue(value);
    sendOrder();
    dispatch(setModalType('order'));
  }

  return (
    <>
      <h2 className={styleText.user_info__title}>Payment</h2>
      <FormikForm
        initialValues={{
          cardNumber: '',
          validity: '',
          cvv: ''
        }}
        validationSchema={validationSchemaCard}
        fields={paymentForm}
        submitBtn="Make an order"
        callback={() => {
          handleSubmit();
          dispatch(cleanCart(token));
        }}
      />
    </>
  )
}