import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import style from './index.module.scss';
import { data } from '../data/data';
import icon from '../image/item-img.png';

export function BasketItem(props) {
  const parentElement = useRef();
  const
    {
      title, text, quantity, price, sumOfOrder, setOrderAmount, id,
    } = props;
  const [quantityItem, setQuantityItem] = useState(quantity);
  useEffect(() => {
    setOrderAmount(sumOfOrder(data));
  }, []);
  function deleteElementFromScreen(e) {
    e.preventDefault();
    parentElement.current.remove();
    alert('Item deleted successfully');
  }
  function decrease(e) {
    e.preventDefault();
    if (quantityItem <= 0)setQuantityItem(0);
    else { setQuantityItem(quantityItem - 1); }
    const priceUp = Array.from(parentElement.current.children).find(
      ((elem) => elem.dataset.price),
    )
      .dataset.price;
    setOrderAmount((prev) => prev - parseFloat(priceUp));
  }
  function increase() {
    setQuantityItem(quantityItem + 1);
    const priceUp = Array.from(parentElement.current.children).find(((elem) => elem.dataset.price))
      .dataset.price;
    setOrderAmount((prev) => prev + parseFloat(priceUp));
  }
  return (
    <div ref={parentElement} data-id={id} className={style.wrapper__basket__items__cardOfItem}>
      <div className={style.wrapper__basket__items__cardOfItem__icon}>
        <img
          className={style.wrapper__basket__items__cardOfItem__icon__img}
          src={icon}
          alt={title}
        />
      </div>
      <div data-price={price} className={style.wrapper__basket__items__cardOfItem__decription}>
        <p className={style.wrapper__basket__items__cardOfItem__decription__title}>{title}</p>
        <p>{text}:
        <span className={style.wrapper__basket__items__cardOfItem__decription__currency}>
        &#160;{price} ETH
        </span>
        </p>
      </div>
      <div
        className={style.wrapper__basket__items__cardOfItem__quantity}
      >
        <button
          type="submit"
          className={style.wrapper__basket__items__cardOfItem__quantity__btn}
          onClick={decrease}
        > -
        </button>
       <div
         className={style.wrapper__basket__items__cardOfItem__quantity__value}
       >{quantityItem}
       </div>
        <button
          type="submit"
          className={style.wrapper__basket__items__cardOfItem__quantity__btn}
          onClick={increase}
        > +
        </button>
      </div>
            <button
              type="submit"
              className={style.wrapper__basket__items__cardOfItem__btnDelete}
              onClick={deleteElementFromScreen}
            >Delete
            </button>
    </div>
  );
}
BasketItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  sumOfOrder: PropTypes.func,
  setOrderAmount: PropTypes.func,
  id: PropTypes.number,
};
BasketItem.defaultProps = {
  title: '',
  text: '',
  quantity: 0,
  price: 0,
  sumOfOrder: '',
  setOrderAmount: '',
  id: '',
};