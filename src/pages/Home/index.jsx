import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAction } from '../../redux/actions/getDataActions';
import SliderPromo from '../../components/SliderPromo';
import ProductList from '../../components/ProductList';
import Loader from '../../components/Loader';
import styles from './Home.module.scss';
import { baseUrl } from '../../utils/vars';
import CollectionList from '../../components/CollectionList';
import AuthorList from '../../components/AuthorList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.scss';
import { Link } from 'react-router-dom';
import { fetchData } from '../../utils';
import { setLoadingAction } from '../../redux/actions/loadingActions';

export function Home() {
  const dispatch = useDispatch();

  const [slides, setSlides] = useState();
  const [partners, setPartners] = useState();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.loading.loading);

  const homeLoad = useCallback(async () => {
    try {
      dispatch(setLoadingAction(true));
      const slides = await fetchData(`${baseUrl}slides`)
      const partners = await fetchData(`${baseUrl}partners`)
      setSlides(slides);
      setPartners(partners);
      dispatch(setLoadingAction(false))
    } catch (error) {
      dispatch(setLoadingAction(false))
      dispatch(setErrorAction(error.message));
    }
  }, [dispatch])

  useEffect(() => {
    homeLoad()
  }, [homeLoad]);

  return !loading ? (
    <div id='main'>
      {slides?.length > 0 ? <SliderPromo products={slides} /> : <SliderPromo products={[]} />}
      <div className={styles.products}>
        <div className={styles.products__container}>
          <Tabs className={styles.products__filter}>
            <TabList className={styles.products__filter_tabs}>
              <Tab className={styles.products__filter_tab}>All</Tab>
              <Tab className={styles.products__filter_tab}>Collections</Tab>
              <Tab className={styles.products__filter_tab}>Authors</Tab>
              <Link to={'/discover'} className={styles.products__filter_tab}>Discover</Link>
            </TabList>
            <TabPanel>
              <ProductList products={products} />
            </TabPanel>
            <TabPanel>
              <CollectionList products={products} />
            </TabPanel>
            <TabPanel>
              <AuthorList partners={partners} products={products} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
