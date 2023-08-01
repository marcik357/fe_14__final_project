import { useCallback, useEffect, useState } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchData, loadData } from '../../utils';

export function Home() {
  const dispatch = useDispatch();

  const [slides, setSlides] = useState([]);
  const [partners, setPartners] = useState([]);
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.loading.loading);

  const homeLoad = useCallback(async () => {
    const slides = await fetchData(`${baseUrl}slides`)
    const partners = await fetchData(`${baseUrl}partners`)
    setSlides(slides);
    setPartners(partners);
  }, [])

  useEffect(() => {
    loadData(dispatch, homeLoad)
  }, [dispatch, homeLoad]);

  if (loading) return <Loader />

  return (
    <div id='main'>
      {/* {slides?.length > 0 ? <SliderPromo products={slides} /> : <SliderPromo products={[]} />} */}
      <SliderPromo products={slides} />
      {products?.length > 0 &&
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
        </div>}
    </div>
  );
}
