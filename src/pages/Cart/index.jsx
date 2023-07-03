import { useState, useEffect, useCallback } from 'react';
import style from './index.module.scss';
import { CartList } from '../../components/CartList';
import { FormToBuy } from '../../components/FormToBuy';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../redux/actions/cartActions';
// import { loadCart, reloadPageGetCart } from '../../redux/actions/cartActions';
import Loader from '../../components/Loader';
import { getDataAction } from '../../redux/actions/getDataActions';
import { baseUrl } from '../../utils/vars';
import { getDataFromLS } from '../../utils';
import { addProductsAction } from '../../redux/actions/productsActions';
// import { setTokenAction } from '../../redux/actions/tokenActions';

// function sumOfOrder(cartProductsArray, products) {
//   let sumOfNftPrice
//   if (cartProductsArray.length === 0 && (products.length === 0)) sumOfNftPrice = 0
//   else {
//     const arrayOfNftPrice = products.map((item) => {
//       return cartProductsArray?.find(elem => elem._id === item.product).currentPrice * item.cartQuantity
//     }
//     );
//     sumOfNftPrice = arrayOfNftPrice?.reduce((sum, item) => sum + item, 0);
//   }
//   return sumOfNftPrice;
// }

export function Cart() {
  const [orderAmount, setOrderAmount] = useState(0);
  // const { cartProductsArray, products } = useSelector(state => state.cart);
  const token = useSelector(state => state.token.token);
  const loading = useSelector((state) => state.loading.loading);
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   !token
  //     ? (
  //       localStorage.setItem('cartProductsArray', JSON.stringify(cartProductsArray)),
  //       localStorage.setItem('products', JSON.stringify(products))
  //     )
  //     : "";
  // }, [cartProductsArray, products])

  // useEffect(() => {
  //   token ? (dispatch(reloadPageGetCart(token))) : ""
  // }, [dispatch])


  // useEffect(() => {
  //   setOrderAmount(sumOfOrder(cartProductsArray, products))
  // }, [cartProductsArray, products])

  // const sumOfOrder = useCallback(() => {
  //   if (token) {
  //     const prices = cart?.products.map(({ cartQuantity, product }) => {
  //       return (cartQuantity * product.currentPrice)
  //     })
  //     return prices?.reduce((prev, next) => prev + next, 0)
  //   } else {
  //     console.log(products);
  //     const prices = cart?.products.map(({ cartQuantity, product }) => {
  //       const productR = products?.find((item) => { item._id === product })
  //       console.log(product);
  //       console.log(products[8]._id);
  //       return (cartQuantity * productR.currentPrice)
  //     })
  //     return prices?.reduce((prev, next) => prev + next, 0)
  //   }
  // }, [cart, token, products]);

  // useEffect(() => {
  //   // setOrderAmount(sumOfOrder() || 0)
  //   if (token) {
  //     const prices = cart?.products.map(({ cartQuantity, product }) => {
  //       return (cartQuantity * product.currentPrice)
  //     })
  //     setOrderAmount(prices?.reduce((prev, next) => prev + next, 0))
  //   } else {
  //     const prices = cart?.products.map(({ cartQuantity, product }) => {
  //       console.log(product);
  //       console.log(products);
  //       console.log(products[8]._id);
  //       console.log(products[8].currentPrice);
  //       const productR = products?.find((item) => { item._id === product })
  //       return (cartQuantity * productR.currentPrice)
  //     })
  //     setOrderAmount(prices?.reduce((prev, next) => prev + next, 0) || 0)
  //   }
  // }, [cart, token, products, sumOfOrder])

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getDataAction(`${baseUrl}cart`, setCart, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //     }));
  //   } else {
  //     setCart(getDataFromLS('cart'));
  //     // setCart({ products: getDataFromLS('cart') });
  //   }
  // }, [dispatch, token])

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