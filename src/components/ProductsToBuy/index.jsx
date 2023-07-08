import style from './index.module.scss';
import { useSelector } from 'react-redux';

export function ProductsToBuy ({ imageUrls, name, _id ,cartQuantity}) {
    return(
        <div class={style.product}>
            <img class={style.product__img} src={imageUrls} alt={name}/>
            <div className={style.product__delete}>
                &times;
            </div>
        </div>
    )
}