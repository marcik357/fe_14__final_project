import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import style from './index.module.scss';

export function FormToBuy({ orderAmount }) {
  return (
        <div className={style.wrapper__basket__actionToBuy__toBuy}>
            <form className={style.wrapper__basket__actionToBuy__toBuy__form}>
                <h2 className={style.wrapper__basket__actionToBuy__toBuy__form__title}>
                  Number of telephone
                <NumericFormat
                  className={style.wrapper__basket__actionToBuy__toBuy__form__title__telephone}
                  placeholder="Enter telephone number"
                />
                </h2>
            </form>
            <div className={style.wrapper__basket__actionToBuy__toBuy__totalPrice}>
                <p className={style.wrapper__basket__actionToBuy__toBuy__totalPrice__title}>
                    Total price:
                </p>
                <div className={style.wrapper__basket__actionToBuy__toBuy__totalPrice__priceValue}>
                    <span>{Number(orderAmount.toFixed(2))}</span>
                    <span> ETH</span>
                </div>
              
            </div>
            <button
              type="submit"
              className={style.wrapper__basket__actionToBuy__toBuy__btnBuy}
            >
            buy now
            </button>
        </div>
  );
}
FormToBuy.propTypes = {
  orderAmount: PropTypes.number,
};
FormToBuy.defaultProps = {
  orderAmount: 0,
};