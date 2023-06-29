import { useState,useEffect, useRef} from 'react';
import style from './index.module.scss';
import { CartList } from '../../components/CartList';
import { FormToBuy } from '../../components/FormToBuy';
import { useSelector,useDispatch } from 'react-redux';
import { getCart } from '../../redux/actions/cartActions';

let token = localStorage.getItem('tokenCart')

function sumOfOrder(cartProductsAdd,products) {
  let sumOfNftPrice
  if(cartProductsAdd.length === 0 && (products.length === 0 )) sumOfNftPrice = 0
  else{
    const arrayOfNftPrice = products.map((item) =>
    {
      return cartProductsAdd?.find(elem=> elem._id === item.product).currentPrice * item.cartQuantity
    }
    );
    sumOfNftPrice = arrayOfNftPrice?.reduce((sum, item) => sum + item, 0);
  }
  return sumOfNftPrice;
}

export function Cart() {
  const basketItemsWrapper = useRef();
  const [orderAmount, setOrderAmount] = useState();
  const { cartProductsAdd, products } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(()=>{
      !token ? (
        localStorage.setItem('cartProductsAdd',JSON.stringify(cartProductsAdd)),
        localStorage.setItem('products',JSON.stringify(products))
      ):"";
  },[cartProductsAdd,products])

  useEffect(()=>{
      token ? (dispatch(getCart(token))):""
  },[dispatch])


  useEffect(()=>{
    setOrderAmount(sumOfOrder(cartProductsAdd,products))
  },[cartProductsAdd,products])
  
  return (
    <div className={style.cart}>
      <div className={style.cart__poster} />
      <div className={style.cart__block}>
        <div ref={basketItemsWrapper} className={style.block__items}>
          {
            cartProductsAdd?.length > 0 ? cartProductsAdd?.map((item) => (
            <CartList
              key={item.itemNo}
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