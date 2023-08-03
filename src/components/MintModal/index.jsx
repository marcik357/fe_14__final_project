import { useSelector, useDispatch } from "react-redux";
import { setModalType } from "../../redux/actions/modalActions";
import { addToMint } from "../../redux/actions/mintActions";
import { mintTypes } from "../../redux/types/mintTypes";
import style from './index.module.scss';

export function MintModal() {
  const dispatch = useDispatch();
  const { order } = useSelector(state => state.order);
  const { mintCardFirst } = useSelector(state => state.mint);
  const noMintOrder = order.filter(items => items.categories !== "mint");
  const selectedCard = noMintOrder?.filter(items => items.itemNo !== mintCardFirst?.itemNo);

  return (
    <div className={style.nft_block}>
      {(mintCardFirst?.itemNo
        ? selectedCard
        : noMintOrder).map(card => (
          <button
            className={style.nft_block__select_nft}
            key={Math.random() * 1000}
            onClick={
              () => {
                dispatch(mintCardFirst?.itemNo
                  ? addToMint(selectedCard, card.itemNo, mintTypes.IS_MINT_SECOND)
                  : addToMint(order, card.itemNo, mintTypes.IS_MINT_FIRST))
                dispatch(setModalType(null));
              }}>
            <img src={card?.imageUrls} alt={card?.name} />
          </button>
        ))}
    </div>
  )
}