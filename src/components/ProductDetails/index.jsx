import PropTypes from 'prop-types'; 3
import { useDispatch } from 'react-redux';
import { buyNowHandler } from '../../utils';
import style from './productDetails.module.scss';
// потім перейменувати у style
import { ETHIcon } from '../Icons';

export default function ProductDetails({ _id, itemNo, name, currentPrice, imageUrls, userIcon, collectionIcon, author, theme }) {
  const dispatch = useDispatch();

  return (
    <div className={style.productDetails}>
      <div className={style.productDetails__imgCont}>
        <img className={style.productDetails__img} src={imageUrls[0].slice(1)} alt={name || "product image"} />
        <div className={style.productDetails__links}>
          <div className={style.productDetails__userInfo}>
            <p className={style.productDetails__userInfo_text}>Created by</p>
            <div className={style.productDetails__userInfo_container}>
              <img className={style.productDetails__userInfo_userIcon} src={userIcon} alt="user-avatar" />
              <p className={style.productDetails__userInfo_userLink}>{author}</p>
            </div>
          </div>
          <div className={style.productDetails__userInfo}>
            <p className={style.productDetails__userInfo_text}>Collection</p>
            <div className={style.productDetails__userInfo_container}>
              {theme && theme.map((item) => (
                <a href='/' className={style.productDetails__userInfo_userCollection} key={item}>{item}</a>
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
          <p className={style.productDetails__descr_text}>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.</p>
        </div>
        <div className={style.productDetails__buttons}>
          <div className={style.productDetails__buttons_container}>
            <div className={style.productDetails__buttons_actions}>
              {/* <button className={style.productDetails__buttons_buy} onClick={() => buyNowHandler(dispatch, itemNo)}>Buy now</button> */}
              <button className={style.productDetails__buttons_fav}>♡</button>
              {/* <button className={style.productDetails__buttons_delete}>Delete</button> */}
            </div>
          </div>
        </div>
        <button className={style.productDetails__actions_mainBtn} onClick={() => buyNowHandler(dispatch, itemNo)}>Buy now</button>
        <p className={style.productDetails__actions_text}>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.</p>
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