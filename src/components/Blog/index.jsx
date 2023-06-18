import styles from "./blog.module.scss"
import Data from '../../data.json';
// import {Link} from "react-router-dom";
import MainImg from '../../img/img-blog-main.png'

export default function Blog() {

  return (
    <div>
      <img src={MainImg}></img>

      {
        Data.map( data => {
          return(
            <div>
              <div>
                <img src={data.url} alt=""/>
                <h3>{data.capturePost}</h3>
                <img src={data.iconPost} alt=""/>
                <p>{data.authorPost}</p>
                <p>{data.dataPost}</p>
                <p>{data.textPost}</p>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}