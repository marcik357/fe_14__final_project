import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductList from '../ProductList';
import style from './collectionCard.module.scss';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { scrollTo } from '../../utils';

function CollectionCard({
  category,
  products,
  isCollectionVisible,
  setCollectionVisible,
  display,
}) {
  const bgColors = [
    '#BCE6EC',
    '#B9A9FB',
    '#DBFF73',
    '#FFA6D6',
    '#BCE6EC',
    '#B9A9FB',
  ];

  const [isProductListVisible, setProductListVisible] = useState(false);

  const renderList = () => {
    setCollectionVisible(false);
    setProductListVisible(true);
    scrollTo('#collections');
    scrollTo('#collections');
  };
  const renderCollection = () => {
    setCollectionVisible(true);
    setProductListVisible(false);
    scrollTo('#collections');
    scrollTo('#collections');
  };

  return (
    <>
      {isCollectionVisible && (
        <Link to='/'
          style={{ display: display }}
          onClick={renderList}
          className={style.collectionCard}
        >
          <div className={style.collectionCard__wrapper}>
            {products[0]?.imageUrls.map((imageUrl, index) => (
              <LazyLoadImage
                key={index}
                className={style.collectionCard__image}
                src={imageUrl}
                alt='collectionCardName'
                effect="blur"
                placeholderSrc={'./images/products/placeholder.jpg'}
                height={300}
                width={300}
              />
            ))}

            <div className={style.collectionCard__image_sm}>
              {products[1]?.imageUrls.slice(0, 2).map((imageUrl, index) => (
                <LazyLoadImage
                key={index}
                src={imageUrl}
                alt='collectionCardName'
                effect="blur"
                placeholderSrc={'./images/products/placeholder.jpg'}
                height={96}
                width={96} />
              ))}

              {products[2]?.imageUrls.slice(0, 2).map((imageUrl, index) => (
                <LazyLoadImage
                key={index}
                src={imageUrl}
                alt='collectionCardName'
                effect="blur"
                placeholderSrc={'./images/products/placeholder.jpg'}
                height={96}
                width={96} />
              ))}

              {products.length - 3 >0 && <div
                style={{
                  backgroundColor:
                    bgColors[Math.floor(Math.random() * bgColors.length)],
                }}
                className={style.collectionCard__viewAll}
              >
                +{products.length - 3}
              </div>}
            </div>
          </div>
          <p className={style.collectionCard__name}>{category}</p>
        </Link>
      )}
      {isProductListVisible
        &&
        <>
          <div className={style.collectionCard__btns}>
            <button
              className={style.collectionCard__btn}
              onClick={renderCollection}>
              Show all collections
            </button>
            <Link
              className={style.collectionCard__btn}
              to={`/collection/${category}`}>
              Show details
            </Link>
          </div>
          <ProductList products={products} listName={category} />
        </>
      }
    </>
  );
}

export default CollectionCard;
