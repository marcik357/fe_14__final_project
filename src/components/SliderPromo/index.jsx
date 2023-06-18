import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './slider.module.scss';
import Button from '../Button';
import { Arrow } from '../icons/arrowSlider';

function SliderPromo({ products }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  return (
    <>
      <Swiper
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        loop={true}
        spaceBetween={0}
        navigation={{
          prevEl: prevBtnRef.current,
          nextEl: nextBtnRef.current,
        }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className={styles.promoSlider}
      >
        <div slot="container-start" className={styles.promoSlider__container}>
          <div className={styles.promoSlider__prevBtn} ref={prevBtnRef}>
            <Arrow fill="#202025" />
          </div>
          <div className={styles.promoSlider__nextBtn} ref={nextBtnRef}>
            <Arrow fill="#E1E2E2" />
          </div>
        </div>
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className={styles.promoSlider__slide}
          >
            <img src={product.url} alt={product.name} className={styles.promoSlider__slide_img} />
            <div className={styles.promoSlider__container}>
              <div className={styles.promoSlider__inner}>
                <div className={styles.promoSlider__meta}>
                  <Link
                    to={`/product/${product.id}`}
                    className={styles.promoSlider__meta_prod}
                  >
                    {product.name}
                  </Link>
                  <Link
                    to="/"
                    className={styles.promoSlider__meta_auth}
                  >
                    <div className={styles.promoSlider__meta_img}>
                      <img src={product.userIcon} alt="avatar" />
                    </div>
                    {product.creator}
                  </Link>
                </div>
                <div className={styles.promoSlider__btns}>
                  <Link
                    to={`/product/${product.id}`}
                    className={styles.promoSlider__btns_link}
                  >
                    View NFT
                    <Arrow fill="#F7FBFA" />
                  </Link>
                  <Button
                    onClick={() => {
                      // show modal accept purchase
                    }}
                    className={styles.promoSlider__btns_buy}
                  >
                    BUY NOW
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.promoThumbs}>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          direction="vertical"
          className={styles.promoThumbs__container}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className={styles.promoThumbs__thumb}>
              <img src={product.url} alt={product.name} className={styles.promoThumbs__img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

SliderPromo.propTypes = {
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

export default SliderPromo;