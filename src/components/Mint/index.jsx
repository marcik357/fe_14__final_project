import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { mintTypes } from '../../redux/types/mintTypes';
import { MintCard } from '../MintCard';
import { useEffect } from 'react';
import { addToMint } from '../../redux/actions/mintActions';
import { addToOrder } from "../../redux/actions/orderAction";
import styleBtn from '../../pages/Account/Account.module.scss';
import style from './MintPage.module.scss';
import { motion } from 'framer-motion';
import { MintResult } from '../MintResult';
import { useMediaQuery } from "react-responsive";
import { topCard, bottomCard, rightCard, leftCard, arrows } from '../../animation';
import { setErrorAction } from "../../redux/actions/errorActions";
import { createMintOrder, fetchData } from "../../utils";
import { reqDelete, reqPost, reqPut } from "../../utils/requestBody";
import { baseUrl } from "../../utils/vars";

export function Mint({ orders, user, mintArray }) {
  const [selectCardFirst, setSelectCardFirst] = useState(false);
  const [selectCardSecond, setSelectCardSecond] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [mintCard, setMintCard] = useState(null);

  const { cart } = useSelector(state => state.cart);
  const { mintCardFirst, mintCardSecond } = useSelector(state => state.mint);

  const dispatch = useDispatch();

  const isDesktop = useMediaQuery({ minWidth: 769 });

  const handleMintClick = async () => {
    try {
      setOverlayVisible((isOverlayVisible) => !isOverlayVisible);
      await createMint(orders, mintCardFirst);
      await createMint(orders, mintCardSecond);
      await sendMintOrder(mintCard);
      setShowCard(true);
    } catch (error) {
      dispatch(setErrorAction(error.message));
    }
  };

  async function createMint(orders, selectCard) {
    try {
      let order = orders.find((item) => item.products.some(product => product.product.itemNo === selectCard.itemNo) && item.products)
      order.products = order.products.filter(item => {
        if (item.product.itemNo !== selectCard.itemNo) return item;
        if (item.product.itemNo === selectCard.itemNo && item.cartQuantity > 1) {
          item.cartQuantity -= 1;
          return item
        };
      });
      order.email = "tester.crypter@gmail.com";
      order.products.length >= 1
        ? await changeOrder(order, order._id)
        : await deleteOrder(order._id)
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async function changeOrder(changedOrder, orderNumber) {
    try {
      await fetchData(`${baseUrl}orders/${orderNumber}`, reqPut(JSON.stringify(changedOrder)));
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async function deleteOrder(orderNumber) {
    try {
      await fetchData(`${baseUrl}orders/${orderNumber}`, reqDelete());
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async function sendMintOrder(mintCard) {
    try {
      if (cart?.products?.length > 0) {
        const cartArray = cart?.products?.map(({ cartQuantity, product }) => ({ product: product?._id, cartQuantity: cartQuantity }))

        await fetchData(`${baseUrl}cart`, reqDelete());

        await fetchData(`${baseUrl}cart`, reqPost(JSON.stringify({ products: [{ product: mintCard._id, cartQuantity: 1 }] })));

        await fetchData(`${baseUrl}orders`, reqPost(JSON.stringify(createMintOrder(user._id))));

        await fetchData(`${baseUrl}cart`, reqDelete());

        await fetchData(`${baseUrl}cart`, reqPost(JSON.stringify({ products: cartArray })));
      }
      else {
        await fetchData(`${baseUrl}cart`, reqPost(JSON.stringify({ products: [{ product: mintCard._id, cartQuantity: 1 }] })));

        await fetchData(`${baseUrl}orders`, reqPost(JSON.stringify(createMintOrder(user._id))));

        await fetchData(`${baseUrl}cart`, reqDelete());
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  useEffect(() => {
    mintArray && setMintCard(mintArray[Math.floor(Math.random() * mintArray?.length)])
  }, [mintArray])

  useEffect(() => {
    const result = []
    const cardsArray = orders.map(products => products.products.map(({ cartQuantity, product }) => product))
    cardsArray.map(card => card.map(product => result.push(product)))
    dispatch(addToOrder(result))
  }, [dispatch, orders])

  return (
    <motion.div
      transition={{ duration: 1.1, ease: 'easeInOut' }}
      className={`${style.mintPage} ${isOverlayVisible ? style.bg : ''}`}>
      <div className={`${style.mintPage__description}`}>
        <p>Try something new from <b>Crypter-mint</b> your NFT.</p>
        <p>You can take any of your NFT and merge it with your other by paying a flat fee of 0.2 ETH for that coin.<br /></p>
        <p>At the end of the mint, you will receive a brand new pumped NFT, which will help you stand out and earn more NFT.</p>
      </div>
      <div className={`${style.mintPage__wrapper}`}>
        <motion.div
          animate={isOverlayVisible ? 'hidden' : 'show'}
          variants={isDesktop ? leftCard : topCard}
          className={style.mintPage__card}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}>
          <MintCard
            mint={mintCardFirst}
            state={selectCardFirst}
            setState={setSelectCardFirst}
            dispatch={dispatch}
            mintTypes={mintTypes.IS_MINT_FIRST} />
        </motion.div>

        <motion.span
          transition={{ duration: 1.2 }}
          animate={isOverlayVisible ? 'hidden' : 'show'}
          variants={arrows}
          className={style.mintPage__arrow}>
          &#8680;
        </motion.span>

        <motion.div className={style.mintPage__card_unknown}>
          {!showCard
            ? <p className={style.mintPage__card_unknown_empty}>?</p>
            : <MintResult mintCard={mintCard} />}
        </motion.div>

        <motion.span
          transition={{ duration: 1.2 }}
          animate={isOverlayVisible ? 'hidden' : 'show'}
          variants={arrows}
          className={style.mintPage__arrow}>
          &#8678;
        </motion.span>

        <motion.div
          animate={isOverlayVisible ? 'hidden' : 'show'}
          variants={isDesktop ? rightCard : bottomCard}
          className={style.mintPage__card}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}>
          <MintCard
            flag={mintCardFirst?.itemNo ? false : true}
            mint={mintCardSecond}
            state={selectCardSecond}
            setState={setSelectCardSecond}
            dispatch={dispatch}
            mintTypes={mintTypes.IS_MINT_SECOND} />
        </motion.div>
      </div>

      {showCard
        && <button className={styleBtn.user__btn}
          onClick={() => {
            dispatch(addToMint('', 0, mintTypes.IS_MINT_FIRST));
            dispatch(addToMint('', 0, mintTypes.IS_MINT_SECOND));
            setOverlayVisible(!isOverlayVisible);
            window.location.reload()
          }}>
          Back to transition
        </button>}
      {(!showCard && selectCardFirst && selectCardSecond && !isOverlayVisible) &&
        (<button
          className={styleBtn.user__btn}
          onClick={handleMintClick}>
          Mint
        </button>)}
    </motion.div>
  )
}
