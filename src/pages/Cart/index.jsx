import { useState, useRef } from 'react';
import style from './index.module.scss';
import { data } from '../../components/Cart/data/data';
import { CartList } from '../../components/Cart/CartList';
import { FormToBuy } from '../../components/Cart/FormToBuy';

function sumOfOrder(date) {
  const arrayOfNftPrice = date.map((item) => (parseFloat(item.price) * parseFloat(item.quantity)));
  const sumOfNftPrice = arrayOfNftPrice.reduce((sum, item) => sum + item, 0);

  return sumOfNftPrice;
}

export function Cart() {
  const basketItemsWrapper = useRef();
  const [orderAmount, setOrderAmount] = useState();
  return (
    <div className={style.cart}>
      <div className={style.cart__poster} />
      <div className={style.cart__block}>
        <div ref={basketItemsWrapper} className={style.block__items}>
          {
            data.length > 0 ? data.map((item) => (
            <CartList
              key={item.id}
              sumOfOrder={sumOfOrder}
              setOrderAmount={setOrderAmount}
              {...item}
            />
            )) : <p className={style.block__noItems}>No items in the Cart</p>
            }
        </div>
        <div className={style.block__actionToBuy}>
          <FormToBuy orderAmount={orderAmount} />
        </div>
      </div>
    </div>
  );
}