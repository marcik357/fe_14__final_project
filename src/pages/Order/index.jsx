import styling from './order.module.scss';
import Banner from "../../components/Banner";
import { useSelector } from 'react-redux';
import { useState, useContext } from "react";
import { baseUrl } from '../../utils/vars';
import { contactForm } from "../../components/ContactForm/contactForm.js";
import { ContactForm } from '../../components/ContactForm';
import { PaymentForm } from '../../components/PaymentForm';
import { BuyInfo } from '../../components/BuyInfo';
import { paymentForm } from '../../components/PaymentForm/paymentForm.js';
import { Quantity } from '../../router';
import { fetchData } from '../../utils';
import { Link } from 'react-router-dom';

export function Order() {
  const token = useSelector(state => state.token.token);
  const cart = useSelector(state => state.cart.cart)
  const { products } = useSelector(state => state.products);
  const customer = useSelector(state => state.cart.cart.customerId);
  const [orderAmount] = useContext(Quantity)
  const [active, setActive] = useState(false);
  const [contactValue, setContactValue] = useState();

  function createOrder() {
    const order = {
      paymentInfo: "Credit card",
      letterSubject: "Thank you for order! You are welcome!",
      name: contactValue?.name,
      email: contactValue?.email,
      mobile: contactValue?.telephone,
      card: contactValue?.cardNumber,
      totalSum: orderAmount,
      letterHtml: `
      <h1>${contactValue?.name},Your order is placed.&#9989;</h1> 
      <p></p>Number of order <b>${Date.now()}</b></p>
      <p>Total sum of order is ${Number(orderAmount).toFixed(2)}ETH </p>
      <p>We will miss you&#128546;,come back soon </p>
      <p>Thank you for order, your crypto&#128154;</p>
      <br/>
      <br/>
      <p>Email &#128233 :crypter.mailer@gmail.com</p>
      <a href="https://crypter-ten.vercel.app/">OUR HOME PAGE</a>
    `
    };

    if (token && !Array.isArray(token)) {
      return {
        ...order,
        // products: cart.products,
        customerId: customer,
      }
    } else {
      const newCartArray = cart?.products.map(({ product, cartQuantity }) => {
        const productInfo = products.find(item => item._id === product);
        return { product: productInfo, cartQuantity }
      })
      return { ...order, products: newCartArray }
    }
  }

  async function sendOrder() {
    try {
      await fetchData(`${baseUrl}orders`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createOrder())
      })
    } catch (error) {
      dispatch(setErrorAction(error.message));
    }
  }

  return (
    <>
      <Banner title="You orders in one touch" img="/images/banners/order-banner.png" />
      <div className={styling.order}>
        <div className={styling.order__container}>
          <div className={styling.order__wrapper}>
            <BuyInfo className={styling.order_block__buy_info} />
            <div className={styling.order__user_info}>
              <h2 className={styling.user_info__title}>Contact form</h2>
              <Link to={!active && !token ? '/authorization':''}>
              <button
                className={
                  !active ?
                  ( token ?
                    styling.user_info__btn_hidden
                    : styling.user_info__back
                  )
                    : styling.user_info__back}
                onClick={() => active ?setActive(!active):""}
              >{!active && !token ? "Login": "Back"}</button>
              </Link>
              {!active
                ?
                <ContactForm
                  className={styling.user_info__contact_form}
                  contactForm={contactForm}
                  setActive={setActive}
                  setContactValue={setContactValue}
                  active={active}
                />
                :
                <PaymentForm
                  sendOrder={sendOrder}
                  paymentForm={paymentForm}
                  setContactValue={setContactValue}
                />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
