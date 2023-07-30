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
  const [products, setProducts] = useState(null);
  const [filters, setFilters] = useState({
    authorFilters: [],
    categoriesFilters: [],
    themeFilters: []
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderProducts = useCallback(async () => {
    try {
      // Запит до API
      const data = await fetchData(`${baseUrl}products/filter`)
      setProducts(data);
    } catch (error) {
      dispatch(setErrorAction(error.message));
    }
  }, [dispatch]);

  const getFiltersByType = useCallback(async (type) => {
    try {
      const data = await fetchData(`${baseUrl}filters/${type}`);
      setFilters(prevFilters => ({
        ...prevFilters,
        [`${type}Filters`]: data
      }));
    } catch (error) {
      dispatch(setErrorAction(error.message));
    }
  }, [dispatch]);

  const fetchDataAndSetLoading = useCallback(async () => {
    dispatch(setLoadingAction(true));
    await Promise.all([renderProducts(), getFiltersByType('author'), getFiltersByType('categories'), getFiltersByType('theme')])
      .then(() => dispatch(setLoadingAction(false)))
  }, [dispatch, renderProducts, getFiltersByType]);

  useEffect(() => {
    fetchDataAndSetLoading();
  }, [fetchDataAndSetLoading]);

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
      {(products && filters.authorFilters.length > 0) &&
        <>
          <Banner
            title='Crypter discover'
            subtitle='Discover endless world of NFTs'
            img='/images/banners/discover-banner.webp' />
          <div className={styles.products}>
            <div className={styles.products__container}>
              <Filter products={products} filters={filters} />
            </div>
          </div>
        </>}
    </div>
  );
}
