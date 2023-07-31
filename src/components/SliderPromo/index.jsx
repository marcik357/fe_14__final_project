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
import { Arrow, Basket } from '../Icons';
import { buyNowHandler, isInCart } from '../../utils';

function SliderPromo({ products }) {
  const dispatch = useDispatch()

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const token = useSelector(state => state.token.token);
  const cart = useSelector((state) => state.cart.cart);

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
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        className={styles.promoSlider}>
        <div slot="container-start" className={styles.promoSlider__container}>
          <div className={styles.promoSlider__prevBtn} ref={prevBtnRef}>
            <Arrow fill="#202025" />
          </div>
          <div className={styles.promoSlider__nextBtn} ref={nextBtnRef}>
            <Arrow fill="#E1E2E2" />
          </div>
        </div>
        {products?.map((product) => {
          const { imageUrl, product: { _id, itemNo, name, authorIcon, author } } = product;
          return (
            <SwiperSlide
              key={_id}
              className={`${styles.promoSlider__slide} ${styles.slide}`}>
              <img src={imageUrl} alt={name} className={styles.slide__img} loading="lazy" />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
              {/* <div className={styles.promoSlider__container}> */}
              <div className={styles.slide__inner}>
                <div className={`${styles.slide__meta} ${styles.meta}`}>
                  <Link
                    to={`/product/${itemNo}`}
                    className={styles.meta__prod}>
                    {name}
                  </Link>
                  <Link
                    to={`/author/${author}`}
                    className={styles.meta__auth}>
                    <div className={styles.meta__img}>
                      <img src={authorIcon || '/images/avatars/user-icon.png'} alt="avatar" />
                    </div>
                    {author}
                  </Link>
                </div>
                <div className={`${styles.slide__btns} ${styles.btns}`}>
                  <Link
                    to={`/product/${itemNo}`}
                    className={styles.btns__link}>
                    <span>
                      View NFT
                      <Arrow fill="#F7FBFA" />
                    </span>
                  </Link>
                  {!isInCart(cart, _id)
                    ?
                    <button
                      type='button'
                      onClick={() => buyNowHandler(dispatch, _id, token)}
                      className={styles.btns__buy}>
                      <span>BUY NOW</span>
                    </button>
                    : <Link
                      to={'/cart'}
                      className={styles.btns__buy}
                      type='button'>
                      <span>
                        view cart
                        <Basket color='#202025' strokeWidth='2.5' />
                      </span>
                    </Link>
                  }
                </div>
              </div>
              {/* </div> */}
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
          className={styles.promoThumbs__container}>
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