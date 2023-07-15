import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductList from '../ProductList';
import style from './collectionCard.module.scss';
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
  };

  return (
    <>
      <>
        {isCollectionVisible && (
          <Link
            style={{ display: display }}
            onClick={renderList}
            className={style.collectionCard}
          >
            <div className={style.collectionCard__wrapper}>
              {products[1]?.imageUrls.map((imageUrl, index) => (
                <img
                  key={index}
                  className={style.collectionCard__image}
                  src={imageUrl}
                  alt='collectionCardName'
                />
              ))}

              <div className={style.collectionCard__image_sm}>
                {products[2]?.imageUrls.slice(0, 2).map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt='collectionCardName' />
                ))}

                {products[3]?.imageUrls.slice(0, 2).map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt='collectionCardName' />
                ))}

                <div
                  style={{
                    backgroundColor:
                      bgColors[Math.floor(Math.random() * bgColors.length)],
                  }}
                  className={style.collectionCard__viewAll}
                >
                  +{products.length - 3}
                </div>
              </div>
            </div>
            <p className={style.collectionCard__name}>{category}</p>
          </Link>
        )}
      </>
      <>
        {isProductListVisible && (
          <>
            {/* <ArrowRight /> */}
            <ProductList products={products} listName={category} />
          </>
        )}
      </>
    </>
  );
}

export default CollectionCard;
