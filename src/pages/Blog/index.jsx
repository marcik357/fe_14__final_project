import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './blog.module.scss';
import Loader from '../../components/Loader';
import { BlogIcon } from '../../components/Icons/icon-blog';
import Banner from '../../components/Banner';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { fetchData, loadData } from '../../utils';
import { useCallback } from 'react';

export function Blog() {
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const loading = useSelector((state) => state.loading.loading);

  const blogLoad = useCallback(async () => {
    const blog = await fetchData('/data/blog.json')
    setData(blog);
  }, [])

  useEffect(() => {
    loadData(dispatch, blogLoad)
  }, [dispatch, blogLoad]);

  if (loading) return <Loader />

  return (
    <div id='main'>
      <div className={styles.blog}>
        <Banner
          title='Crypter Blog'
          subtitle='Crypter NFT marketplace blog'
          img='/images/banners/blog-banner.webp' />
        <div className={styles.blog__container}>
          <div className={styles.blog__posts}>
            {data.map(({ url, id, textButton, capturePost, authorPost, dataPost, textPost }, index) => {
              return (
                <div key={id} className={`${styles.blog__post} ${index % 2 !== 0 ? styles.blog__reverse : ''}`}>
                  <div className={styles.blog__postImgBlock}>
                    <LazyLoadImage className={styles.blog__postImg} src={url} alt={`img ${id}`} effect="blur" />
                    <Link to="*" className={styles.blog__btnImg}>
                      {textButton}
                    </Link>
                  </div>
                  <div className={styles.blog__contentBlock}>
                    <div className={styles.blog__content}>
                      <Link to="*" className={styles.blog__linkCapturePost}>
                        <h3 className={styles.blog__capturePost}>{capturePost}</h3>
                      </Link>
                      <div className={styles.blog__infoAuthor}>
                        <div className={styles.blog__postIcon}>
                          <BlogIcon />
                        </div>
                        <div>
                          <p className={styles.blog__authorPost}>{authorPost}</p>
                          <p className={styles.blog__dataPost}>{dataPost}</p>
                        </div>
                      </div>
                      <p className={styles.blog__textPost}>{textPost}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}