import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import './pagination.scss';
import usePagination from '../../Hooks/usePagination';
import { ArrowRight } from '../Icons';

function ProductList({ products }) {
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

  const renderPageNumbers = () => {
    const ellipsis = '...';

    // Відображення всіх номерів сторінок
    if (totalPages) {
      return pageNumbers.map((number) => (
        <button
          onClick={() => setPage(number)}
          key={number}
          className={`page ${page === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ));
    }

    // Відображення крапок зліва від поточної сторінки
    if (page <= 4) {
      const visiblePages = pageNumbers.slice(0, 3);
      return (
        <>
          {visiblePages.map((number) => (
            <button
              onClick={() => setPage(number)}
              key={number}
              className={`page ${page === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
          <span className='ellipsis'>{ellipsis}</span>
          <button
            onClick={() => setPage(totalPages)}
            className={`page ${page === totalPages ? 'active' : ''}`}
          >
            {totalPages}
          </button>
        </>
      );
    }

    // Відображення крапок праворуч від поточної сторінки
    if (page > 4 && page <= totalPages - 4) {
      return (
        <>
          <button
            onClick={() => setPage(1)}
            className={`page ${page === 1 ? 'active' : ''}`}
          >
            1
          </button>
          <span className='ellipsis'>{ellipsis}</span>
          {pageNumbers.slice(page - 3, page + 2).map((number) => (
            <button
              onClick={() => setPage(number)}
              key={number}
              className={`page ${page === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
          <span className='ellipsis'>{ellipsis}</span>
          <button
            onClick={() => setPage(totalPages)}
            className={`page ${page === totalPages ? 'active' : ''}`}
          >
            {totalPages}
          </button>
        </>
      );
    }

    // Відображення крапок зліва від останньої сторінки
    if (page > totalPages - 4) {
      return (
        <>
          <button
            onClick={() => setPage(1)}
            className={`page ${page === 1 ? 'active' : ''}`}
          >
            1
          </button>
          <span className='ellipsis'>{ellipsis}</span>
          {pageNumbers.slice(totalPages - 5, totalPages).map((number) => (
            <button
              onClick={() => setPage(number)}
              key={number}
              className={`page ${page === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </>
      );
    }
  };

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
        {page === 1 ? null : (
          <button onClick={prevPage} className='page'>
            <ArrowRight
              style={{
                transform: 'rotate(180deg)',
                backgroundColor: '#fff',
              }}
            />
          </button>
        )}
        {renderPageNumbers()}
        {totalPages === page ? null : (
          <button onClick={nextPage} className='page'>
            <ArrowRight style={{ backgroundColor: '#fff' }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductList;
