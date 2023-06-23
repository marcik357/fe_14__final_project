import { useState, useRef } from 'react';
import style from './index.module.scss';
import { CartList } from '../../components/CartList';
import { FormToBuy } from '../../components/FormToBuy';

const data = [
  {
    id: '1',
    src: '../img/item.png',
    title: 'Nft',
    text: 'Price',
    quantity: 2,
    price: 0.25,
  },
  {
    id: '2',
    src: '../img/item2.png',
    title: 'Nft',
    text: 'Price',
    quantity: 1,
    price: 0.17,
  },
  {
    id: '3',
    src: '../img/Frame.png',
    title: 'Nft',
    text: 'Price',
    quantity: 5,
    price: 0.13,
  },
  {
    id: '4',
    src: '../img/Frame2.png',
    title: 'Nft',
    text: 'Price',
    quantity: 1,
    price: 0.07,
  },
];

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