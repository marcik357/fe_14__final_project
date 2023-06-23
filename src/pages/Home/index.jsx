import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../redux/actions/getDataActions';
import SliderPromo from '../../components/SliderPromo';
import ProductList from '../../components/ProductList';
import Filter from '../../components/Filter';
import styles from './Home.module.scss';
import { addProductsAction, addPromoAction } from '../../redux/actions/productsActions';

export function Home() {
  const dispatch = useDispatch();

  // const products = useSelector((state) => state.products.products);
  const promo = useSelector((state) => state.products.promo);
  const loading = useSelector((state) => state.loading.loading);
  // const error = useSelector((state) => state.error.error);

  useEffect(() => {
    dispatch(getData('./data/promoList.json', addPromoAction));
    dispatch(getData('./data/productList.json', addProductsAction));
  }, [dispatch]);

  return (
    <div>
      {!loading
        ? (
          <>
            {promo && <SliderPromo products={promo} type="promo" />}
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