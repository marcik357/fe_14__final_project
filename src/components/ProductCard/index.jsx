import React from 'react';
import PropTypes from 'prop-types';
import styles from './productCard.module.scss';
import { buyNowHandler } from '../../utils';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductCard({ url, userIcon, creator, verifiedIcon, price, name, id }) {
  const dispatch = useDispatch()

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${id}`}>
      <img
        className={styles.productCard__img}
        src={url}
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
          <p className={styles.productCard__userInfo_creator}>@{creator}</p>
        </div>

        <img
          className={styles.productCard__userInfo_verifiedIcon}
          src={verifiedIcon}
          alt='verified-icon'
        />
      </div>
      <div className={styles.productCard__priceInfo}>
        <div className={styles.productCard__priceInfo_price}>
          <button
            className={styles.productCard__priceInfo_button}
            type='button'
            onClick={() => buyNowHandler(dispatch, id)}
          >
            Buy now
          </button>
        </div>
        <div className={styles.productCard__priceInfo_buyNow}>
          <svg
            fill='#000000'
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0' />
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <g id='SVGRepo_iconCarrier'>
              <path d='M15.927 23.959l-9.823-5.797 9.817 13.839 9.828-13.839-9.828 5.797zM16.073 0l-9.819 16.297 9.819 5.807 9.823-5.801z' />
            </g>
          </svg>
          <p>
            {price}
            &nbsp;
            <span>ETH</span>
          </p>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  url: PropTypes.string,
  userIcon: PropTypes.string,
  creator: PropTypes.string,
  verifiedIcon: PropTypes.string,
  price: PropTypes.string,
};

ProductCard.defaultProps = {
  url: '',
  userIcon: '',
  creator: '',
  verifiedIcon: '',
  price: 0,
};

export default ProductCard;
