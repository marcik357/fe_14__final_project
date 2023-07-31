import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import style from './index.module.scss';

export function MintResult ({card}) {
    return(
        <div className={style.block} >
        <LazyLoadImage
          effect='blur'
         //  height={400}
         //  width={400}
          placeholderSrc={'./images/products/placeholder.jpg'}
          src={card?.imageUrls}
          alt={card?.name}
        />
        <p className={style.block__price} >{card?.currentPrice || 0} ETH</p>
      </div>
    )
}