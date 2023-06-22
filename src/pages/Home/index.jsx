import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../redux/actions/getDataActions';
import SliderPromo from '../../components/SliderPromo';
import ProductList from '../../components/ProductList';
import Filter from '../../components/Filter';
import styles from './Home.module.scss';

export function Home() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.loading.loading);
  // const error = useSelector((state) => state.error.error);

  useEffect(() => {
    dispatch(getData('./data/productList.json'));
  }, [dispatch]);

  return (
    <div>
      {!loading
        ? (
          <>
            {products.promo && <SliderPromo products={products.promo} type="promo" />}
            <div className={styles.products}>
              <Filter />
              <ProductList />
            </div>
          </>
        )
        : <p>Loading...</p>}
    </div>
  );
}