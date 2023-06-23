import PropTypes from 'prop-types';
import style from './index.module.scss';

export function FormToBuy({ orderAmount }) {
  return (
        <div className={style.makeOrder}>
            <h2 className={style.makeOrder__slogan}> Be creative, buy NFT now</h2>
            <div className={style.makeOrder__block}>
              <p className={style.block__title}>
                  Total price:
              </p>
              <div className={style.block__summeryPriceValue}>
                  <span>{Number(orderAmount.toFixed(2))}</span>
                  <span> ETH</span>
              </div>
            </div>
            <button
              type="submit"
              className={style.makeOrder__btnBuy}
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