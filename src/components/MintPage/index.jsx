import style from './mintPage.module.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const rightCard = {
  show: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: '-100%' },
};
const leftCard = {
  show: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: '100%' },
};
const arrows = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
};

function MintPage() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleMintNowClick = () => {
    setOverlayVisible((isOverlayVisible) => !isOverlayVisible);
    setTimeout(() => {
      setShowCard(true);
    }, 2500);
  };

  return (
    <>
      <motion.div
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className={`${style.mintPage} ${isOverlayVisible ? style.bg : ''}`}
      >
        <h3>Mint your NFTs</h3>

        <div className={style.mintPage__wrapper}>
          <motion.div
            animate={isOverlayVisible ? 'hidden' : 'show'}
            variants={leftCard}
            className={style.mintPage__card}
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
          >
            <div className={style.mintPage__card_image}>
              <img src='./images/Cards/card27.png' alt='' />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
                quidem repudiandae eligendi perferendis error esse quae
                distinctio maxime earum commodi?
              </p>
              <h4>2.3 ETH</h4>
            </div>
          </motion.div>

          <motion.span
            transition={{ duration: 1.2 }}
            animate={isOverlayVisible ? 'hidden' : 'show'}
            variants={arrows}
          >
            &#8680;
          </motion.span>

          <motion.div className={style.mintPage__card_unknown}>
            {!showCard ? (
              <p>?</p>
            ) : (
              <div className={style.mintPage__card_unknown}>
                <LazyLoadImage
                  effect='blur'
                  height={400}
                  width={400}
                  placeholderSrc={'./images/products/placeholder.jpg'}
                  src='./images/Cards/card30.png'
                  alt=''
                />
                <h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  exercitationem rem nesciunt aperiam asperiores repellat modi
                  beatae natus voluptate suscipit placeat excepturi quo aliquam
                  totam dignissimos, fuga quidem expedita. Veritatis.
                </h6>
                <h4>7.2 ETH</h4>
              </div>
            )}
          </motion.div>

          <motion.span
            transition={{ duration: 1.2 }}
            animate={isOverlayVisible ? 'hidden' : 'show'}
            variants={arrows}
          >
            &#8678;
          </motion.span>

          <motion.div
            animate={isOverlayVisible ? 'hidden' : 'show'}
            variants={rightCard}
            className={style.mintPage__card}
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
          >
            <div className={style.mintPage__card_image}>
              <img src='./images/Cards/card12.png' alt='' />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
                quidem repudiandae eligendi perferendis error esse quae
                distinctio maxime earum commodi?
              </p>
              <h4>4.1 ETH</h4>
            </div>
          </motion.div>
        </div>

        {!showCard ? (
          <motion.button
            onClick={handleMintNowClick}
            className={`${
              isOverlayVisible
                ? style.mintPage__hiddenButton
                : style.mintPage__button
            }`}
          >
            <span
              className={isOverlayVisible && style.mintPage__hiddenButton_text}
            >
              Mint now
            </span>
          </motion.button>
        ) : (
          <Link to={'/account'} className={style.mintPage__button}>
            Finish
          </Link>
        )}
      </motion.div>
    </>
  );
}

export default MintPage;
