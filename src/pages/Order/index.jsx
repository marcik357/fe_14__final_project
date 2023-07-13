import styling from './order.module.scss';
import Banner from "../../components/Banner";
import { useSelector } from 'react-redux';
import { useState,useContext } from "react";
import { baseUrl } from '../../utils/vars';
import { contactForm } from "../../components/ContactForm/contactForm.js";
import { ContactForm } from '../../components/ContactForm';
import { PaymentForm } from '../../components/PaymentForm';
import { BuyInfo } from '../../components/BuyInfo';
import { paymentForm }from '../../components/PaymentForm/paymentForm.js';
import { Quantity } from '../../router';
import { newOrder } from '../../utils/vars';
import { fetchData } from '../../utils';

export function Order() {
const token = useSelector(state=> state.token.token);
const cart = useSelector(state=> state.cart.cart)
const { products } =useSelector(state=> state.products);
const customer =useSelector(state=> state.cart.cart.customerId);
const [orderAmount]=useContext(Quantity)
const [active, setActive] =useState(false);
const [contactValue, setContactValue] =useState();


if(token){
  newOrder.products =cart.products;
  newOrder.customerId = customer;
  newOrder.name = contactValue?.name;
  newOrder.email = contactValue?.email;
  newOrder.mobile = contactValue?.telephone;
  newOrder.card = contactValue?.cardNumber;
  newOrder.totalSum = orderAmount;
  newOrder.letterHtml =
  `
  <h1>${contactValue?.name},Your order is placed.&#9989;</h1> 
  <p></p>Number of order <b>${Date.now()}</b></p>
  <p>Total sum of order is ${Number(orderAmount).toFixed(2)}ETH </p>
  <p>Money was debited from the card &#128179;</p>
  <p>We will miss you&#128546;,come back soon </p>
  <p>Thank you for order, your crypto&#128154;</p>
  <br/>
  <br/>
  <p>Email &#128233 :crypter.mailer@gmail.com</p>
  <a href="http://localhost:3000">OUR HOME PAGE</a>
  `
}
else{
  const newCartArray = cart?.products.map(({product,cartQuantity})=>{
  const productInfo = products.find(item=> item._id === product);
  return {product:productInfo,cartQuantity}})
  newOrder.products = newCartArray;
  newOrder.name = contactValue?.name;
  newOrder.email = contactValue?.email;
  newOrder.card = contactValue?.cardNumber;
  newOrder.mobile = contactValue?.telephone;
  newOrder.totalSum = orderAmount;
  newOrder.letterHtml =
  `
  <h1>${contactValue?.name},Your order is placed.&#9989;</h1> 
  <p></p>Number of order ${Date.now()}</p>
  <p>Total sum of order is ${Number(orderAmount).toFixed(2)}ETH </p>
  <p>Money was debited from the card &#128179;</p>
  <p>We will miss you&#128546;,come back soon </p>
  <p>Thank you for order, your crypto&#128154;</p>
  <br/> <br/>
  <p>Email &#128233 :crypter.mailer@gmail.com</p>
  <a href="http://localhost:3000">Our home page</a>
  `
}

  return (
    <>
     <Banner  title="You orders in one touch" img="/images/banners/order-banner.png"/>
        <div className={styling.order}>
          <BuyInfo className={styling.order_block__buy_info} />
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
            getOrder={()=>fetchData(`${baseUrl}orders`,{
              method: "POST",
              headers: {'Content-Type': 'application/json'},
              body:JSON.stringify(newOrder)
            },)}
            paymentForm={paymentForm}
            setContactValue={setContactValue}
            />
            </>}
          </div>
          </div>
    </>
  );
}
