import PropTypes from 'prop-types'; 3
import { useDispatch } from 'react-redux';
import { buyNowHandler } from '../../utils';
import styles from './productDetails.module.scss';
// потім перейменувати у style
import { ETHIcon } from '../Icons';

export default function ProductDetails({ _id, itemNo, name, currentPrice, imageUrls, userIcon, collectionIcon, author, style }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.productDetails}>
      <div className={styles.productDetails__imgCont}>
        <img className={styles.productDetails__img} src={imageUrls[0].slice(1)} alt="product-img" />
        <div className={styles.productDetails__links}>
          <div className={styles.productDetails__userInfo}>
            <p className={styles.productDetails__userInfo_text}>Created by</p>
            <div className={styles.productDetails__userInfo_container}>
              <img className={styles.productDetails__userInfo_userIcon} src={userIcon} alt="user-avatar" />
              <p className={styles.productDetails__userInfo_userLink}>{author}</p>
            </div>
          </div>
          <div className={styles.productDetails__userInfo}>
            <p className={styles.productDetails__userInfo_text}>Collection</p>
            <div className={styles.productDetails__userInfo_container}>
              {style && style.map((item) => (
                <a href='/' className={styles.productDetails__userInfo_userCollection} key={item}>{item}</a>
              ))}
            </div>
          </div>
        </div>
        {/* <div className={styles.productDetails__info}>
          <h3 className={styles.productDetails__info_title}>Details:</h3>
          <p className={styles.productDetails__info_text}>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.</p>
        </div> */}
      </div>
      <div className={styles.productDetails__actions}>
        <div className={styles.productDetails__actions_header}>
          <h2 className={styles.productDetails__actions_title}>{name}</h2>
        </div>
        <div className={styles.productDetails__actions_price}>
          <p>Price</p>
          <p>
            <ETHIcon />
            {currentPrice}
            <span styles={{ fontSize: '18px', marginLeft: '3px' }}>ETH</span>
          </p>
        </div>
        <div className={styles.productDetails__descr}>
          <h3 className={styles.productDetails__descr_title}>Details:</h3>
          <p className={styles.productDetails__descr_text}>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.</p>
        </div>
        <div className={styles.productDetails__buttons}>
          <div className={styles.productDetails__buttons_container}>
            <div className={styles.productDetails__buttons_actions}>
              {/* <button className={styles.productDetails__buttons_buy} onClick={() => buyNowHandler(dispatch, itemNo)}>Buy now</button> */}
              <button className={styles.productDetails__buttons_fav}>♡</button>
              {/* <button className={styles.productDetails__buttons_delete}>Delete</button> */}
            </div>
          </div>
        </div>
        <button className={styles.productDetails__actions_mainBtn} onClick={() => buyNowHandler(dispatch, itemNo)}>Buy now</button>
        <p className={styles.productDetails__actions_text}>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.</p>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  imageUrls: PropTypes.array,
  userIcon: PropTypes.string,
  collectionIcon: PropTypes.string,
  author: PropTypes.string,
  currentPrice: PropTypes.number,
};

ProductDetails.defaultProps = {
  imageUrls: [],
  userIcon: '/images/avatars/user-icon.png',
  collectionIcon: '/images/icons/collection-icon.png',
  author: 'varios author',
  currentPrice: 0,
};