import styles from './Discover.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../components/Banner';
import Filter from '../../components/Filter';
import Loader from '../../components/Loader';


export function Discover() {
  const loading = useSelector((state) => state.loading.loading);

  return (

    !loading ? (
      <>
        <Banner
          title='Crypter discover'
          subtitle='Discover endless world of NFTs'
          img='/images/banners/discover-banner.png' />
        <div className={styles.products}>
          <div className={styles.products__container}>
            <Filter />
          </div>
        </div>
      </>
    ) : (
      <Loader />
    )
  );
}
