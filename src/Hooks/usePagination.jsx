import { useState, useEffect } from 'react';

const usePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;

  const changePage = (direction) => {
    setPage((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSAFE = (num) => {
    if (num > pageCount) {
      setPage(pageCount);
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 720, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (page < pageCount) {
      changePage(true);
      scrollToTop();
    }
  };

  const prevPage = () => {
    if (page > 1) {
      changePage(false);
      scrollToTop();
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [page]);

  const generatePageNumbers = () => {
    const maxVisiblePages = 5;
    const visiblePages = Math.min(maxVisiblePages, pageCount);

    let startPage = Math.max(page - Math.floor(visiblePages), 1);
    const endPage = startPage + visiblePages - 1;

    if (endPage > pageCount) {
      startPage = Math.max(pageCount - visiblePages + 1, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return {
    totalPages: pageCount,
    nextPage,
    prevPage,
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
    pageNumbers,
  };
};

export default usePagination;
