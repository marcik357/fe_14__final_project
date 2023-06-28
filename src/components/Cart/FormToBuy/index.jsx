import PropTypes from 'prop-types';
import style from './index.module.scss';
import { getCart,newCart,addToCartProduct,addNewProductToCart,addToCartQuantity} from '../../../redux/actions/cartActions';
import { useDispatch,useSelector } from 'react-redux';

const obj =  {
  author: "@Art_ofbitcoin",
  categories: "other",
  currentPrice: 2.9,
  date: "2023-06-26T17:39:46.132Z",
  details: "We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.",
  enabled: true,
  imageUrls: ["/images/products/@Art_ofbitcoin_Elon_praying_for_bitcoin_Art.png"],
  itemNo: "784625",
  name: "elon praying for bitcoin",
  quantity: 7,
  theme: ["art", "portrait", "people"],
  __v: 0,
  _id: '6499cd621dc5c151079f8ed1'
};

const idProduct ="6499cd621dc5c151079f8ed1";
export function FormToBuy({ orderAmount }) {
  const dispatch = useDispatch();
  

  async function local(cart) {
    const addTo =await localStorage.setItem('cart',JSON.stringify(cart))
  }

  function workWithServer(){
    // dispatch(addToCartProduct(obj))
    localStorage.getItem('token') ? dispatch(newCart(idProduct)):(
      dispatch(addToCartProduct(obj)),
      dispatch(addToCartQuantity(idProduct))
    )
    
    // dispatch(getCart())
    // dispatch(addNewProductToCart(idProduct,token))
  }
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
              type="button"
              className={style.makeOrder__btnBuy}
              onClick={workWithServer}
            >
            buy now
            </button>
        </div>
  );
}
FormToBuy.propTypes = {
  orderAmount: PropTypes.number,
  author: PropTypes.string,
  categories: PropTypes.string,
  quantity: PropTypes.number,
  currentPrice: PropTypes.number,
  details:PropTypes.string,
  sumOfOrder: PropTypes.func,
  setOrderAmount: PropTypes.func,
  id: PropTypes.number,
  idCode:PropTypes.number,
  _id:PropTypes.string,
  date:PropTypes.string,
};
FormToBuy.defaultProps = {
  orderAmount: 0,
  author: '',
  categories: '',
  date:'',
  details:'',
  quantity: 0,
  currentPrice: 0,
  sumOfOrder: '',
  setOrderAmount: '',
  id: 0,
  idCode:0,
  _id:'',
};