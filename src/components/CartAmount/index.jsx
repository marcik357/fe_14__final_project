import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import style from './cartAmount.module.scss';

export function CartAmount() {
  const cart = useSelector((state) => state.cart.cart)

  const cartAmount = cart.products.reduce((total, product) => {
    return total + product.cartQuantity
  }, 0)

  useEffect(() => {
	console.log('Зміни в кошику', cart);

}, [cart]);

const isDesktop = useMediaQuery({ minWidth: 993 });

return (
    <span className={`${style.cartAmount} ${cartAmount > 0 ? (isDesktop ? style.activeDesk : style.activeMob) : null}`}>
      {cartAmount}
    </span>
 )
}