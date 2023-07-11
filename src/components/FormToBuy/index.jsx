import PropTypes from 'prop-types';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { buyProduct } from '../../redux/actions/cartActions';
import Loader from '../Loader';

export function FormToBuy({ orderAmount }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.token.token);

  return (!loading ?
    <div className={style.makeOrder}>
      <h2 className={style.makeOrder__slogan}>
        <span className={style.makeOrder__slogan__text}> Be creative, </span>
        buy NFT now
      </h2>
      <div className={style.makeOrder__block}>
        <p className={style.block__title}>
          Total price:
        </p>
        <div className={style.block__summeryPriceValue}>
          <span>{Number(orderAmount.toFixed(2)) || 0}</span>
          <span> ETH</span>
        </div>
      </div>
      <button
        type="button"
        className={style.makeOrder__btnBuy}
        onClick={() => dispatch(buyProduct(token))}
      >
        buy now
      </button>
    </div> : <Loader />
  );
}

FormToBuy.propTypes = {
  orderAmount: PropTypes.number,
};

FormToBuy.defaultProps = {
  orderAmount: 0,
};