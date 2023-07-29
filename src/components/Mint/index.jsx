import styles from './index.module.scss';
import { useSelector,useDispatch } from "react-redux";
import { useState } from 'react';
import { mintTypes } from '../../redux/types/mintTypes';
import { MintCard } from '../MintCard';
import { MintBtn } from '../MintBtn';
import { useEffect } from 'react';
import { addToMint } from '../../redux/actions/mintActions';
import { addToOrder } from "../../redux/actions/orderAction";
import styleBtn from '../../pages/Account/Account.module.scss';
///animation
import style from './MintPage.module.scss';
import { motion } from 'framer-motion';
import { MintResult } from '../MintResult';

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

export function Mint ({setMint,mint,orders,user,mintResult}) {
    const [selectCardFirst, setSelectCardFirst] = useState(false);
    const [selectCardSecond,setSelectCardSecond] =useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [card, setCard]=useState(null);
    const { mintCardFirst,mintCardSecond } = useSelector(state=> state.mint);
    const dispatch = useDispatch();
  
    const handleMintNowClick = () => {
        setOverlayVisible((isOverlayVisible) => !isOverlayVisible);
        setTimeout(() => {
      setShowCard(true);
    }, 3000);
    };

  
    useEffect(()=>{
        const result=[]
        const cardsArray = orders.map(products=>products.products.map(({cartQuantity,product})=>{
            return product}))
        cardsArray.map(card=>card.map(product=>result.push(product)))
        dispatch(addToOrder(result))
    },[dispatch,orders])

    useEffect(()=>{
      setCard(mintResult[Math.floor(Math.random() * mintResult?.length)])
    },[mintResult])

    return (
        <>
        <motion.div
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className={`${style.mintPage} ${isOverlayVisible ? style.bg : ''}`}
        >
            <p>Try something new from <b>Crypter-mint</b> your NFT.</p>
            <p>
                You can take any of your NFT and merge it with your other by paying a flat fee of 0.2 ETH for that coin.<br/>
                At the end of the mint, you will receive a brand new pumped NFT, which will help you stand out and earn more NFT.
            </p>
     
       <div className={style.mintPage__wrapper}>
         <motion.div
          animate={isOverlayVisible ? 'hidden' : 'show'}
          variants={leftCard}
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
          >
            &#8680;
         </motion.span>
         
        <motion.div className={style.mintPage__card_unknown}>
          {!showCard ? (
            <p>?</p>
          ) : (
            <MintResult
            card={card}
            />
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
        <MintCard
            flag={mintCardFirst?.itemNo ? false:true}
            mint={mintCardSecond}
            state={selectCardSecond}
            setState={setSelectCardSecond}
            dispatch={dispatch}
            mintTypes={mintTypes.IS_MINT_SECOND}
        />
          
        </motion.div>

        </div>
        {!showCard ? (
          <motion.button
            onClick={handleMintNowClick}
            className={`${
              mintCardFirst.itemNo && mintCardSecond.itemNo ? isOverlayVisible
              ? style.mintPage__hiddenButton
              : styleBtn.user__btnsItem
              :styles.hidden_btn
              
            }`}
          >
             <MintBtn
            user={user}
            card={card}
            isOverlayVisible={isOverlayVisible}
            orders={orders}/>
          </motion.button>
        ) : (<button className={styleBtn.user__btnsItem}
            onClick={()=>{
                dispatch(addToMint([],0,mintTypes.IS_MINT_FIRST));
                dispatch(addToMint([],0,mintTypes.IS_MINT_SECOND));
                setOverlayVisible(!isOverlayVisible);
                setMint(!mint)
            }}
            >
            Back to transition
            </button>
        )}
        </motion.div>
        </>
    )
}
