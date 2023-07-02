import { useState,useEffect } from 'react';
import style from './index.module.scss';
import { CartList } from '../../components/CartList';
import { FormToBuy } from '../../components/FormToBuy';
import { useSelector,useDispatch } from 'react-redux';
import { reloadPageGetCart } from '../../redux/actions/cartActions';
import Loader from '../../components/Loader';
let token = localStorage.getItem('token');

function sumOfOrder(cartProductsArray,products) {
  let sumOfNftPrice
  if(cartProductsArray.length === 0 && (products.length === 0 )) sumOfNftPrice = 0
  else{
    const arrayOfNftPrice = products.map((item) =>
    {
      return cartProductsArray?.find(elem=> elem._id === item.product).currentPrice * item.cartQuantity
    }
    );
    sumOfNftPrice = arrayOfNftPrice?.reduce((sum, item) => sum + item, 0);
  }
  return sumOfNftPrice;
}

export function Cart() {
  const [orderAmount, setOrderAmount] = useState();
  const { cartProductsArray, products } = useSelector(state => state.cart);
  // const { token } = useSelector(state => state.token);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(()=>{
      !token ? (
        localStorage.setItem('cartProductsArray',JSON.stringify(cartProductsArray)),
        localStorage.setItem('products',JSON.stringify(products))
      ):"";
  },[cartProductsArray,products])

  useEffect(()=>{
      token ? (dispatch(reloadPageGetCart(token))):""
  },[dispatch])


  useEffect(()=>{
    setOrderAmount(sumOfOrder(cartProductsArray,products))
  },[cartProductsArray,products])
  
  return (
    !loading ?(
    <div className={style.cart}>
      <div className={style.cart__block}>
     
        <div className={style.block__items}>
          {
            cartProductsArray?.length > 0 ? cartProductsArray?.map((item) => (
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
    </div>) :(<Loader/>));
}