import React from 'react';
import PropTypes from 'prop-types';
import styles from './productCard.module.scss';
import { buyNowHandler } from '../../utils';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Verified } from '../Icons/verified';
import { ETHIcon } from '../Icons';

function ProductCard({
  _id,
  imageUrls,
  authorIcon,
  author,
  currentPrice,
  name,
  itemNo,
  isInAuthor
}) {
  const dispatch = useDispatch();

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
          className={styles.productCard__userInfo_items}>
          <img
            className={styles.productCard__userInfo_userIcon}
            src={authorIcon}
            alt='user-avatar'
          />
          <p className={styles.productCard__userInfo_author}>{author}</p>
        </Link>
        <Verified />
      </div>

      <div className={styles.productCard__priceInfo}>
        <button
          className={styles.productCard__priceInfo_button}
          type='button'
          onClick={() => buyNowHandler(dispatch, _id)}
        >
          Buy now
        </button>
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
  authorIcon: PropTypes.string,
  author: PropTypes.string,
  currentPrice: PropTypes.number,
};

ProductCard.defaultProps = {
  imageUrls: [],
  authorIcon: '/images/avatars/user-icon.png',
  author: 'varios author',
  currentPrice: 0,
};

export default ProductCard;
