import { useState, useEffect } from 'react';
import SliderSwiper from '../../components/SliderReact';
// import Slider from '../../components/Slider';

export function Home() {
  // const [products, setProducts] = useState([]);
  const [promoProducts, setPromoProducts] = useState([]);

  useEffect(() => {
    fetch('./data/productList.json')
      .then((response) => response.json())
      .then((data) => {
        // setProducts(data.products);
        setPromoProducts(data.promo.filter((product) => product.promo));
      });
  }, []);

  return (
    <div>
      Home
      {/* <Slider products={promoProducts} type="promo" /> */}
      <SliderSwiper products={promoProducts} type="promo" />
    </div>
  );
}
