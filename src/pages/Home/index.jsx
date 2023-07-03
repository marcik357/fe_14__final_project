import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addPromoAction } from '../../redux/actions/productsActions';
import SliderPromo from '../../components/SliderPromo';
import ProductList from '../../components/ProductList';
import Filter from '../../components/Filter';
import Loader from '../../components/Loader';
import styles from './Home.module.scss';
import { baseUrl } from '../../utils/vars';

export function Home() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const promo = useSelector((state) => state.products.promo);
  const loading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}slides`, addPromoAction));
    // dispatch(getDataAction(`${baseUrl}products`, addProductsAction));
  }, [dispatch]);

  return (
    !loading ? (
      <>
        <SliderPromo products={promo} />
        <div className={styles.products}>
          <Filter />
          <ProductList products={products} />
        </div>
      </>
    ) : (
      <Loader />
    )
  );
}
