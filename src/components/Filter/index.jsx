import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './filter.module.scss';
import { LeftChevron } from '../Icons/left-chevron';
import { setQueryStringAction } from '../../redux/actions/filterActions';
import ProductList from '../ProductList';

function Filter({products, filters}) {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({
        authors: [],
        categories: [],
        theme: [],
        minPrice: '',
        maxPrice: '',
        sortBy: '',
    });
  const [minPrice, setMinPrice] = useState(selectedFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(selectedFilters.maxPrice);
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(JSON.parse(sessionStorage.getItem('isOpen')) || false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

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

      if (minPrice === '' && maxPrice !== '') {
        updatedFilters.minPrice = '0';
      } else {
        updatedFilters.minPrice = minPrice;
      }

      if (maxPrice === '' && minPrice !== '') {
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
      theme: [],
      minPrice: '',
      maxPrice: '',
      sortBy: '',
    });
    setMinPrice('');
    setMaxPrice('');
    setIsApplyButtonDisabled(false);
  };

  useEffect(() => {
    sessionStorage.setItem('isOpen', JSON.stringify(isOpen));
  }, [isOpen]);

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

    if (selectedFilters.theme.length > 0) {
      const themeString = selectedFilters.theme.join(',');
      newQueryString += `&theme=${themeString}`;
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

    dispatch(setQueryStringAction(newQueryString));
  }, [dispatch, selectedFilters]);

  return (
    <div className={styles.filter}>
      <div className={styles.filter__container}>
        <div className={styles.filter__nav}>
          <button className={`${styles.filter__openBtn + ' ' + styles.btnEffect} ${isOpen && styles.open}`} type="button" onClick={toggleModal}>Filters</button>
          <select name="sortBy" id="sortBy" className={styles.filter__sortBtn} value={selectedFilters.sortBy || 'Sort By'} onChange={(e) => sortByPrice(e)}>
            <option disabled hidden value="Sort By">Sort By</option>
            <option value="+currentPrice" className={styles.filter__sortValue}>Lowest price</option>
            <option value="-currentPrice" className={styles.filter__sortValue}>Highest price</option>
          </select>
        </div>
        <div className={styles.filter__content}>
          <div className={`${styles.filter__sidebarBckg} ${isOpen && styles.open}`} role="button" tabIndex="0" onClick={toggleModal} onKeyDown={(e) => e.key === 'Esc' && toggleModal()}>
            <div className={`${styles.filter__sidebarWrapper} ${isOpen && styles.open}`} onClick={(event) => event.stopPropagation()} role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Esc' && toggleModal()}>
              <div className={styles.filter__sidebarHeader}>
                <button className={styles.filter__sidebarCloseBtn} type="button" onClick={toggleModal}>
                  <LeftChevron />
                  Filters
                </button>
              </div>
              <div className={styles.filter__sidebarBody}>
                <button className={styles.filter__clearBtnHead + ' ' + styles.btnEffect} type="button" onClick={clearAllFilters}>Clear All</button>
                <h4 className={styles.filter__sidebarCategoryTitle}>Price</h4>
                <div className={styles.filter__sidebarItemValue}>
                  <input className={`${isApplyButtonDisabled && styles.warning}`} type="text" id="minPrice" name="minPrice" placeholder="Min" onChange={handleMinPriceChange} value={minPrice} maxLength={4} />
                  <input className={`${isApplyButtonDisabled && styles.warning}`} type="text" id="maxPrice" name="maxPrice" placeholder="Max" onChange={handleMaxPriceChange} value={maxPrice} maxLength={4} />
                  <button className={`${styles.filter__sidebarApplyBtn} ${!isApplyButtonDisabled && styles.btnEffect} ${isApplyButtonDisabled && styles.disabled}`} type="button" onClick={applyPriceFilter} disabled={isApplyButtonDisabled}>Apply</button>
                </div>
                <h4 className={styles.filter__sidebarCategoryTitle}>Author</h4>
                <div className={styles.filter__sidebarList}>
                  {filters?.authorFilters?.map((author) => (
                    <div key={author._id} className={styles.filter__sidebarItem}>
                      <label htmlFor={author._id}>
                        <input type="checkbox" id={author._id} name={author.name} data-filter-type="authors" onChange={valueChange} checked={selectedFilters.authors.includes(author.name) ? true : false} />
                        {author.name}
                      </label>
                    </div>
                  ))}
                </div>
                <h4 className={styles.filter__sidebarCategoryTitle}>Collection</h4>
                <div className={styles.filter__sidebarList}>
                  {filters?.categoriesFilters?.map((category) => (
                    <div key={category._id} className={styles.filter__sidebarItem}>
                      <label htmlFor={category._id}>
                        <input type="checkbox" id={category._id} name={category.name} data-filter-type="categories" onChange={valueChange} checked={selectedFilters.categories.includes(category.name) ? true : false} />
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
                <h4 className={styles.filter__sidebarCategoryTitle}>Tags</h4>
                <div className={styles.filter__sidebarList}>
                  {filters?.themeFilters?.map((theme) => (
                    <div key={theme._id} className={styles.filter__sidebarItem}>
                      <label htmlFor={theme._id}>
                        <input type="checkbox" id={theme._id} name={theme.name} data-filter-type="theme" onChange={valueChange} checked={selectedFilters.theme.includes(theme.name) ? true : false} />
                        {theme.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.filter__sidebarFooter}>
                <button className={styles.filter__clearBtn + ' ' + styles.btnEffect} type="button" onClick={clearAllFilters}>Clear All</button>
              </div>
            </div>
          </div>
          <section className={styles.filter__contentList}>
            {products.productsQuantity === 0
              ? <p className={styles.filter__contentNoItems}>No items with such parameters</p>
              : <ProductList products={products.products} />
            }
          </section>
        </div>
      </div>
    </div>
  );
}

export default Filter;