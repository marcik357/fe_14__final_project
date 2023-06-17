import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { register } from 'swiper/element/bundle';
// import styles from './slider.module.scss';
import Button from '../Button';

register();

function Slider({ products }) {
  const swiperElRef = useRef(null);

  // useEffect(() => {
  //   swiperElRef.current.addEventListener('progress', (e) => {
  //     const [swiper, progress] = e.detail;
  //     console.log(progress);
  //   });

  //   swiperElRef.current.addEventListener('slidechange', (e) => {
  //     console.log(e);
  //     console.log('slide changed');
  //   });
  // }, []);

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="1"
      navigation="true"
      pagination="true"
      loop="true"
      pagination-clickable="true"
      // className={styles.promoSlider}
    >
      {products.map((product) => (
        <swiper-slide
          key={product.id}
        >
          <img src={product.url} alt={product.name} />
          <div className="meta">
            <Link to="/">
              {product.name}
            </Link>
            <Link to="/">
              {product.creator}
            </Link>
          </div>
          <div className="buttons">
            <Link to={`/product/${product.id}`}>
              View NFT
            </Link>
            <Button onClick={(e) => { console.log(e); }}>
              BUY NOW
            </Button>
          </div>
        </swiper-slide>
      ))}
    </swiper-container>
  );
}

Slider.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url: PropTypes.string,
    currentBid: PropTypes.string,
    userIcon: PropTypes.string,
    verifiedIcon: PropTypes.string,
    creator: PropTypes.string,
    promo: PropTypes.bool,
  })).isRequired,
};

export default Slider;