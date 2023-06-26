import styles from "./blog.module.scss"
import Data from '../../data.json';
// import {Link} from "react-router-dom";
import MainImg from '../../img/img-blog-main.png'

export default function Blog() {

  return (
    <div className={styles.blog_home}>

      <div className={styles.blog_main}>
        <img src={MainImg}></img>
      </div>
      
      <div className={styles.blog_posts}>
        {
          Data.map( data => {
            return (
              <div>
                <div className={styles.blog_post} key={data.id}>
                  <div className={styles.blog_postImg}>
                    <img src={data.url} alt=""/>
                  </div>
                  <div className={styles.blog_content}>
                    <h3>{data.capturePost}</h3>
                    <div className={styles.blog_infoAuthor}>
                      <div className={styles.blog_postIcon}>
                        <img src={data.iconPost} alt=""/>
                      </div>
                      <div>
                        <p>{data.authorPost}</p>
                        <p>{data.dataPost}</p>
                      </div>
                    </div>
                    <p>{data.textPost}</p>
                    <button>{data.textButton}</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      

    </div>
  )
}