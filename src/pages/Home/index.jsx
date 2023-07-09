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
export function Home() {
  const dispatch = useDispatch();

  const [slides, setSlides] = useState()
  const products = useSelector((state) => state.products.products);
  // const promo = useSelector((state) => state.products.promo);
  const loading = useSelector((state) => state.loading.loading);
  // console.log(products);
  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}slides`, setSlides, {}, 'slides'));
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
            <Tab aria-selected='false' className={styles.products__filter_tab}>
              All
            </Tab>
            <Tab aria-selected='false' className={styles.products__filter_tab}>
              Collections
            </Tab>
            <Tab aria-selected='false' className={styles.products__filter_tab}>
              Artist
            </Tab>
          </TabList>
          <TabPanel>
            <ProductList products={products} listName='NFTs' />
          </TabPanel>
          <TabPanel>
            <CollectionList products={products} />
          </TabPanel>
          <TabPanel>
            <AuthorList />
          </TabPanel>
        </Tabs>
        </div>
        </div>
    </>
  ) : (
    <Loader />
  );
}
