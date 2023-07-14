import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './filter.module.scss';
import { LeftChevron } from '../Icons/left-chevron';
import { setQueryStringAction } from '../../redux/actions/filterActions';
import ProductList from '../ProductList';
import { fetchData, getDataFromSS } from '../../utils';
import { useCallback } from 'react';
import { setErrorAction } from '../../redux/actions/errorActions';
import { baseUrl } from '../../utils/vars';


function Filter() {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState(!Array.isArray(getDataFromSS('selectedFilters'))
    ? getDataFromSS('selectedFilters')
    : {
      authors: [],
      categories: [],
      minPrice: '',
      maxPrice: '',
      sortBy: '',
      isOpen: false,
    });

  const [minPrice, setMinPrice] = useState(selectedFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(selectedFilters.maxPrice);
  const [authorFilters, setAuthorFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [{ products, productsQuantity }, setProducts] = useState([]);
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(false);
  const queryString = useSelector((state) => state.filter.queryString);

  const toggleModal = () => {
    setSelectedFilters({ ...selectedFilters, isOpen: !selectedFilters.isOpen })
  };

  const getFiltersByType = useCallback(async (type) => {
    try {
      const data = await fetchData(`${baseUrl}filters/${type}`);
      // Розділ фільтрів по типам
      if (type === 'author') {
        setAuthorFilters(data);
      } else if (type === 'categories') {
        setCategoryFilters(data);
      }
    } catch (error) {
      dispatch(setErrorAction(error.message))
    }
  }, [dispatch]);

    // Функція для відображення товарів згідно обраних фільтрів
    const applyFilters = useCallback(async () => {
      try {
        // Запит до API з використанням queryString для фільтрації товарів
        const data = await fetchData(`${baseUrl}products/filter?${queryString}`)
        setProducts(data);
      } catch (error) {
        dispatch(setErrorAction(error.message))
      }
    }, [dispatch, queryString]);
  

      // Код фільтру по чекбоксам
  const valueChange = (event) => {
    const { name, checked } = event.target;
    const filterType = event.target.getAttribute('data-filter-type');

    setSelectedFilters((prevSelectedFilters) => {
      const updatedFilters = { ...prevSelectedFilters };

      if (checked) {
        updatedFilters[filterType] = [...updatedFilters[filterType], name];
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter((filter) => filter !== name);
      }

      return updatedFilters;
    });
  };

  // Кнопка підтвердження фільтра від / до
  const applyPriceFilter = () => {
    setSelectedFilters((prevSelectedFilters) => {
      const updatedFilters = { ...prevSelectedFilters };

      if (minPrice === '') {
        updatedFilters.minPrice = '0';
      } else {
        updatedFilters.minPrice = minPrice;
      }

      if (maxPrice === '') {
        updatedFilters.maxPrice = '100000';
      } else {
        updatedFilters.maxPrice = maxPrice;
      }

      return updatedFilters;
    });
  };
  
    // Перевірка інпутів по ціні від / до
    const isValidPriceInput = (minPriceValue, maxPriceValue) => {
      if (!/^[0-9.]*$/.test(minPriceValue) || !/^[0-9.]*$/.test(maxPriceValue)) {
        return false;
      }
  
      if (minPriceValue === '' || maxPriceValue === '') {
        return true;
      }
  
      return parseFloat(minPriceValue) <= parseFloat(maxPriceValue);
    };
  
    const handleMinPriceChange = (e) => {
      setMinPrice(e.target.value);
      setIsApplyButtonDisabled(!isValidPriceInput(e.target.value, maxPrice));
    };
  
    const handleMaxPriceChange = (e) => {
      setMaxPrice(e.target.value);
      setIsApplyButtonDisabled(!isValidPriceInput(minPrice, e.target.value));
    };
  
    const sortByPrice = (e) => {
      setSelectedFilters({ ...selectedFilters, sortBy: e.target.value })
    }

    // Очистити всі фільтри
    const clearAllFilters = () => {
      setSelectedFilters({
        ...selectedFilters,
        authors: [],
        categories: [],
        minPrice: '',
        maxPrice: '',
        sortBy: '',
      });
      setMinPrice('');
      setMaxPrice('');
      setIsApplyButtonDisabled(false);
    };

  useEffect(() => {
    // Виклик функції для отримання фільтрів по типам
    getFiltersByType('author');
    getFiltersByType('categories');
  }, [getFiltersByType]);

  useEffect(() => {
    sessionStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  useEffect(() => {
    applyFilters(); // Викликати applyFilters при кожній зміні queryString
  }, [applyFilters]);

  useEffect(() => {
    let newQueryString = '';

    if (selectedFilters.authors.length > 0) {
      const authorsString = selectedFilters.authors.join(',');
      newQueryString += `&author=${authorsString}`;
    }

    if (selectedFilters.categories.length > 0) {
      const categoriesString = selectedFilters.categories.join(',');
      newQueryString += `&categories=${categoriesString}`;
    }

    if (selectedFilters.sortBy) {
      newQueryString += `&sort=${selectedFilters.sortBy}`;
    }

    if (selectedFilters.minPrice !== '') {
      newQueryString += `&minPrice=${selectedFilters.minPrice}`;
    }

    if (selectedFilters.maxPrice !== '') {
      newQueryString += `&maxPrice=${selectedFilters.maxPrice}`;
    }

    sessionStorage.setItem('queryString', JSON.stringify(newQueryString));
    dispatch(setQueryStringAction(newQueryString));
  }, [dispatch, selectedFilters]);

  return (
    <div className={styles.filter}>
      <div className={styles.filter__container}>
        <div className={styles.filter__wrapper}>
          <div className={styles.filter__nav}>
            <button className={styles.filter__openBtn +' '+ styles.btnEffect} type="button" onClick={toggleModal}>Filters</button>
            <select name="sortBy" id="sortBy" className={styles.filter__sortBtn} value={selectedFilters.sortBy || 'Sort By'} onChange={(e) => sortByPrice(e)}>
              <option disabled hidden value="Sort By">Sort By</option>
              <option value="+currentPrice" className={styles.filter__sortValue}>Lowest price</option>
              <option value="-currentPrice" className={styles.filter__sortValue}>Highest price</option>
            </select>
          </div>
          <div className={styles.filter__content}>
            <div className={`${styles.filter__sidebarBckg} ${selectedFilters.isOpen && styles.open}`} role="button" tabIndex="0" onClick={toggleModal} onKeyDown={(e) => e.key === 'Esc' && toggleModal()}>
              <div className={`${styles.filter__sidebarWrapper} ${selectedFilters.isOpen && styles.open}`} onClick={(event) => event.stopPropagation()} role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Esc' && toggleModal()}>
                <div className={styles.filter__sidebarHeader}>
                  <button className={styles.filter__sidebarCloseBtn} type="button" onClick={toggleModal}>
                    <LeftChevron />
                    Filters
                  </button>
                </div>
                <div className={styles.filter__sidebarBody}>
                  <button className={styles.filter__clearBtnHead +' '+ styles.btnEffect} type="button" onClick={clearAllFilters}>Clear All</button>
                  <h4 className={styles.filter__sidebarCategoryTitle}>Price</h4>
                  <div className={styles.filter__sidebarItemValue}>
                    <div>
                      <input className={`${isApplyButtonDisabled && styles.warning}`} type="text" id="minPrice" name="minPrice" placeholder="Min" onChange={handleMinPriceChange} value={minPrice} maxLength={4} />
                      <input className={`${isApplyButtonDisabled && styles.warning}`} type="text" id="maxPrice" name="maxPrice" placeholder="Max" onChange={handleMaxPriceChange} value={maxPrice} maxLength={4} />
                    </div>
                    <button className={`${styles.filter__sidebarApplyBtn} ${!isApplyButtonDisabled && styles.btnEffect} ${isApplyButtonDisabled && styles.disabled}`} type="button" onClick={applyPriceFilter} disabled={isApplyButtonDisabled}>Apply</button>
                  </div>
                  <h4 className={styles.filter__sidebarCategoryTitle}>Author</h4>
                  <div className={styles.filter__sidebarList}>
                  {authorFilters.map((author) => (
                    <div key={author._id} className={styles.filter__sidebarItem}>
                      <label htmlFor={author.name}>
                        <input type="checkbox" id={author.name} name={author.name} data-filter-type="authors" onChange={valueChange} checked={selectedFilters.authors.includes(author.name) ? true : false} />
                        {author.name}
                      </label>
                    </div>
                  ))}
                  </div>
                  <h4 className={styles.filter__sidebarCategoryTitle}>Collection</h4>
                  <div className={styles.filter__sidebarList}>
                  {categoryFilters.map((category) => (
                    <div key={category._id} className={styles.filter__sidebarItem}>
                      <label htmlFor={category.name}>
                        <input type="checkbox" id={category.name} name={category.name} data-filter-type="categories" onChange={valueChange} checked={selectedFilters.categories.includes(category.name) ? true : false} />
                        {category.name}
                      </label>
                    </div>
                  ))}
                  </div>
                </div>
                <div className={styles.filter__sidebarFooter}>
                  <button className={styles.filter__clearBtn +' '+ styles.btnEffect} type="button" onClick={clearAllFilters}>Clear All</button>
                </div>
              </div>
            </div>
            <section className={styles.filter__contentList}>
              {productsQuantity === 0
                ? <p className={styles.filter__contentNoItems}>No items with such parameters</p>
                : <ProductList products={products} />
              }
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;