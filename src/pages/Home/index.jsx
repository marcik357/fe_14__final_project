import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction, addPromoAction } from '../../redux/actions/productsActions';
import SliderPromo from '../../components/SliderPromo';
import ProductList from '../../components/ProductList';
import Filter from '../../components/Filter';
import styles from './Home.module.scss';
import Loader from '../../components/Loader';

export function Home() {
  const dispatch = useDispatch();

  // const products = useSelector((state) => state.products.products);
  // const promo = useSelector((state) => state.products.promo);
  const loading = useSelector((state) => state.loading.loading);
  // const error = useSelector((state) => state.error.error);

  useEffect(() => {
    dispatch(getDataAction('./data/promoList.json', addPromoAction));
    dispatch(getDataAction('./data/productList.json', addProductsAction));
  }, [dispatch]);

  return (
    <div>
      {!loading
        ? (
          <>
            <SliderPromo />
            <div className={styles.products}>
              <Filter />
              <ProductList />
            </div>
          </>
        )
        : <Loader />}
    </div>
  );
}