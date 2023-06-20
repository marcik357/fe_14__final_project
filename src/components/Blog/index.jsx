import styles from "./blog.module.scss"
import Data from '../../data.json';
// import {Link} from "react-router-dom";
import MainImg from '../../img/img-blog-main.png'

export default function Blog() {

  return (
    <div className={styles.blog}>

      <div className={styles.blog__mainImg}>
        <img src={MainImg}></img>
      </div>
      
      <div className={styles.blog__posts}>
        {
          Data.map( data => {
            return (
              <div>
                <div className={styles.blog__post} key={data.id}>
                  <div className={styles.blog__postImgBlock}>
                    <img className={styles.blog__postImg} src={data.url} alt={`image ${data.id}`}/>
                    <button className={styles.blog__btnImg}>{data.textButton}</button>
                  </div>
                  <div className={styles.blog__content}>
                    <h3>{data.capturePost}</h3>
                    <div className={styles.blog__infoAuthor}>
                      <div className={styles.blog__postIcon}>
                        <img src={data.iconPost} alt=""/>
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
            )
          })
        }
      </div>
      

    </div>
  )
}