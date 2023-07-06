import { useSelector } from 'react-redux';
import ProductList from '../ProductList';
import style from './authorDetails.module.scss';
import banner from './img/author-banner.png';
import socialData from '../SocialLink/socialData';
import SocialLink from '../SocialLink';

export function AuthorDetails({author}){
    const products = useSelector((state) => state.products.products);
    const authorProducts = products.filter(product => {
        return product.author === author.customId
    });

    return (
        <div className={style.authorDetails}>
            <div className={style.authorDetails__container}>
                <div style={{position: 'relative'}}>
                    <div className={style.authorDetails__banner}>
                        <img src={banner} className={style.authorDetails__banner_image} alt="author-banner" />
                    </div>
                    <div className={style.authorDetails__author}>
                        <img src={author.imageUrl || '/images/avatars/user-icon.png'} className={style.authorDetails__author_icon} alt="author-icon" />
                    </div>
                </div>
                <div className={style.authorDetails__mainContent}>
                    <div className={style.authorDetails__info}>
                        <h1 className={style.authorDetails__info_title}>{author.name}</h1>
                        <p className={style.authorDetails__info_id}>{author.customId}</p>
                        <div className={style.authorDetails__info_container}>
                        <div className={style.authorDetails__info_text}>
                            <p className={style.authorDetails__info_subtitle}>Bio</p>
                            <p>{author.description}</p>
                        </div>
                        <ul className={style.authorDetails__info_links}>
                            {socialData.map(({type, url, icon}) => (
                                <SocialLink
                                  key={type}
                                  url={url}
                                  icon={icon('#010101')}
                                />
                            ))}
                        </ul>
                        </div>
                    </div>
                    <div className={style.authorDetails__products}>
                        <div className={style.authorDetails__products_container}>
                            <p className={style.authorDetails__products_title}>Created</p>
                        </div>
                        <ProductList products={authorProducts} isInAuthor={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}