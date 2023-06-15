import styles from './productCard.module.scss';

function ProductCard(props) {
  const {
    // eslint-disable-next-line react/prop-types
    url, userIcon, creator, verifiedIcon, currentBid, price,
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
        <div className={styles.productCard__priceInfo_currentBid}>
          <p>Current bid</p>
          <span>
            {currentBid}
            {' '}
            ETH
          </span>
        </div>
        <div className={styles.productCard__priceInfo_buyNow}>
          <p>Buy now</p>
          <span>
            {price}
            ETH
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
