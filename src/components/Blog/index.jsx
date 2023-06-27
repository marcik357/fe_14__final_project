import { Link } from 'react-router-dom';
import styles from './blog.module.scss';
import postsData from '../../data.json';
import MainImg from '../../img/MainPicture.jpg';
import { BlogIcon } from '../Icons/icon-blog';

export default function Blog() {
  return (
    <div className={styles.blog}>

      <div className={styles.blog__mainImgContainer}>
        <div className={styles.blog__mainImg}>
          <img src={MainImg} alt="img" />
        </div>
        <div className={styles.blog__titleOverlay}>
          <h2>Crypter Blog</h2>
          <p>Crypter NFT marketplace blog</p>
        </div>
      </div>
      <div className={styles.blog__posts}>
        {
          postsData.map((data, index) => {
            return (
              <div key={data.id}>
                <div className={`${styles.blog__post} ${index % 2 !== 0 ? styles.blog__reverse : ''}`}>
                  <div className={styles.blog__postImgBlock}>
                    <img className={styles.blog__postImg} src={data.url} alt={`img ${data.id}`} />
                    <Link to="*">
                      <button type="button" className={styles.blog__btnImg}>{data.textButton}</button>
                    </Link>
                  </div>
                  <div className={styles.blog__contentBlock}>
                    <div className={styles.blog__content}>
                      <Link to="*" className={styles.blog__linkCapturePost}>
                        <h3 className={styles.blog__capturePost}>{data.capturePost}</h3>
                      </Link>
                      <div className={styles.blog__infoAuthor}>
                        <div className={styles.blog__postIcon}>
                          <BlogIcon />
                        </div>
                        <div>
                          <p className={styles.blog__authorPost}>{data.authorPost}</p>
                          <p className={styles.blog__dataPost}>{data.dataPost}</p>
                        </div>
                      </div>
                      <p className={styles.blog__textPost}>{data.textPost}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}