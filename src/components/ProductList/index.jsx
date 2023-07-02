import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import './pagination.scss';
import usePagination from '../../Hooks/usePagination';
import { ArrowRight } from '../Icons';
import { useDispatch } from 'react-redux';

function ProductList({ products, customButtonText, customButtonHandler }) {
  const dispatch = useDispatch()
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
    pageNumbers,
  } = usePagination({
    contentPerPage: 12,
    count: products.length,
  });
  const scroll = () => {
    const section = document.querySelector('#products');
    section.scrollIntoView({ behavior: 'smooth', top: 740 });
  };
  const renderPageNumbers = () => {
    const ellipsis = '...';

    if (totalPages) {
      const visiblePages =
        totalPages <= 7
          ? pageNumbers
          : page <= 4
          ? pageNumbers.slice(0, 5)
          : page >= totalPages - 4
          ? pageNumbers.slice(totalPages - 5)
          : pageNumbers.slice(page - 3, page + 2);

      return (
        <>
          {page > 4 && totalPages > 7 && (
            <>
              <button
                onClick={() => setPage(1)}
                className={`page ${page === 1 ? 'active' : ''}`}
              >
                1
              </button>
              <span className='ellipsis'>{ellipsis}</span>
            </>
          )}

          {visiblePages.map((number) => (
            <button
              onClick={() => {
                setPage(number);
                scroll();
              }}
              key={number}
              className={`page ${page === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}

          {page <= totalPages - 4 && totalPages > 7 && (
            <>
              <span className='ellipsis'>{ellipsis}</span>
              <button
                onClick={() => setPage(totalPages)}
                className={`page ${page === totalPages ? 'active' : ''}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div id='products' className={styles.products}>
      <div className={styles.products__title}>
        <h2>NFTs</h2>
      </div>
      <div className={styles.products__wrapper}>
        {products?.slice(firstContentIndex, lastContentIndex).map((product) => (
          <ProductCard {...product} key={product._id}
          buttonText={customButtonText}
          buttonHandler={() => customButtonHandler(dispatch, product._id)}
           />
        ))}
      </div>
      <div className='pagination'>
        {page === 1 ? null : (
          <button onClick={(prevPage, scroll)} className='page'>
            <ArrowRight />
          </button>
        )}
        {renderPageNumbers()}
        {totalPages === page ? null : (
          <button onClick={(nextPage, scroll)} className='page'>
            <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductList;
