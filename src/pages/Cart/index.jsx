import { useState, useEffect } from 'react';
import style from './index.module.scss';
import { CartList } from '../../components/CartList';
import { FormToBuy } from '../../components/FormToBuy';
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction } from '../../redux/actions/productsActions';
import { baseUrl } from '../../utils/vars';

export function Cart() {
  const [orderAmount, setOrderAmount] = useState();
  const cart = useSelector(state => state.cart);
  const { products } = useSelector(state=>state.products);
  const { token } = useSelector(state => state.token);
  const loading = useSelector((state) => state.loading.loading);
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}products`, addProductsAction));
  
  }, [dispatch, token]);

  useEffect(()=>{
  if(token){
    const cost = cart?.products?.map(({product,cartQuantity})=> {return cartQuantity * product.currentPrice} );
    setOrderAmount(cost?.reduce((sum,item)=> {return sum + item}, 0))
  }
  else{
  if(products.length > 0){
    const cost = cart?.map(({product,cartQuantity})=>{
      const productPrice= products?.find((products)=>products._id === product).currentPrice;
      return cartQuantity * productPrice
     })
     setOrderAmount(cost?.reduce((sum,item)=> {return sum + item}, 0))
    }
  } },[cart,token])
  
  return (
    !loading ?(
    <div className={style.cart}>
      <div className={style.cart__block}>
        <div className={style.block__items}>
          {  cart?.products?.length > 0 || cart?.length > 0 ?
          <>
          { token ?  cart?.products?.map(({product,cartQuantity}) =>{
            return (<CartList
              key={product.itemNo}
              cartQuantity = {cartQuantity}
              setOrderAmount={setOrderAmount}
              {...product}/>)})
          : cart?.map((product) => {
            console.log(products);
              const productObj = products?.find((item) => item._id === product.product);
              console.log(productObj);
              return (<CartList
              // key={ind}
              {...productObj}
            />
            )})}
            </>
            :<p className={style.block__noItems}>No items in the Cart</p>}
            </div>
        <div className={style.block__actionToBuy}>
          <FormToBuy orderAmount={orderAmount} />
        </div>
      </div>
    </div>) :(<Loader/>));
}