import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './slider.module.scss';
import { Arrow } from '../Icons';
import { buyNowHandler } from '../../utils';

function SliderPromo({ products }) {
  const dispatch = useDispatch()

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const token = useSelector(state => state.token.token);

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
        speed={500}
        autoplay={{
          delay: 5000,
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
        {products.map((product) => {
          const { imageUrl, product: { _id, itemNo, name, authorIcon, author } } = product;
          return (
            <SwiperSlide
              key={_id}
              className={styles.promoSlider__slide}
            >
              <img src={imageUrl} alt={name} className={styles.promoSlider__slide_img} />
              <div className={styles.promoSlider__container}>
                <div className={styles.promoSlider__inner}>
                  <div className={styles.promoSlider__meta}>
                    <Link
                      to={`/product/${itemNo}`}
                      className={styles.promoSlider__meta_prod}
                    >
                      {name}
                    </Link>
                    <Link
                      to={`/author/${author}`}
                      className={styles.promoSlider__meta_auth}
                    >
                      <div className={styles.promoSlider__meta_img}>
                        <img src={authorIcon || '/images/avatars/user-icon.png'} alt="avatar" />
                      </div>
                      {author}
                    </Link>
                  </div>
                  <div className={styles.promoSlider__btns}>
                    <Link
                      to={`/product/${itemNo}`}
                      className={styles.promoSlider__btns_link}
                    >
                      <span>
                        View NFT
                        <Arrow fill="#F7FBFA" />
                      </span>
                    </Link>
                    <button
                      type='button'
                      onClick={() => buyNowHandler(dispatch, _id, token)}
                      className={styles.promoSlider__btns_buy}
                    >
                      <span>BUY NOW</span>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
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
          {products.map((product) => {
            const { _id, imageUrl, product: { name } } = product
            return (
              <SwiperSlide key={_id} className={styles.promoThumbs__thumb}>
                <img src={imageUrl} alt={name} className={styles.promoThumbs__img} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  );
}

export default SliderPromo;