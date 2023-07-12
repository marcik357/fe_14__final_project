import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addPromoAction } from '../../redux/actions/productsActions';
import SliderPromo from '../../components/SliderPromo';
import ProductList from '../../components/ProductList';
import Filter from '../../components/Filter';
import Loader from '../../components/Loader';
import styles from './Home.module.scss';
import { baseUrl } from '../../utils/vars';
import CollectionList from '../../components/CollectionList';
import AuthorList from '../../components/AuthorList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.scss';
import { Discover } from '../Discover';
export function Home() {
  const dispatch = useDispatch();

  const [slides, setSlides] = useState();
  const [partners, setPartners] = useState();
  const products = useSelector((state) => state.products.products);
  // const promo = useSelector((state) => state.products.promo);
  const loading = useSelector((state) => state.loading.loading);
  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}slides`, setSlides, {}, 'slides'));
    dispatch(getDataAction(`${baseUrl}partners`, setPartners, {}, 'partners'));
    // dispatch(getDataAction(`${baseUrl}products`, addProductsAction));
  }, [dispatch]);

  return !loading ? (
    <>
      {/* {promo?.length > 0 && <SliderPromo products={promo} />} */}
      {slides?.length > 0 && <SliderPromo products={slides} />}
      <div className={styles.products}>
        <div className={styles.products__container}>
          {/* <Filter /> */}
          <Tabs className={styles.products__filter}>
            <TabList className={styles.products__filter_tabs}>
              <Tab className={styles.products__filter_tab}>All</Tab>
              <Tab className={styles.products__filter_tab}>Collections</Tab>
              <Tab className={styles.products__filter_tab}>Artist</Tab>
              <Tab className={styles.products__filter_tab}>Discover</Tab>
            </TabList>
            <TabPanel>
              <ProductList products={products} listName='NFTs' />
            </TabPanel>
            <TabPanel>
              <CollectionList products={products} />
            </TabPanel>
            <TabPanel>
              <AuthorList partners={partners} products={products} />
            </TabPanel>
            <TabPanel>
              <Discover />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
}
