/* eslint-disable react/prop-types */
import styles from './productCard.module.scss';

function ProductCard(props) {
  const {
    url, userIcon, creator, verifiedIcon, price,
  } = props;

  return (
    <div className={styles.productCard}>
      <img className={styles.productCard__img} src={url} alt="" />
      <div className={styles.productCard__userInfo}>
        <div className={styles.productCard__userInfo_items}>
          <img
            className={styles.productCard__userInfo_userIcon}
            src={userIcon}
            alt="user-avatar"
          />
          <p className={styles.productCard__userInfo_creator}>
            @
            {creator}
          </p>
        </div>

        <img
          className={styles.productCard__userInfo_verifiedIcon}
          src={verifiedIcon}
          alt="verified-icon"
        />
      </div>
      <div className={styles.productCard__priceInfo}>
        <div className={styles.productCard__priceInfo_price}>
          
          <button className={styles.productCard__priceInfo_button} type="submit">Buy now</button>
        </div>
        <div className={styles.productCard__priceInfo_buyNow}>
          <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <path d="M15.927 23.959l-9.823-5.797 9.817 13.839 9.828-13.839-9.828 5.797zM16.073 0l-9.819 16.297 9.819 5.807 9.823-5.801z" />
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

export default ProductCard;
