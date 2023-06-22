import { useState, useRef } from 'react';
import style from './index.module.scss';
import { data } from './data/data';
import { BasketItem } from './BasketItem';
import { FormToBuy } from './FormToBuy';

function sumOfOrder(date) {
  const arrayOfNftPrice = date.map((item) => (parseFloat(item.price) * parseFloat(item.quantity)));
  const sumOfNftPrice = arrayOfNftPrice.reduce((sum, item) => sum + item, 0);

  return sumOfNftPrice;
}

export default function Basket() {
  const basketItemsWrapper = useRef();
  const [orderAmount, setOrderAmount] = useState();
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__poster} />
      <div className={style.wrapper__basket}>
        <div ref={basketItemsWrapper} className={style.wrapper__basket__items}>
          {
            data.length > 0 ? data.map((item) => (
            <BasketItem
              key={item.id}
              sumOfOrder={sumOfOrder}
              setOrderAmount={setOrderAmount}
              {...item}
            />
            )) : <p className={style.wrapper__basket__items__noItems}>No items in the basket</p>
            }
        </div>
        <div className={style.wrapper__basket__actionToBuy}>
          <FormToBuy orderAmount={orderAmount} />
        </div>
      </div>
    </div>
  );
}