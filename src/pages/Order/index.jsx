import styles from '../../components/FormikForm/form.module.scss';
import styling from './order.module.scss'
import axios from 'axios';
import Banner from "../../components/Banner";
import { useSelector } from 'react-redux';
import { useState,useContext} from "react";
import { baseUrl } from '../../utils/vars';
import { contactForm } from "../../components/ContactForm/contactForm.js";
import { ContactForm } from '../../components/ContactForm';
import { PaymentForm } from '../../components/PaymentForm';
import { BuyInfo } from '../../components/BuyInfo';
import { paymentForm }from '../../components/PaymentForm/paymentForm.js';
import { Quantity } from '../../router';

export function Order(props) {
const token = useSelector(state=> state.token.token);
const cart = useSelector(state=> state.cart.cart)
const customer =useSelector(state=> state.cart.cart.customerId);
const loading =useSelector(state=> state.loading);
const [orderAmount]=useContext(Quantity)
const [active, setActive] =useState(false);
const [contactValue, setContactValue] =useState();

const newOrder = {
  customerId: `${customer?._id}`,
  products: '',
  paymentInfo: "Credit card",
  email: `${contactValue?.email}`,////есть поле
  mobile: `${contactValue?.telephone}`,///есть поле
  totalSum:`${orderAmount}`,
  letterSubject: "Thank you for order! You are welcome!",
  letterHtml:
    `<h1>Your order is placed. OrderNo is ${Date.now()}.</h1><p>Total sum of order is ${orderAmount}ETH </p>`
};
newOrder.products = cart?.products;

 async function getOrder(token){
  axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;

    axios
    .post(`${baseUrl}orders`,newOrder)
    .then(orders => {
     
    })
    .catch(err => {
      /*Do something with error, e.g. show error to user*/
    });
  }

  return (
    <>
     <Banner  title="You orders in one touch" img="/images/banners/order-banner3.png"/>
        <div className={styling.order}>
          <div className={styling.order__user_info}>
            <h2 className={styling.user_info__title} >Contact form</h2>
            <button
             className={!active ?styling.user_info__btn_hidden :styling.user_info__back}
             onClick={()=>setActive(!active)}
            >Back</button>
            {!active ?
            <ContactForm
             className={styling.user_info__contact_form}
              contactForm={contactForm}
              setActive={setActive}
              setContactValue={setContactValue}
              active={active}
            /> :
            <>
            <PaymentForm
            getOrder={getOrder}
            paymentForm={paymentForm}
            setContactValue={setContactValue}
            />
            </>}
          </div>
          <BuyInfo className={styling.order_block__buy_info} />
        
          </div>
    </>
  );
}
