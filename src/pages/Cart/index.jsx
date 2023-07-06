import { useState, useEffect } from 'react';
import style from './index.module.scss';
import { CartList } from '../../components/CartList';
import { FormToBuy } from '../../components/FormToBuy';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';

export function Cart() {
  const [orderAmount, setOrderAmount] = useState(0);

  const token = useSelector(state => state.token.token);
  const loading = useSelector((state) => state.loading.loading);
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (token) {
      const prices = cart?.products.map(({ cartQuantity, product }) => {
        return (cartQuantity * product.currentPrice)
      })
      setOrderAmount(prices?.reduce((prev, next) => prev + next, 0))
    } else {
      if (products.length > 0) {
        const prices = cart?.products?.map(({ cartQuantity, product }) => {
          const productR = products?.find((item) => item._id === product)
          return (cartQuantity * productR.currentPrice)
        })
        setOrderAmount(prices?.reduce((prev, next) => prev + next, 0))
      }
    }
  }, [cart, products, token])

  return (
    !loading ?
      (<div className={style.cart}>
        <div className={style.cart__block}>
          <div className={style.block__items}>
            {cart?.products?.length > 0 && products?.length > 0
              ? <>
                {token
                  ? cart.products?.map(({ product, cartQuantity }) => (
                    <CartList
                      key={Math.random() * 1000}
                      // key={product._id}
                      cartQuantity={cartQuantity}
                      {...product}
                    />))
                  : cart.products?.map(({ product, cartQuantity }) => {
                    const productObj = products.find((productR) => productR._id === product)
                    return (<CartList
                      key={productObj.itemNo}
                      cartQuantity={cartQuantity}
                      {...productObj}
                    />)
                  })}
              </>
              : <p className={style.block__noItems}>No items in the Cart</p>
            }
          </div>
          <div className={style.block__actionToBuy}>
            <FormToBuy orderAmount={orderAmount} />
          </div>
        </div>
      </div>)
      : (<Loader />)
  );
}