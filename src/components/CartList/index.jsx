import PropTypes from 'prop-types';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantityInCartWithServer,changeQuantityInCartLocal,deleteFromCartProduct,deleteFromCartProductWithServer} from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
let token = localStorage.getItem('token');
let flag;

export function CartList(props) {
    const dispatch = useDispatch();
    const { imageUrls, name, currentPrice, sumOfOrder, setOrderAmount, _id ,itemNo } = props;
    const { cartProductsArray,products } = useSelector(state => state.cart);
    const loading = useSelector((state) => state.loading.loading);
    let currentQuantity = products.length > 0 ? (products.find(item=>item.product === _id))?.cartQuantity: 0;
  function deleteProductFromCart() {
    token ?
    dispatch(deleteFromCartProductWithServer(_id,cartProductsArray,products,token)) :
    dispatch(deleteFromCartProduct(_id,cartProductsArray,products));
    setOrderAmount(0)
  }
  
  function changeValueOfProductInCart(flag) {
    token? (dispatch(changeQuantityInCartWithServer(_id,currentQuantity,products,token,flag)),setOrderAmount(sumOfOrder(cartProductsArray,products))):
    dispatch(changeQuantityInCartLocal(_id,currentQuantity,products,flag));
    setOrderAmount(sumOfOrder(cartProductsArray,products))
  }
  

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
      <div data-price={currentPrice} className={style.cartListItem__description}>
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
          onClick={currentQuantity > 1 ? (()=>changeValueOfProductInCart(false)) : null}
        > -
        </button>
       <div
         className={style.quantity__value}
       >
        {products.length > 0 ? currentQuantity: 1}
       </div>
        <button
          type="button"
          className={style.quantity__btn}
          onClick={()=> changeValueOfProductInCart(true)}
        > +
        </button>
      </div>
      <button
        type="submit"
        className={style.cartListItem__btnDelete}
        onClick={deleteProductFromCart}
      >
        Delete
   
      </button>
    </div>
    : <Loader/>
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