import PropTypes from 'prop-types';
import style from './index.module.scss';
import { useDispatch,useSelector} from 'react-redux';
// import { buyProduct } from '../../redux/actions/cartActions';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
let token = localStorage.getItem('token');

export function FormToBuy({ orderAmount }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const loading = useSelector((state) => state.loading.loading);

  return (!loading ?
        <div className={style.makeOrder}>
            <h2 className={style.makeOrder__slogan}><span className={style.makeOrder__slogan__text} > Be creative,</span> buy NFT now</h2>
            <div className={style.makeOrder__block}>
              <p className={style.block__title}>
                  Total price:
              </p>
              <div className={style.block__summeryPriceValue}>
                  <span>{Number(orderAmount.toFixed(2))}</span>
                  <span> ETH</span>
              </div>
            </div>
            <Link className={style.btnBuy} to='/order'>
            <button
              type="button"
              // onClick={()=>dispatch(buyProduct(token))}
            >
            buy now
            </button>
            </Link>
        </div>:<Loader/>
  );
}
FormToBuy.propTypes = {
  orderAmount: PropTypes.number,
  sumOfOrder: PropTypes.string,
  setOrderAmount: PropTypes.string,
};
FormToBuy.defaultProps = {
  orderAmount: 0,
  sumOfOrder: '',
  setOrderAmount: '',
};