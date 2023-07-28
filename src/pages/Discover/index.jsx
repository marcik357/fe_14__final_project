import styles from './Discover.module.scss'
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../components/Banner';
import Filter from '../../components/Filter';
import Loader from '../../components/Loader';
import { fetchData } from '../../utils';
import { setErrorAction } from '../../redux/actions/errorActions';
import { baseUrl } from '../../utils/vars';
import { useNavigate } from 'react-router-dom';
import { setLoadingAction } from '../../redux/actions/loadingActions';


export function Discover() {
  const loading = useSelector((state) => state.loading.loading);
  const queryString = useSelector((state) => state.filter.queryString);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderProducts = useCallback(async () => {
    try {
      dispatch(setLoadingAction(true));
      // Запит до API
      const data = await fetchData(`${baseUrl}products/filter`)
      await setProducts(data);
      dispatch(setLoadingAction(false))
    } catch (error) {
      dispatch(setLoadingAction(false))
      dispatch(setErrorAction(error.message));
    }
  }, [dispatch]);

  useEffect(() => {
    renderProducts();
  }, [renderProducts]);

  const applyFilters = useCallback(async () => {
    try {
      // Оновлення URL з актуальними параметрами фільтрації
      navigate(`/discover?${queryString}`);
      // Запит до API з використанням queryString для фільтрації товарів
      const data = await fetchData(`${baseUrl}products/filter?${queryString}`)
      await setProducts(data);
    } catch (error) {
      dispatch(setErrorAction(error.message));
    }
  }, [dispatch, queryString, navigate]);

  useEffect(() => {
    applyFilters(); // Викликати applyFilters при кожній зміні queryString
  }, [applyFilters]);

  if (loading) return <Loader />

  return (
    <div id='main'>
      <Banner
        title='Crypter discover'
        subtitle='Discover endless world of NFTs'
        img='/images/banners/discover-banner.webp' />
      <div className={styles.products}>
        <div className={styles.products__container}>
          <Filter products={products} />
        </div>
      </div>
    </div>
  );
}
