import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {  getCart,newCart,addToCartProduct,addNewProductToCart,increaseQuantityInCart,increaseCartQuantity } from '../../../redux/actions/cartActions';

export function CartList(props) {
  const parentElement = useRef();
  const dispatch = useDispatch();
  const { src, title, text, quantity, price, sumOfOrder, setOrderAmount, id, idCode, _id, imageUrl} = props;
 
  const [quantityItem, setQuantityItem] = useState(quantity);
  const { cartProductsAdd,products } = useSelector(state => state.cart);
  let currentQuantity = (products.find(item=>item.product === _id))?.cartQuantity


  useEffect(() => {
    setOrderAmount(sumOfOrder(cartProductsAdd));
  }, [setOrderAmount, sumOfOrder]);

  ////оновлення карт при перезавантаженні сторінки необхідно ще редюсер
 

  function deleteElementFromScreen() {
    parentElement.current.remove();
    alert('Item deleted successfully');
  }
  
  function decrease() {
    if (quantityItem <= 0)setQuantityItem(0);
    else { setQuantityItem(quantityItem - 1); }
    const priceUp = Array.from(parentElement.current.children).find(
      ((elem) => elem.dataset.price),
    )
      .dataset.price;
    setOrderAmount((prev) => prev - parseFloat(priceUp));
  }
  
  function increase() {
        // dispatch(increaseQuantityInCart(idProduct,currentQuantity,products,token))


  //   setQuantityItem(quantityItem + 1);
  //   const priceUp = Array.from(parentElement.current.children).find(((elem) => elem.dataset.price))
  //     .dataset.price;
  //   setOrderAmount((prev) => prev + parseFloat(priceUp));
  }
  return (
    <div ref={parentElement} data-id={id} className={style.cartListItem}>
      <div className={style.cartListItem__icon}>
        <img
          className={style.cartListItem__icon__img}
          src={src}
          alt={title}
        />
      </div>
      <div data-price={price} className={style.cartListItem__description}>
        <p className={style.description__title}>{title}</p>
        <p>{text}:
        <span className={style.description__currency}>
        &#160;{price} ETH
        </span>
        </p>
      </div>
      <div
        className={style.cartListItem__quantity}
      >
        <button
          type="submit"
          className={style.quantity__btn}
          onClick={quantityItem > 0 ? decrease : null}
        > -
        </button>
       <div
         className={style.quantity__value}
       >
        {products.length > 0 ? currentQuantity: 1}
       </div>
        <button
          data-id={idCode}
          data-prodact={_id.objectId}
          type="button"
          className={style.quantity__btn}
          onClick={increase}
        > +
        </button>
      </div>
      <button
        type="submit"
        className={style.cartListItem__btnDelete}
        onClick={deleteElementFromScreen}
      >
        Delete
      </button>
    </div>
  );
}
CartList.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  sumOfOrder: PropTypes.string,
  setOrderAmount: PropTypes.string,
  id: PropTypes.number,
  idCode:PropTypes.number,
  _id:PropTypes.string,
};
CartList.defaultProps = {
  title: '',
  text: '',
  quantity: 0,
  price: 0,
  sumOfOrder: '',
  setOrderAmount: '',
  id: 0,
  idCode:0,
  _id:"",
};