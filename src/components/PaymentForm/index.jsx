import styleText from '../../pages/Order/order.module.scss';
import style from './index.module.scss';
import styleBtn from '../../pages/Account/Account.module.scss';
import FormikForm from '../FormikForm';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import 'react-phone-number-input/style.css'
import { paymentForm } from './paymentForm.js';
import { setModalType } from '../../redux/actions/modalActions';
import { cleanCart } from '../../redux/actions/cartActions.js'
import { useUserAuth } from './PhoneAuthContext';
import PhoneInput from 'react-phone-number-input';
import { Formik,Form } from 'formik';
import "./style.css";

export function PaymentForm({ sendOrder, setContactValue }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.token);
  const [number, setNumber] = useState('')
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [flag,setFlag] = useState(false);
  const [confirm,setConfirm] = useState('');
  const [makeOrder,setMakeOrder]=useState(false);
  const { setupRecaptcha } = useUserAuth();

  const getOtp = async (e) => {
    e.preventDefault();
    if(number === undefined || number === "")
    return setError("Please enter a valid number")
    try{
        setError("")
        const response =await setupRecaptcha(number)
        setConfirm(response);
        setFlag(true);
    }
    catch(err){
        setError(err.message)
    }

}
const verifyOtp = async (e) => {
  e.preventDefault()
  if(otp === ""|| otp === null) return
  try{
      await confirm.confirm(otp)
      setError("")
      setMakeOrder(!makeOrder)
  }
  catch(err){
      setError(err.message)
  }
}

  function handleSubmit(value) {
    setContactValue(value);
    sendOrder();
    dispatch(setModalType('order'));
  }

  return (
    <>
      <h2 className={styleText.user_info__title}>Payment</h2>
      <div className={style.payment_form}>
      {error && <div className={style.payment_form__error} >Please check out your sms code. You write wrong code!</div>}
      <Formik
      initialValues=""
      >
      <Form
       onSubmit={getOtp}
       style={{display:!flag ? "block":"none" }}>
                <PhoneInput
                defaultCountry="UA"
                onChange={setNumber}
                placeholder="Enter the phone number"/>
                 <div id='recaptcha-container'></div>
            <div className={style.payment_form__btn} >
              <button className={styleBtn.user__btnsItem} type="submit">Send</button>
    
            </div>
        </Form>
      </Formik>
    <Formik
     initialValues=""
     >
        <Form
          onSubmit={verifyOtp}
          style={{display:flag && !makeOrder ? "block":"none" }}
        >
         <input
          type="text"
          className={style.form__input}
          placeholder="Enter sms code"
          onChange={(e)=>setOtp(e.target.value)}/>
          <div id='recaptcha-container'></div>
          <div className={style.payment_form__btn}>
              <button className={styleBtn.user__btnsItem} type="submit">Send</button>
      </div>
      </Form>
      </Formik>
      {makeOrder && <FormikForm
        fields={paymentForm}
        submitBtn="Make an order"
        callback={() => {
          handleSubmit();
          dispatch(cleanCart(token));
        }}
      /> }
      </div>
    </>
  )
}