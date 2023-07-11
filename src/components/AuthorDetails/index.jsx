import { useSelector } from 'react-redux';
import ProductList from '../ProductList';
import style from './authorDetails.module.scss';
import SocialLink from '../SocialLink';
import { getSocialIcon } from './socialIcon';
import Banner from '../Banner';

export function AuthorDetails({author}){
    const products = useSelector((state) => state.products.products);

    const authorProducts = products.filter(product => {
        return product.author === author.customId
    });
    
    const socialLinks = author.urls.map((urlObj, index) => {
        const [key, value] = Object.entries(urlObj)[0];
        return (
          <SocialLink
            key={index}
            url={value}
            icon={getSocialIcon(key)}
          />
        );
    });

    const productCount = authorProducts.length;

    return (
        <div className={style.authorDetails}>
            <div className={style.authorDetails__container}>
                <Banner title={author.name} img='/images/banners/author-banner.png'/>
                <div className={style.authorDetails__mainContent}>
                    <div className={style.authorDetails__info}>
                        <div className={style.authorDetails__info_container}>
                        <img src={author.imageUrl || '/images/avatars/user-icon.png'} className={style.authorDetails__authorIcon} alt="author-icon" />
                        <h1 className={style.authorDetails__info_title}>{author.name}</h1>
                        <p className={style.authorDetails__info_id}>{author.customId}</p>
                        <div className={style.authorDetails__info_bio}>
                            <div className={style.authorDetails__info_text}>
                                <p className={style.authorDetails__info_subtitle}>Bio</p>
                                <p>{author.description}</p>
                            </div>
                            <ul className={style.authorDetails__info_links}>
                                {socialLinks}
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className={style.authorDetails__products}>
                        <div className={style.authorDetails__products_container}>
                            <p className={style.authorDetails__products_title}>
                                Created
                                <span className={style.authorDetails__products_counter}>{productCount}</span>
                            </p>
                        </div>
                        <ProductList products={authorProducts} isInAuthor={true} showPagination={false}/>
                    </div>
                </div>
            </div>
        </div>
    );
}