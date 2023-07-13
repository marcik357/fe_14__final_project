import React from 'react';
import PropTypes from 'prop-types';
import styles from './productCard.module.scss';
import { buyNowHandler } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Verified } from '../Icons/verified';
import { ArrowRight, ETHIcon } from '../Icons';

function ProductCard({
  _id,
  imageUrls,
  authorIcon,
  author,
  currentPrice,
  name,
  itemNo,
  isInAuthor,
}) {
  const dispatch = useDispatch();
  const cartProductsArray = useSelector((state) => state.cart.cart.products);
  const isInCart = cartProductsArray.find(
    (product) => product.product._id === _id
  );
  const { token } = useSelector((state) => state.token);

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${itemNo}`}>
        <img
          className={styles.productCard__img}
          src={imageUrls[0]}
          alt={name}
        />
        <p className={styles.productCard__name}>{name}</p>
      </Link>
      <div className={styles.productCard__userInfo}>
        <Link
          to={`/author/${author}`}
          className={styles.productCard__userInfo_items}
        >
          <img
            className={styles.productCard__userInfo_userIcon}
            src={authorIcon}
            alt='user-avatar'
          />
          <p
            className={`${styles.productCard__userInfo_author} ${
              isInAuthor ? styles.productCard__userInfo_inAuthor : ''
            }`}
          >
            {author}
          </p>
        </Link>
        <Verified />
      </div>

      <div className={styles.productCard__priceInfo}>
        {isInCart ? (
          <Link
            to={'/cart'}
            className={styles.productCard__priceInfo_button}
            type='button'
          >
            view cart
            <ArrowRight />
          </Link>
        ) : (
          <button
            className={styles.productCard__priceInfo_button}
            type='button'
            onClick={() => buyNowHandler(dispatch, _id, token)}
          >
            Buy now
          </button>
        )}

        <div className={styles.productCard__priceInfo_buyNow}>
          <ETHIcon fill={isInAuthor ? '#dbff73' : '#000000'} />
          {isInAuthor ? (
            <p className={styles.productCard__priceInAuthor}>
              {currentPrice}
              &nbsp;
              <span>ETH</span>
            </p>
          ) : (
            <p>
              {currentPrice}
              &nbsp;
              <span>ETH</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  authorIcon: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  itemNo: PropTypes.string.isRequired,
};

export default ProductCard;
