import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { mintTypes } from '../../redux/types/mintTypes';
import { MintCard } from '../MintCard';
import { MintBtn } from '../MintBtn';
import { useEffect } from 'react';
import { addToMint } from '../../redux/actions/mintActions';
import { addToOrder } from "../../redux/actions/orderAction";
import styleBtn from '../../pages/Account/Account.module.scss';
import style from './MintPage.module.scss';
import { motion } from 'framer-motion';
import { MintResult } from '../MintResult';
import { useMediaQuery } from "react-responsive";
import { topCard, bottomCard, rightCard, leftCard, arrows } from '../../animation';
import { useNavigate } from 'react-router-dom';

export function Mint({ setMint, mint, orders, user, card }) {
  const navigate = useNavigate();
  const [selectCardFirst, setSelectCardFirst] = useState(false);
  const [selectCardSecond, setSelectCardSecond] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const { mintCardFirst, mintCardSecond } = useSelector(state => state.mint);
  const dispatch = useDispatch();
  const handleMintNowClick = () => {
    setOverlayVisible((isOverlayVisible) => !isOverlayVisible);
    setTimeout(() => {
      setShowCard(true);
    }, 3000);
  };


  useEffect(() => {
    const result = []
    const cardsArray = orders.map(products => products.products.map(({ cartQuantity, product }) => {
      return product
    }))
    cardsArray.map(card => card.map(product => result.push(product)))
    dispatch(addToOrder(result))
  }, [dispatch, orders])

  const isDesktop = useMediaQuery({ minWidth: 769 })

  return (
    <>
      <motion.div
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className={`${style.mintPage} ${isOverlayVisible && style.bg}`}
      >
        <div className={`${style.mintPage__description} ${isOverlayVisible && !isDesktop && style.overlay}`}>
          <p>Try something new from <b>Crypter-mint</b> your NFT.</p>
          <p>You can take any of your NFT and merge it with your other by paying a flat fee of 0.2 ETH for that coin.<br /></p>
          <p>At the end of the mint, you will receive a brand new pumped NFT, which will help you stand out and earn more NFT.</p>
        </div>
        <div className={`${style.mintPage__wrapper} ${isOverlayVisible && !isDesktop && style.overlay}`}>
          <motion.div
            animate={isOverlayVisible ? 'hidden' : 'show'}
            variants={isDesktop ? leftCard : topCard}
            className={style.mintPage__card}
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
          >
            <MintCard
              mint={mintCardFirst}
              state={selectCardFirst}
              setState={setSelectCardFirst}
              dispatch={dispatch}
              mintTypes={mintTypes.IS_MINT_FIRST}
            />
          </motion.div>

          <motion.span
            transition={{ duration: 1.2 }}
            animate={isOverlayVisible ? 'hidden' : 'show'}
            variants={arrows}
            className={style.mintPage__arrow}
          >
            &#8680;
          </motion.span>

          <motion.div className={style.mintPage__card_unknown}>
            {!showCard
              ? <p className={style.mintPage__card_unknown_empty}>?</p>
              : <MintResult card={card} />}
          </motion.div>

          <motion.span
            transition={{ duration: 1.2 }}
            animate={isOverlayVisible ? 'hidden' : 'show'}
            variants={arrows}
            className={style.mintPage__arrow}
          >
            &#8678;
          </motion.span>

          <motion.div
            animate={isOverlayVisible ? 'hidden' : 'show'}
            variants={isDesktop ? rightCard : bottomCard}
            className={style.mintPage__card}
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
          >
            <MintCard
              flag={mintCardFirst?.itemNo ? false : true}
              mint={mintCardSecond}
              state={selectCardSecond}
              setState={setSelectCardSecond}
              dispatch={dispatch}
              mintTypes={mintTypes.IS_MINT_SECOND}
            />

          </motion.div>

        </div>
        {!showCard
          ? <motion.div
            onClick={handleMintNowClick}
            className={`${mintCardFirst.itemNo && mintCardSecond.itemNo
              ? isOverlayVisible
                ? style.mintPage__hiddenButton
                : styleBtn.user__btn
              : style.hidden_btn}`}>
            <MintBtn
              user={user}
              card={card}
              isOverlayVisible={isOverlayVisible}
              orders={orders} />
          </motion.div>
          : <button className={styleBtn.user__btn}
            onClick={() => {
              dispatch(addToMint([], 0, mintTypes.IS_MINT_FIRST));
              dispatch(addToMint([], 0, mintTypes.IS_MINT_SECOND));
              setOverlayVisible(!isOverlayVisible);
              window.location.reload()
              // setMint(!mint)
            }}>
            Back to transition
          </button>}
      </motion.div>
    </>
  )
}
