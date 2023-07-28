import React from 'react';
import PropTypes from 'prop-types';
import styles from './productCard.module.scss';
import { buyNowHandler, isInCart } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Verified } from '../Icons/verified';
import { Basket, ETHIcon } from '../Icons';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { AdminProductCard } from '../AdminProductCard';

function ProductCard({
  _id,
  imageUrls,
  authorIcon,
  author,
  currentPrice,
  name,
  itemNo,
  isInAuthor,
  buttonText,
  buttonHandler,
  deleteButtonHandler,
  adminCard = false,
  quantity,
  enabled
}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { token } = useSelector((state) => state.token);

  if (adminCard) return (
    <AdminProductCard
      product={{
        _id,
        imageUrls,
        currentPrice,
        itemNo,
        name,
        enabled,
        quantity,
        author
      }}
      buttonHandler={() => buttonHandler(itemNo)}
      deleteButtonHandler={() => deleteButtonHandler(itemNo)} />
  )

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${itemNo}`} className={styles.productCard__link}>
        <LazyLoadImage
          className={styles.productCard__img}
          src={imageUrls[0]}
          alt={name}
          effect="blur"
          placeholderSrc={'./images/products/placeholder.jpg'}
          height={250}
          width={250} />
        <p className={styles.productCard__name}>
          {name}
        </p>
      </Link>
      <div className={`${styles.productCard__user} ${styles.user}`}>
        <Link
          to={`/author/${author}`}
          className={styles.user__items}>
          <LazyLoadImage
            className={styles.user__icon}
            src={authorIcon}
            alt='user-avatar' />
          <p className={`${styles.user__author} ${isInAuthor ? styles.user__inAuthor : ''}`}>
            {author}
          </p>
        </Link>
        <Verified />
      </div>

      <div className={`${styles.productCard__priceInfo} ${styles.priceInfo}`}>
        {isInCart(cart, _id)
          ? <Link
            to={'/cart'}
            className={`${styles.priceInfo__button} ${styles.priceInfo__cartButton}`}
            type='button'>
            view cart
            <Basket color='#202025' strokeWidth='2.5' />
          </Link>
          : <button
            className={styles.priceInfo__button}
            type='button'
            onClick={!buttonHandler
              ? () => buyNowHandler(dispatch, _id, token)
              : () => buttonHandler(itemNo)}>
            {buttonText}
          </button>}

        <div className={styles.priceInfo__buyNow}>
          <ETHIcon fill={isInAuthor ? '#dbff73' : '#000000'} />
          {isInAuthor
            ? <p className={styles.priceInfo__price_author}>
              {currentPrice}
              &nbsp;
              <span>ETH</span>
            </p>
            : <p className={styles.priceInfo__price}>
              {currentPrice}
              &nbsp;
              <span className={styles.priceInfo__price_eth}>ETH</span>
            </p>}
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  authorIcon: PropTypes.string,
  author: PropTypes.string,
  currentPrice: PropTypes.number,
  buttonText: PropTypes.string,
  buttonHandler: PropTypes.func,
  adminCard: PropTypes.bool
};

ProductCard.defaultProps = {
  imageUrls: [],
  authorIcon: '/images/avatars/user-icon.png',
  author: 'varios author',
  currentPrice: 0,
  buttonText: "Buy now",
};

export default ProductCard;
