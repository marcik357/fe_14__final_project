import style from './index.module.scss';
import { CartList } from '../../components/CartList';
import { FormToBuy } from '../../components/FormToBuy';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';

export function Cart() {
  const token = useSelector(state => state.token.token);
  const loading = useSelector((state) => state.loading.loading);
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.products.products);

  return (
    <div id='main'>
      {!loading
        ? <div className={style.cart}>
          <div className={style.cart__container}>
            <div className={style.cart__block}>
              <div className={style.block__items}>
                {cart?.products?.length > 0 && products?.length > 0
                  ? cart.products?.map(({ product, cartQuantity }) => {
                    const productObj = products.find((productR) => productR._id === product)
                    return (
                      token
                        ? <CartList
                          key={product._id}
                          cartQuantity={cartQuantity}
                          {...product}
                        />
                        : <CartList
                          key={productObj.itemNo}
                          cartQuantity={cartQuantity}
                          {...productObj}
                        />)
                  })
                  : <p className={style.block__noItems}>No items in the Cart</p>}
              </div>
              {cart?.products?.length > 0
                && <div className={style.block__actionToBuy}>
                  <FormToBuy />
                </div>}
            </div>
          </div>
        </div>
        : <Loader />}
    </div>
  );
}