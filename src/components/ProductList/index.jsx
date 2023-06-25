import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import './pagination.scss';
import usePagination from '../../Hooks/usePagination';

function ProductList({ products }) {
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

  return (
    <div className={styles.products}>
      <div className={styles.products__title}>
        <h2>NFTs</h2>
      </div>
      <div className={styles.products__wrapper}>
        {products?.slice(firstContentIndex, lastContentIndex).map((product) => (
          <ProductCard {...product} key={product._id} />
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
  );
}

export default ProductList;