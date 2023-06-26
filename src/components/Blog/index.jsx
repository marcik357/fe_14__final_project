import styles from './blog.module.scss';
import postsData from '../../data.json';
// import {Link} from "react-router-dom";
import MainImg from '../../img/img-blog-main.png';
import { BlogIcon } from '../Icons/icon-blog';

export default function Blog() {
  return (
    <div className={styles.blog}>

      <div className={styles.blog__mainImg}>
        <img src={MainImg} alt="img" />
      </div>
      <div className={styles.blog__posts}>
        {
          postsData.map((data, index) => {
            return (
              <div key={data.id}>
                <div className={`${styles.blog__post} ${index % 2 !== 0 ? styles.blog__reverse : ''}`}>
                  <div className={styles.blog__postImgBlock}>
                    <img className={styles.blog__postImg} src={data.url} alt={`img ${data.id}`} />
                    <button type="button" className={styles.blog__btnImg}>{data.textButton}</button>
                  </div>
                  <div className={styles.blog__contentBlock}>
                    <div className={styles.blog__content}>
                      <h3 className={styles.blog__capturePost}>{data.capturePost}</h3>
                      <div className={styles.blog__infoAuthor}>
                        <div className={styles.blog__postIcon}>
                          <BlogIcon />
                          {/* <img src={data.iconPost} alt={`icon ${data.id}`} /> */}
                        </div>
                        <div>
                          <p>{data.authorPost}</p>
                          <p>{data.dataPost}</p>
                        </div>
                      </div>
                      <p>{data.textPost}</p>
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