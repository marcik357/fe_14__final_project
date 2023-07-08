import PropTypes from 'prop-types';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart,changeQuantityProduct } from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
let token = localStorage.getItem('token');
let flag;

export function CartList(props) {
    const dispatch = useDispatch();
    const { imageUrls, name, currentPrice, _id ,itemNo, cartQuantity } = props;
    const cart = useSelector(state => state.cart);
    const { token } = useSelector(state => state.token);
    const { products } = useSelector(state => state.products);
    const loading = useSelector((state) => state.loading.loading);
    let currentQuantity = token ? cartQuantity :((cart?.find(item => item.product === _id)).cartQuantity);
  

    return (!loading ?
    <div className={style.cartListItem}>
      <div className={style.cartListItem__icon}>
        <Link to={`/product/${itemNo}`}>
        <img
          className={style.cartListItem__icon__img}
          src={imageUrls}
          alt={name}
        />
        </Link>
      </div>
      <div className={style.cartListItem__description}>
        <Link to={`/product/${itemNo}`}>
        <p className={style.description__title}>{name}</p>
        </Link>
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
          type="submit"
          className={style.quantity__btn}
          onClick={currentQuantity > 1 ?  ()=>(dispatch(changeQuantityProduct(_id,token,cart,false))): null}
        > -
        </button>
       <div
         className={style.quantity__value}
       >
      {cart?.length > 0 || cart?.products.length >0 ? currentQuantity: 0}
       </div>
        <button
          type="button"
          className={style.quantity__btn}
          onClick={()=> dispatch(changeQuantityProduct(_id,token,cart,true))}
        > +
        </button>
      </div>
      <button
        type="submit"
        className={style.cartListItem__btnDelete}
        onClick={()=>(dispatch(deleteCart(_id,token)))}
      >
        &times;
      </button>
    </div>
    : <Loader/>
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