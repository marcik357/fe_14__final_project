import PropTypes from 'prop-types'; 3
import { useDispatch, useSelector } from 'react-redux';
import { buyNowHandler, isInCart } from '../../utils';
import style from './productDetails.module.scss';
import { ETHIcon } from '../Icons';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function ProductDetails({ _id, name, currentPrice, imageUrls, authorIcon, author, categories, theme, details }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.token)
  const cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <div className={style.content}>
        <LazyLoadImage className={style.content__img} src={imageUrls} alt={name || "product image"} effect="blur" />
        <div className={style.content__wrapper}>
          <div className={`${style.content__userInfo} ${style.info}`}>
            <p className={style.info__text}>Created by:</p>
            <Link to={`/author/${author}`} className={style.info__block}>
              <img className={style.info__icon} src={authorIcon} alt="user-avatar" />
              <p className={style.info__userLink}>{author}</p>
            </Link>
          </div>
          <div className={`${style.content__userInfo} ${style.info}`}>
            <p className={style.info__text}>Collection:</p>
            <div className={style.info__block}>
              <Link to={`/collection/${categories}`} className={style.info__props}>{categories}</Link>
            </div>
          </div>
          <div className={`${style.content__userInfo} ${style.info}`}>
            <p className={style.info__text}>Tags:</p>
            <div className={style.info__block}>
              {theme && theme.map((item) => (
                <div className={style.info__props} key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={style.actions}>
        <div className={style.actions__header}>
          <h2 className={style.actions__title}>{name}</h2>
        </div>
        <div className={style.actions__price}>
          <p>Price</p>
          <p>
            <ETHIcon />
            {currentPrice}
            <span style={{ fontSize: '18px', marginLeft: '3px' }}>ETH</span>
          </p>
        </div>
        <div className={`${style.actions__descr} ${style.descr}`}>
          <h3 className={style.descr__title}>Details:</h3>
          <p className={style.descr__text}>{details}</p>
        </div>
        {!isInCart(cart, _id)
          ? <button
            type='button'
            onClick={() => buyNowHandler(dispatch, _id, token)}
            className={style.actions__mainBtn}>
            <span>BUY NOW</span>
          </button>
          : <Link
            to={'/cart'}
            className={style.actions__mainBtn}
            type='button'>
            <span>view cart</span>
          </Link>}
        <p className={style.actions__text}>
          We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities.
          Join the millions of creators, collectors, and curators who are on this journey with you.
        </p>
      </div>
    </>
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