import PropTypes from 'prop-types';
import style from './index.module.scss';
import axios from 'axios';
import { newCart,addToCartProduct,addNewProductToCart,addToCartQuantity} from '../../redux/actions/cartActions';
import { useDispatch,useSelector} from 'react-redux';

let token = localStorage.getItem('tokenCart');
// const obj =  {
//   author: "@Art_ofbitcoin",
//   categories: "other",
//   currentPrice: 2.9,
//   date: "2023-06-26T17:39:46.132Z",
//   details: "We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.",
//   enabled: true,
//   imageUrls: ["/images/products/@Art_ofbitcoin_Elon_praying_for_bitcoin_Art.png"],
//   itemNo: "784625",
//   name: "elon praying for bitcoin",
//   quantity: 7,
//   theme: ["art", "portrait", "people"],
//   __v: 0,
//   _id: '6499cd621dc5c151079f8ed1'
// };

const obj =  {
  author: "@Art_ofbitcoin",
  categories: "art side",
  currentPrice: 1.5,
  date: "2023-06-26T17:39:46.132Z",
  details: "We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.",
  enabled: true,
  imageUrls: ["/images/products/@ArtWarsNFT_Art_Side.png"],
  itemNo: "401406",
  name: "art side",
  quantity: 7,
  theme: ["art", "portrait", "people"],
  __v: 0,
  _id: '6499cd711dc5c1843d9f8ed3'
};
const idProduct ="6499cd711dc5c1843d9f8ed3";
export function FormToBuy({ orderAmount }) {
  const dispatch = useDispatch();
  const { cartProductsAdd,products } = useSelector(state => state.cart);

  function workWithServer(){
  //   const userData = {
  //     loginOrEmail: "sitnikov.artem91@gmail.com",
  //     password: "66666666"
  //   };

  //   axios
  // .post("https://plankton-app-6vr5h.ondigitalocean.app/api/customers/login", userData)
  // .then(loginResult => {
  //   localStorage.setItem('tokenCart',loginResult.data.token)
  //   /*Do something with jwt-token if login successed*/
  // })
  // .catch(err => {
  //   /*Show error to customer, may be incorrect password or something else*/
  // });
    localStorage.getItem('tokenCart') ?
    ( cartProductsAdd.length > 0 && products.length > 0 ?(
      dispatch(addNewProductToCart(idProduct,token)),
      dispatch(addToCartProduct(obj))
    ):(
      dispatch(newCart(idProduct,token)),
      dispatch(addToCartProduct(obj)))
    )
    :(
      dispatch(addToCartProduct(obj)),
      dispatch(addToCartQuantity(idProduct))
    )
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
  sumOfOrder: PropTypes.string,
  setOrderAmount: PropTypes.string,
};
FormToBuy.defaultProps = {
  orderAmount: 0,
  sumOfOrder: '',
  setOrderAmount: '',
};