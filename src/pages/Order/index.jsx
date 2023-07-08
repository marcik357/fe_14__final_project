import Banner from '../../components/Banner';
import { Contacts } from '../../components/Contacts';
import { PaymentForm } from '../../components/Payment';
import { ProductsToBuy } from '../../components/ProductsToBuy';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormToBuy } from '../../components/FormToBuy'
import styles from './index.module.scss';

export function Order() {
    const [showBlock,setShowBlock] =useState(true);
    const { token } = useSelector(state => state.token);
    const cart = useSelector(state => state.cart)
    return (
        <>
        <Banner className={styles.bannerPoster} img='images/Order/Rectangle 25.png'/>
        <div className={styles.order_block} >
            <div className={styles.order_block__form} >
                <h1 className={styles.order_block__title}>Contacts</h1>
            {showBlock ?(
                 <Contacts /> ):""}
                 <button
                 className={styles.btn_continue}
                 onClick={() => setShowBlock(!showBlock)}>{showBlock ? "Continue" :"Come back to Contacts" }</button>
                 <h1>Payment</h1>
               {!showBlock ? <PaymentForm/> :""}
            </div>
            
            <div className={styles.order_block__items} >
            <h1>Product to buy</h1>
            <div className={styles.items__block}>
            {  cart?.products?.length > 0 || cart?.length > 0 ?
            <>
              { token ?  cart?.products?.map(({product,cartQuantity}) =>(
                    <ProductsToBuy key={product.itemNo} {...product}/>))
              :cart?.map((product) =>  <ProductsToBuy key={product.itemNo} {...product}/> )}
            </>:
            <p>Nothing</p>
              }
              </div>
              <FormToBuy className={styles.formToBuy}/>
            </div>
        </div>
        </>
    )
}