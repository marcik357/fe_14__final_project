import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Banner from '../../components/Banner';
import styles from './articles.module.scss';
import { fetchData } from '../../utils';
import Loader from '../../components/Loader';
import socialData from '../../components/SocialLink/socialData';
import SocialLink from '../../components/SocialLink';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { baseUrl } from '../../utils/vars';

export function Articles(){
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading.loading);
    const error = useSelector(state => state.error.error);
    const navigate = useNavigate();
    const { articleId } = useParams();
    const [article, setArticle] = useState({});

    const articlesLoad = useCallback(async () => {
        const articles = await fetchData(`${baseUrl}pages/${articleId}`);
        setArticle(articles);
    }, [articleId])
    
    useEffect(() => {
        articlesLoad(dispatch, articlesLoad)
    }, [dispatch, articlesLoad]);
    
    useEffect(() => {
        (error || !article) && navigate("/not-found");
    }, [error, article, navigate]);

    if (loading) return <Loader />

    return (
        <div className={styles.articles}>
            <Banner title={article.title} img='/images/banners/article-banner.webp'/>
            <div className={styles.articles__container}>
                <div className={styles.articles__content}>
                    <h1 className={styles.articles__content_title}>{article.title}</h1>
                    <p className={styles.articles__content_text}>{article.htmlContent}</p>
                </div>
                <div className={styles.articles__imageContainer}>
                    <LazyLoadImage className={styles.articles__img} src={article.images} alt="article-img" effect="blur"/>
                </div>
                <div className={styles.articles__links}>
                    <p className={styles.articles__links_title}>Share this post</p>
                    <ul className={styles.articles__links_list}>
                        {socialData.map(({type, url, icon}) => (
                            <SocialLink
                            key={type}
                            classLi={styles.articles__links_item}
                            url={url}
                            classUrl={styles.articles__links_link}
                            icon={icon('#686a6c')}
                        />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}