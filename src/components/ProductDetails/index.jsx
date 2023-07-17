import PropTypes from 'prop-types'; 3
import { useDispatch, useSelector } from 'react-redux';
import { buyNowHandler, isInCart } from '../../utils';
import style from './productDetails.module.scss';
import { ETHIcon } from '../Icons';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function ProductDetails({ _id, itemNo, name, currentPrice, quantity, imageUrls, authorIcon, collectionIcon, author, categories, theme, details }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.token)
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className={style.productDetails}>
      <div className={style.productDetails__imgCont}>
        <LazyLoadImage className={style.productDetails__img} src={imageUrls} alt={name || "product image"} effect="blur" />
        <div className={style.productDetails__links}>
          <div className={style.productDetails__userInfo}>
            <p className={style.productDetails__userInfo_text}>Created by:</p>
            <Link to={`/author/${author}`} className={style.productDetails__userInfo_container}>
              <img className={style.productDetails__userInfo_userIcon} src={authorIcon} alt="user-avatar" />
              <p className={style.productDetails__userInfo_userLink}>{author}</p>
            </Link>
          </div>
          <div className={style.productDetails__userInfo}>
            <p className={style.productDetails__userInfo_text}>Collection:</p>
            <div className={style.productDetails__userInfo_container}>
              <Link to='/' className={style.productDetails__userInfo_userCollection} >{categories}</Link>
            </div>
          </div>
          <div className={style.productDetails__userInfo}>
            <p className={style.productDetails__userInfo_text}>Tags:</p>
            <div className={style.productDetails__userInfo_container}>
              {theme && theme.map((item) => (
                <Link to='/' className={style.productDetails__userInfo_userCollection} key={item}>{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={style.productDetails__actions}>
        <div className={style.productDetails__actions_header}>
          <h2 className={style.productDetails__actions_title}>{name}</h2>
        </div>
        <div className={style.productDetails__actions_price}>
          <p>Price</p>
          <p>
            <ETHIcon />
            {currentPrice}
            <span style={{ fontSize: '18px', marginLeft: '3px' }}>ETH</span>
          </p>
        </div>
        <div className={style.productDetails__descr}>
          <h3 className={style.productDetails__descr_title}>Details:</h3>
          <p className={style.productDetails__descr_text}>{details}</p>
        </div>
        {!isInCart(cart, _id)
          ?
          <button
            type='button'
            onClick={() => buyNowHandler(dispatch, _id, token)}
            className={style.productDetails__actions_mainBtn}>
            <span>BUY NOW</span>
          </button>
          : <Link
            to={'/cart'}
            className={style.productDetails__actions_mainBtn}
            type='button'>
            <span>view cart</span>
          </Link>
        }
        {/* <button className={style.productDetails__actions_mainBtn} onClick={() => buyNowHandler(dispatch, _id, token)}>Buy now</button> */}
        <p className={style.productDetails__actions_text}>
          We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities.
          Join the millions of creators, collectors, and curators who are on this journey with you.
        </p>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  imageUrls: PropTypes.array,
  authorIcon: PropTypes.string,
  collectionIcon: PropTypes.string,
  author: PropTypes.string,
  currentPrice: PropTypes.number,
};

ProductDetails.defaultProps = {
  imageUrls: [],
  authorIcon: '/images/avatars/user-icon.png',
  collectionIcon: '/images/icons/collection-icon.png',
  author: 'varios author',
  currentPrice: 0,
};