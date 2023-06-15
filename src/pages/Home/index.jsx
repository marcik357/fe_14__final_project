import styles from "./home.module.scss";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";

export function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("./data/productList.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
      });
  }, []);
  return (
    <>
      <div className={styles.home}>
        <div className={styles.home__title}>
          <h2>NFTs</h2>
        </div>
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
}
