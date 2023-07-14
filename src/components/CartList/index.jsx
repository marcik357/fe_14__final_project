import PropTypes from 'prop-types';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, deleteFromCart } from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { useState } from 'react';

export function CartList({ imageUrls, name, currentPrice, _id, itemNo, cartQuantity, quantity }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.token);
  const loading = useSelector((state) => state.loading.loading);
  const cart = useSelector((state) => state.cart.cart);

  const [amount, setAmount] = useState(cartQuantity)

  async function increase(plus, e) {
    try {
      e.target.disabled = true;
      const disabling = setTimeout(() => {
        e.target.disabled = null;
        clearTimeout(disabling);
      }, 1000);
      if (plus && quantity > amount) {
        dispatch(changeQuantity(cart, _id, token, plus));
        setAmount(amount + 1)
      } else if (!plus) {
        dispatch(changeQuantity(cart, _id, token, plus));
        setAmount(amount - 1)
      }
      // dispatch(changeQuantity(cart, _id, token, plus));
      // plus
      //   ? setAmount(amount + 1)
      //   : setAmount(amount - 1)
    } catch (error) {
      dispatch(setErrorAction(error));
    }
  }

  return (
    !loading
      ? <div className={style.cartListItem}>
        <Link to={`/product/${itemNo}`} className={style.cartListItem__icon}>
          <img
            className={style.cartListItem__icon__img}
            src={imageUrls}
            alt={name}
          />
        </Link>
        <div data-price={currentPrice} className={style.cartListItem__description}>
          <Link to={`/product/${itemNo}`}>
            <p className={style.description__title}>{name}</p>
          </Link>
          <p>Quantity: {quantity}</p>
          <p>Price:
            <span className={style.description__currency}>
              &#160;{currentPrice} ETH
            </span>
          </p>
        </div>
        <div className={style.cartListItem__quantity}>
          <button
            type="submit"
            className={style.quantity__btn_increase}
            onClick={amount > 1 ? (e) => increase(false, e) : null}
          >
          </button>
          <div className={style.quantity__value}>
            {amount}
          </div>
          <button
            type="button"
            className={style.quantity__btn_decrease}
            onClick={(e) => increase(true, e)}
          >
          </button>
        </div>
        <button
          type="button"
          className={style.cartListItem__btnDelete}
          onClick={() => dispatch(deleteFromCart(cart, _id, token))}
        >
          &times;
        </button>
      </div>
      : <Loader />
  );
}

CartList.propTypes = {
  imageUrls: PropTypes.array,
  name: PropTypes.string,
  currentPrice: PropTypes.number,
  id: PropTypes.number,
  idCode: PropTypes.number,
  _id: PropTypes.string,
};

CartList.defaultProps = {
  imageUrls: [],
  name: '',
  currentPrice: 0,
  id: 0,
  idCode: 0,
  _id: "",
};