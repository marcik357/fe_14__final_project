import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import style from './cartAmount.module.scss';
import { setCart } from '../../redux/actions/cartActions';

export function CartAmount() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart)

  const cartAmount = cart?.products?.reduce((total, product) => {
    return total + product.cartQuantity
  }, 0)

  useEffect(() => {
   dispatch(setCart(cart))

}, [dispatch, cart]);

const isDesktop = useMediaQuery({ minWidth: 993 });

return (
    <span className={`${style.cartAmount} ${cartAmount > 0 ? (isDesktop ? style.activeDesk : style.activeMob) : null}`}>
      {cartAmount}
    </span>
 )
}