import PropTypes from 'prop-types';
import { useRef } from 'react';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantityInCartWithServer,changeQuantityInCartLocal,deleteFromCartProduct,deleteFromCartProductWithServer} from '../../redux/actions/cartActions';
let token = localStorage.getItem('tokenCart');

export function CartList(props) {
    const parentElement = useRef();
    const dispatch = useDispatch();
    const { imageUrls, name, currentPrice, sumOfOrder, setOrderAmount, id, _id } = props;
    const { cartProductsArray,products } = useSelector(state => state.cart);
    let currentQuantity = products.length > 0 ? (products.find(item=>item.product === _id))?.cartQuantity: 0;
 
  function deleteElementFromScreen(e) {
    let id =e.target.dataset.id;
    localStorage.getItem('tokenCart') ?
      dispatch(deleteFromCartProductWithServer(id,cartProductsArray,products,token)) :
    dispatch(deleteFromCartProduct(id,cartProductsArray,products));
    setOrderAmount(0)
  }
  
  function decrease(e) {
    let idProduct= e.target.dataset.id;
    localStorage.getItem('tokenCart') ? (dispatch(changeQuantityInCartWithServer(idProduct,currentQuantity,products,token,false)),setOrderAmount(sumOfOrder(cartProductsAdd,products))):
    dispatch(changeQuantityInCartLocal(idProduct,currentQuantity,products,false));
    setOrderAmount(sumOfOrder(cartProductsArray,products))
  }
  
  function increase(e) {
      let idProduct= e.target.dataset.id;
      localStorage.getItem('tokenCart') ? (dispatch(changeQuantityInCartWithServer(idProduct,currentQuantity,products,token,true))
      ,setOrderAmount(sumOfOrder(cartProductsArray,products))):
      dispatch(changeQuantityInCartLocal(idProduct,currentQuantity,products,true));

      setOrderAmount(sumOfOrder(cartProductsArray,products))
  }

  return (
    <div ref={parentElement} data-id={id} className={style.cartListItem}>
      <div className={style.cartListItem__icon}>
        <img
          className={style.cartListItem__icon__img}
          src={imageUrls}
          alt={name}
        />
      </div>
      <div data-price={currentPrice} className={style.cartListItem__description}>
        <p className={style.description__title}>{name}</p>
        <p>Price:
        <span className={style.description__currency}>
        &#160;{currentPrice} ETH
        </span>
        </p>
      </div>
      <div
        className={style.cartListItem__quantity}
      >
        <button
          data-id={_id}
          type="submit"
          className={style.quantity__btn}
          onClick={currentQuantity > 1 ? decrease : null}
        > -
        </button>
       <div
         className={style.quantity__value}
       >
        {products.length > 0 ? currentQuantity: 1}
       </div>
        <button
          data-id={_id}
          type="button"
          className={style.quantity__btn}
          onClick={increase}
        > +
        </button>
      </div>
      <button
        type="submit"
        data-id={_id}
        className={style.cartListItem__btnDelete}
        onClick={deleteElementFromScreen}
      >
        Delete
   
      </button>
    </div>
  );
}
CartList.propTypes = {
  imageUrls: PropTypes.array,
  name: PropTypes.string,
  currentPrice: PropTypes.number,
  sumOfOrder: PropTypes.func,
  setOrderAmount: PropTypes.func,
  id: PropTypes.number,
  idCode:PropTypes.number,
  _id:PropTypes.string,
};
CartList.defaultProps = {
  imageUrls: [],
  name: '',
  currentPrice: 0,
  sumOfOrder: '',
  setOrderAmount: '',
  id: 0,
  idCode:0,
  _id:"",
};