import { useDispatch } from 'react-redux';
import { buyNowHandler } from '../../utils';
import style from './productDetails.module.scss';

export default function ProductDetails(props){
    const dispatch = useDispatch();
    const {id, url, userIcon, collectionIcon, user, creator, price} = props;
    return (
        <div className={style.productDetails}>
            <div className={style.productDetails__imgCont}>
                <img className={style.productDetails__img} src={url} alt="product-img" />
                <div className={style.productDetails__links}>
                    <div className={style.productDetails__userInfo}>
                        <p className={style.productDetails__userInfo_text}>Created by</p>
                        <div className={style.productDetails__userInfo_container}>
                            <img className={style.productDetails__userInfo_userIcon} src={userIcon} alt="user-avatar" />
                            <div className={style.productDetails__userInfo_userText}>
                                <p className={style.productDetails__userInfo_userName}>Dash{user}</p>
                                <p className={style.productDetails__userInfo_userLink}>@{creator}</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.productDetails__userInfo}>
                        <p className={style.productDetails__userInfo_text}>Collection</p>
                        <div className={style.productDetails__userInfo_container}>
                            <img className={style.productDetails__userInfo_userIcon} src={collectionIcon} alt="user-avatar" />
                            <div className={style.productDetails__userInfo_userText}>
                                <p className={style.productDetails__userInfo_userName}>Cute planet</p>
                                <p className={style.productDetails__userInfo_userCollection}>Cute</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.productDetails__info}>
                    <h3 className={style.productDetails__info_title}>Details</h3>
                    <p className={style.productDetails__info_text}>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.</p>
                </div>
            </div>
            <div className={style.productDetails__actions}>
                <div className={style.productDetails__actions_container}>
                    <div className={style.productDetails__actions_header}>
                        <h2 className={style.productDetails__actions_title}>Cute Planet</h2>
                        <img className={style.productDetails__userInfo_userIcon} src={collectionIcon} alt="user-avatar" />
                    </div>
                    <div className={style.productDetails__actions_price}>
                        <p>Price</p>
                        <p>{price}<span style={{fontSize: '18px', marginLeft: '3px'}}>ETH</span></p>
                    </div>
                    <div className={style.productDetails__descr}>
                        <h3 className={style.productDetails__descr_title}>Details</h3>
                        <p className={style.productDetails__descr_text}>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.</p>
                    </div>
                    <div className={style.productDetails__buttons}>
                        <div className={style.productDetails__buttons_container}>
                            <div className={style.productDetails__buttons_actions}>
                                <button className={style.productDetails__buttons_buy} onClick={() => buyNowHandler(dispatch, id)}>Buy now</button>
                                <button className={style.productDetails__buttons_fav}>♡</button>
                                <button className={style.productDetails__buttons_delete}>Delete</button>
                            </div>
                        </div>
                    </div>
                    <button className={style.productDetails__actions_mainBtn} onClick={() => buyNowHandler(dispatch, id)}>Buy now</button>
                    <p className={style.productDetails__actions_text}>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you.</p>
                </div>
            </div>
        </div>
    );
}