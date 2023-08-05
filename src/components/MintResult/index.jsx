import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import style from './index.module.scss';

export function MintResult({ mintCard }) {
  return (
    <div className={style.block} >
      <LazyLoadImage
        effect='blur'
        //  height={400}
        //  width={400}
        placeholderSrc={'./images/products/placeholder.jpg'}
        src={mintCard?.imageUrls}
        alt={mintCard?.name}
      />
      <p className={style.block__price}>
        {mintCard?.currentPrice || 0} ETH
      </p>
    </div>
  )
}