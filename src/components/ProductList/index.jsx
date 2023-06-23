import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import './pagination.scss';
import usePagination from '../../Hooks/usePagination';
import Loader from '../Loader';
import { getDataAsync } from '../../redux/actions/getDataAction';
import { useSelector, useDispatch } from 'react-redux';
function ProductList() {
  const products = useSelector((state) => state.data.products);
  const dispatch = useDispatch();
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 12,
    count: products?.length,
  });

  useEffect(() => {
    dispatch(getDataAsync());
  }, [dispatch]);

  return products.length > 0 ? (
    <div className={styles.products}>
      <div className={styles.products__title}>
        <h2>NFTs</h2>
      </div>
      <div className={styles.products__wrapper}>
        {products?.slice(firstContentIndex, lastContentIndex).map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
      <div className='pagination'>
        <button onClick={prevPage} className='page'>
          &#171;
        </button>
        {[...Array(totalPages).keys()].map((el) => (
          <button
            onClick={() => setPage(el + 1)}
            key={el}
            className={`page ${page === el + 1 ? 'active' : ''}`}
          >
            {el + 1}
          </button>
        ))}
        <button onClick={nextPage} className='page'>
          &#187;
        </button>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default ProductList;
