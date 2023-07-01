import { Facebook, Instagram, Linkedin, Twitter } from '../Icons';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductList from '../ProductList';
import style from './authorDetails.module.scss';
import banner from './img/author-banner.png';
import icon from './img/avatar.png';

export function AuthorDetails(){
    const products = useSelector((state) => state.products.products);
    const { authorId } = useParams();
    return (
        <div className={style.authorDetails}>
            <div className={style.authorDetails__container}>
                <div className={style.authorDetails__banner}>
                    <img src={banner} className={style.authorDetails__banner_image} alt="author-banner" />
                </div>
                <div className={style.authorDetails__author}>
                    <img src={icon} className={style.authorDetails__author_icon} alt="author-icon" />
                </div>
                <div className={style.authorDetails__mainContent}>
                    <div className={style.authorDetails__info}>
                        <h1 className={style.authorDetails__info_title}>{authorId.replace(/@/g, '')}</h1>
                        <p className={style.authorDetails__info_id}>{authorId}</p>
                        <div className={style.authorDetails__info_container}>
                        <div className={style.authorDetails__info_text}>
                            <p className={style.authorDetails__info_subtitle}>Bio</p>
                            <p>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey.</p>
                        </div>
                        <div className={style.authorDetails__info_links}>
                            <Instagram />
                            <Twitter />
                            <Linkedin />
                            <Facebook />
                        </div>
                        </div>
                    </div>
                    <div className={style.authorDetails__products}>
                        <ProductList products={products} />
                    </div>
                </div>
            </div>
        </div>
    );
}