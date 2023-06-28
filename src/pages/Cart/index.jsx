import { useState,useEffect, useRef} from 'react';
import style from './index.module.scss';
import { CartList } from '../../components/Cart/CartList';
import { FormToBuy } from '../../components/Cart/FormToBuy';
import { useSelector,useDispatch } from 'react-redux';
import { getCart } from '../../redux/actions/cartActions';
let token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTY5NDg4Y2Y0ZjhiZTkwZjkxZDRhMyIsImZpcnN0TmFtZSI6IkFyc2VuIiwibGFzdE5hbWUiOiJBcnNlbml0IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjg3ODc5NzkwLCJleHAiOjE2ODc5MTU3OTB9.6RxoeCepgEnG0oVOvBud8GuUerIM5HMp0rvf7EypWek'

function sumOfOrder(date) {
  const arrayOfNftPrice = date.map((item) => (parseFloat(item.price) * parseFloat(item.quantity)));
  const sumOfNftPrice = arrayOfNftPrice.reduce((sum, item) => sum + item, 0);

  return sumOfNftPrice;
}

export function Cart() {
  const basketItemsWrapper = useRef();
  const [orderAmount, setOrderAmount] = useState();
  const { cartProductsAdd, products } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.setItem('cartProductsAdd',JSON.stringify(cartProductsAdd))
    localStorage.setItem('products',JSON.stringify(products))

    // dispatch(getCart(token))
  },[cartProductsAdd,products])

  return (
    <div className={style.cart}>
      <div className={style.cart__poster} />
      <div className={style.cart__block}>
        <div ref={basketItemsWrapper} className={style.block__items}>
          {
            cartProductsAdd?.length > 0 ? cartProductsAdd?.map((item) => (
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