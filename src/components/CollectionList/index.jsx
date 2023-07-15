import { useState, useEffect } from 'react';
import CollectionCard from '../CollectionCard';
import style from './collectionList.module.scss';

function CollectionList({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCollectionCardsVisible, setCollectionCardsVisible] = useState(true);

  useEffect(() => {
    const allCategories = products.flatMap((product) => product.categories);
    const uniqueCategories = [...new Set(allCategories)];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    const filtered = products.filter((product) => product.categories);
    setFilteredProducts(filtered);
  }, [products, categories]);

  return (
    <div className={style.collectionList}>
      <div className={style.collectionList__title}>
        <h2>Collections</h2>
      </div>
      <div className={style.collectionList__wrapper}>
        {categories.map((category) => (
          <CollectionCard
            key={category}
            products={filteredProducts.filter((product) =>
              product.categories.includes(category)
            )}
            display={isCollectionCardsVisible ? 'flex' : 'none'}
            isCollectionVisible={isCollectionCardsVisible}
            setCollectionVisible={setCollectionCardsVisible}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}

export default CollectionList;
