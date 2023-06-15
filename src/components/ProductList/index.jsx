import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import styles from './productList.module.scss';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('./data/productList.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.home__title}>
        <h2>NFTs</h2>
      </div>
      {products.map((product) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ProductCard {...product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductList;
