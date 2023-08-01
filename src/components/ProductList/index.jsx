import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import usePagination from '../../hooks/usePagination';
import { ArrowRight } from '../Icons';
import { scrollTo } from '../../utils';

function ProductList({ products, listName, isInAuthor = false, showPagination = true, customButtonText, customButtonHandler, adminCard = false, deleteButtonHandler }) {
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
    count: products?.length,
  });

  const renderPageNumbers = () => {
    const ellipsis = '...';

    if (totalPages) {
      const visiblePages =
        totalPages <= 6
          ? pageNumbers
          : page <= 4
            ? pageNumbers.slice(0, 5)
            : page >= totalPages - 4
              ? pageNumbers.slice(totalPages - 4)
              : pageNumbers.slice(page - 3, page + 2);

      return (
        <>
          {page >= 4 && totalPages > 5 && (
            <>
              <button
                onClick={() => setPage(1)}
                className={`${styles.pagination__num} ${page === 1 && styles.pagination__num_active}`}>
                1
              </button>
              <span className='ellipsis'>{ellipsis}</span>
            </>
          )}

          {visiblePages.map((number) => (number > 2 || (page <= 3 || totalPages <= 5)) && (
            <button
              onClick={() => {
                setPage(number);
                scrollTo('#products');
              }}
              key={number}
              className={`${styles.pagination__num} ${page === number && styles.pagination__num_active}`}>
              {number}
            </button>
          ))}

          {page < totalPages - 2 && totalPages > 5 && (
            <>
              <span className='ellipsis'>{ellipsis}</span>
              <button
                onClick={() => setPage(totalPages)}
                className={`${styles.pagination__num} ${page === totalPages && styles.pagination__num_active}`}>
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
    <div
      id='products'
      className={`${styles.products} ${isInAuthor && styles.productListInAuthor} ${adminCard && styles.productListAdmin}`}>
      {!isInAuthor && !adminCard && (
        <div className={styles.products__title}>
          <h2>{listName}</h2>
        </div>
      )}
      <div className={`${styles.products__wrapper} ${adminCard && styles.productListAdmin__wrapper}`}>
        {products?.slice(firstContentIndex, lastContentIndex).map((product) => (
          <ProductCard {...product} key={product._id} isInAuthor={isInAuthor}
            buttonText={customButtonText}
            buttonHandler={customButtonHandler}
            adminCard={adminCard}
            deleteButtonHandler={deleteButtonHandler}
          />
        ))}
      </div>
      {(showPagination && totalPages > 1) && (
        <div className={styles.pagination}>
          {page === 1 ? null : (
            <button
              onClick={() => {
                prevPage();
                scrollTo('#products')
              }}
              className={styles.pagination__num}>
              <ArrowRight />
            </button>
          )}
          {renderPageNumbers()}
          {totalPages === page ? null : (
            <button
              onClick={() => {
                nextPage();
                scrollTo('#products')
              }}
              className={styles.pagination__num}>
              <ArrowRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
