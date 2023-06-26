import React from 'react';
import PropTypes from 'prop-types';
import styles from './productCard.module.scss';
import { buyNowHandler } from '../../utils';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Verified } from '../Icons/verified';
import { ETHIcon } from '../Icons';

function ProductCard({ imageUrls, userIcon, author, currentPrice, name, itemNo }) {
  const dispatch = useDispatch()

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${itemNo}`}>
        <img
          className={styles.productCard__img}
          src={imageUrls[0]}
          alt='product-card'
        />
      </Link>
      <div className={styles.productCard__userInfo}>
        <div className={styles.productCard__userInfo_items}>
          <div className={styles.productCard__userInfo_name}>{name}</div>
          <img
            className={styles.productCard__userInfo_userIcon}
            src={userIcon}
            alt='user-avatar'
          />
          <p className={styles.productCard__userInfo_author}>{author}</p>
        </div>
        <Verified />
      </div>
      <div className={styles.productCard__priceInfo}>
        <div className={styles.productCard__priceInfo_price}>
          <button
            className={styles.productCard__priceInfo_button}
            type='button'
            onClick={() => buyNowHandler(dispatch, itemNo)}
          >
            Buy now
          </button>
        </div>
        <div className={styles.productCard__priceInfo_buyNow}>
          <ETHIcon />
          <p>
            {currentPrice}
            &nbsp;
            <span>ETH</span>
          </p>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  imageUrls: PropTypes.array,
  userIcon: PropTypes.string,
  author: PropTypes.string,
  currentPrice: PropTypes.number,
};

ProductCard.defaultProps = {
  imageUrls: [],
  userIcon: './images/avatars/user-icon.png',
  author: 'varios author',
  currentPrice: 0,
};

export default ProductCard;
