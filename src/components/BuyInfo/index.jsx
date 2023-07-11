import { useSelector } from 'react-redux';
import { useContext } from 'react';
import style from './index.module.scss';
import { Quantity } from '../../router';

export function BuyInfo (){
const cart = useSelector(state=> state.cart.cart.products);
const [ orderAmount ] = useContext(Quantity);
    return (
       <div className={style.cart_block}>
         <h1 className={style.cart_block__title}>Buy info</h1>
              <div className={style.cart_block__products}>
                {cart?.map(({product,cartQuantity}) =>(
                    <div className={style.products__card} >
                        <img className={style.card__img} src={product.imageUrls} alt={product.name}/>
                    </div>
                )  )}
              </div>
              <div className={style.cart_block__total} >
                <p> Total Price :</p>
                <span>{Number(orderAmount.toFixed(2)) || 0} ETH</span>
              </div>
       </div>
    )
}