import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import style from '../HeaderSearch/headerSearch.module.scss';
import { linkAnimation } from '../../animation';

export function HeaderSearchResults(props) {
  const { data, type, handleClearSearch, toggleSearchView } = props;

  return (
      <>
        <h3 className={style.headerSearch__title}>{type}</h3>
        <ul className={style.headerSearch__list}>
          {data && data.map(({ _id, itemNo, imageUrls, name, currentPrice, id, imgUrl, customId, imageUrl }, index) => {
        return <motion.li
                 key={_id}
                 className={style.headerSearch__item}
                 {...linkAnimation(index)}
               >
            <Link
              to={
                type === 'NFTs'
                  ? `/product/${itemNo}`
                  : type === 'Collections'
                  ? `/collection/${id}`
                  : type === 'Authors'
                  ? `/author/${customId}`
                  : '/'
               }
              className={style.headerSearch__link}
              onClick={() => {
                handleClearSearch();
                toggleSearchView();
              }}
            >
              <div className={style.headerSearch__image}>
                {type === 'NFTs' && <img src={imageUrls} alt={name} />}
                {type === 'Collections' && <img src={imgUrl} alt={name} />}
                {type === 'Authors' && <img src={imageUrl} alt={name} className={style.borderRadius} />}
              </div>
              <div className={style.headerSearch__content}>
                <p className={style.headerSearch__subtitle}>{name}</p>
                {type === 'NFTs' && <p className={style.headerSearch__desc}>Price: {currentPrice} ETN</p>}
                {type === 'Collections' && <p className={style.headerSearch__desc}>{name}</p>}
                {type === 'Authors' && <p className={style.headerSearch__desc}>{customId}</p>}
              </div>
            </Link>
          </motion.li>
      })}
        </ul>
      </>
  )
}