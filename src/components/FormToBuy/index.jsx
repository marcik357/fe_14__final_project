import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { buyProduct } from '../../redux/actions/cartActions';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { Quantity } from '../../router';

export function FormToBuy() {
  const [ orderAmount ] = useContext(Quantity);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.token.token);

  return (!loading ?
    <div className={style.makeOrder}>
      <h2 className={style.makeOrder__slogan}>
        Be creative, buy NFT now
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
      <Link  className={style.makeOrder__btnBuy} to='/order'>
      <button
        type="button"
        onClick={() => dispatch(buyProduct(token))}
      >
        buy now
      </button>
      </Link>
    </div> : <Loader />
  );
}
