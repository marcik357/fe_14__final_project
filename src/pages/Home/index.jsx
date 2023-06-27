import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction, addPromoAction } from '../../redux/actions/productsActions';
import SliderPromo from '../../components/SliderPromo';
import ProductList from '../../components/ProductList';
import Filter from '../../components/Filter';
import Loader from '../../components/Loader';
import styles from './Home.module.scss';

export function Home() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  // const promo = useSelector((state) => state.products.promo);
  const loading = useSelector((state) => state.loading.loading);
  // const error = useSelector((state) => state.error.error);

  useEffect(() => {
    dispatch(getDataAction('https://plankton-app-6vr5h.ondigitalocean.app/api/slides', addPromoAction));
    dispatch(getDataAction('https://plankton-app-6vr5h.ondigitalocean.app/api/products', addProductsAction));
  }, [dispatch]);

  return (
    <div>
      {!loading ? (
        <>
          <SliderPromo />
          <div className={styles.products}>
            <Filter />
            <ProductList products={products} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
