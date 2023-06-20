import { connect } from 'react-redux';
import { useEffect } from 'react';
import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import './pagination.scss';
import { getDataAsync } from '../../redux/actions/getDataAction';
import usePagination from '../../Hooks/usePagination';
import Loader from '../Loader';
function ProductList(props) {
  const { products, getDataAsync } = props;

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
    getDataAsync();
  }, [getDataAsync]);

  return products ? (
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
    <p>Loading...</p>
  );
}
const mapDispatchToProps = {
  getDataAsync,
};
const mapStateToProps = (state) => ({
  products: state.data.products,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
