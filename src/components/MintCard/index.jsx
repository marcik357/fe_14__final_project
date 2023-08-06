import { Close } from '../Icons';
import style from './index.module.scss';
import { addToMint } from '../../redux/actions/mintActions';
import { setModalType } from '../../redux/actions/modalActions';
import { useSelector } from 'react-redux';

export function MintCard({ state, setState, dispatch, mint, mintTypes, flag }) {
  const { mintCardFirst, mintCardSecond } = useSelector(state => state.mint);

  return (
    <div className={flag ? style.disabled : style.block}>
      <div className={style.block__card}>
        {state && mint?.length !== 0 && mint
          ? <>
            <img className={style.card__img} src={mint?.imageUrls} alt={mint?.name} />
            {(mint === mintCardFirst && !mintCardSecond || mint === mintCardSecond) &&
              <button
                className={style.img__deleteCard}
                onClick={() => {
                  dispatch(addToMint('', 0, mintTypes));
                  setState(!state);
                }}>
                <Close width={15} color="#000" />
              </button>}
          </>
          : <button
            className={style.img__addCard}
            onClick={() => {
              setState(!state);
              dispatch(setModalType('mint'));
            }}>
          </button>}
      </div>
      <p>Price : {mint?.currentPrice || 0} ETH</p>
    </div>
  )
}