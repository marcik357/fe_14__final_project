import style from './index.module.scss';
import { useSelector,useDispatch } from "react-redux";
import { useState } from 'react';
import { mintTypes } from '../../redux/types/mintTypes';
import { MintCard } from '../MintCard';
import { MintBtn } from '../MintBtn';
import { useEffect } from 'react';
import { addToOrder } from "../../redux/actions/orderAction";

export function Mint ({setMint,mint,orders}) {
    const [selectCardFirst, setSelectCardFirst] = useState(false);
    const [selectCardSecond,setSelectCardSecond] =useState(false);
    const { mintCardFirst,mintCardSecond } = useSelector(state=> state.mint);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const result=[]
        const cardsArray = orders.map(products=>products.products.map(({cartQuantity,product})=>{
            return product}))
        cardsArray.map(card=>card.map(product=>result.push(product)))
        dispatch(addToOrder(result))
   
    },[])
    return (
        <>
        <div className={style.description} >
            <p>Try something new from <b>Crypter-mint</b> your NFT.</p>
            <p>
                You can take any of your NFT and merge it with your other by paying a flat fee of 0.2 ETH for that coin.<br/>
                At the end of the mint, you will receive a brand new pumped NFT, which will help you stand out and earn more NFT.
            </p>
       </div>
         <div className={style.wrapper}>
            <MintCard
            mint={mintCardFirst}
            state={selectCardFirst}
            setState={setSelectCardFirst}
            dispatch={dispatch}
            mintTypes={mintTypes.IS_MINT_FIRST}
            />
           <MintCard
            flag={mintCardFirst?.itemNo ? false:true}
            mint={mintCardSecond}
            state={selectCardSecond}
            setState={setSelectCardSecond}
            dispatch={dispatch}
            mintTypes={mintTypes.IS_MINT_SECOND}
            />
            <div className={style.block}>
             <MintBtn
            orders={orders}
            setMint={setMint}
            mint={mint}/>
            </div>
        </div>
        </>
    )
}