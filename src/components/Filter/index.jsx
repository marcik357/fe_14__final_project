/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable linebreak-style */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './filter.module.scss';
import { LeftChevron } from '../Icons/left-chevron';
import { setQueryStringAction } from '../../redux/actions/filterActions';


function Filter() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [authorFilters, setAuthorFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [products, setProducts] = useState([]);
  const queryString = useSelector((state) => state.filter.queryString);
  console.log(queryString);
  const [selectedFilters, setSelectedFilters] = useState({
    authors: [],
    categories: [],
    minPrice: '',
    maxPrice: '',
  });
  const [sortBy, setSortBy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({});

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const savedSortBy = localStorage.getItem('sortBy');
    setSortBy(savedSortBy || ''); // Використовую значення з localStorage чи пусте знач, якщо його немає

    const savedIsOpen = localStorage.getItem('isOpen');
    setIsOpen(savedIsOpen || false);

    const savedSelectedFilters = localStorage.getItem('selectedFilters');
    if (savedSelectedFilters) {
      setSelectedFilters(JSON.parse(savedSelectedFilters));
    }

    const savedMinPrice = localStorage.getItem('minPrice');
    setMinPrice(savedMinPrice || '');

    const savedMaxPrice = localStorage.getItem('maxPrice');
    setMaxPrice(savedMaxPrice || '');
  }, []);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
    localStorage.setItem('isOpen', isOpen);
    localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    localStorage.setItem('minPrice', minPrice);
    localStorage.setItem('maxPrice', maxPrice);
  }, [sortBy, isOpen, selectedFilters, minPrice, maxPrice]);

  // useEffect(() => {
  //   localStorage.setItem('queryString', JSON.stringify(queryString));
  // }, [queryString]);

  // useEffect(() => {
  //   // Функция для получения списка товаров с API
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('https://plankton-app-6vr5h.ondigitalocean.app/api/products/filter');
  //       if (response.ok) {
  //         const data = await response.json();
  //         if (data) {
  //           setProducts(data.products);
  //         }
  //       } else {
  //         throw new Error('Unable to fetch products');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   fetchProducts();
  // }, []);
  console.log(products);

  useEffect(() => {
    // Функція для отримання фільтрів по type з API за доп fetch
    const getFiltersByType = async (type) => {
      try {
        const response = await fetch(`https://plankton-app-6vr5h.ondigitalocean.app/api/filters/${type}`);
        if (response.ok) {
          const data = await response.json();
          // Розділ фільтрів по типам
          if (type === 'author') {
            setAuthorFilters(data);
          } else if (type === 'categories') {
            setCategoryFilters(data);
          }
        } else {
          throw new Error('Impossible to get filters');
        }
      } catch (error) {
        console.error(error);
      }
    };
    // Виклик функції для отримання фільтрів по типам
    getFiltersByType('author');
    getFiltersByType('categories');
  }, []);

  
  // Функція для відображення товарів згідно обраних фільтрів
  const applyFilters = () => {
    // Запит до API з використанням queryString для фільтрації товарів
    fetch(`https://plankton-app-6vr5h.ondigitalocean.app/api/products/filter?${queryString}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Unable to fetch filtered products');
      })
      .then((data) => {
        // Опрацювання отриманих відфільтрованих товарів
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    applyFilters(); // Викликати applyFilters при кожній зміні queryString
  }, [queryString]);

  // Код фільтру по чекбоксам
  const valueChange = (event) => {
    const { name, checked } = event.target;
    const filterType = event.target.getAttribute('data-filter-type');
    console.log(event.target.name);

    setSelectedFilters((prevSelectedFilters) => {
      const updatedFilters = { ...prevSelectedFilters };
    
      if (checked) {
        updatedFilters[filterType] = [...updatedFilters[filterType], name];
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter((filter) => filter !== name);
      }
    
      return updatedFilters;
    });
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  // Використовувати значення checked з localstorage при рендері
  useEffect(() => {
    const savedCheckboxValues = localStorage.getItem('checkboxValues');
    if (savedCheckboxValues) {
      setCheckboxValues(JSON.parse(savedCheckboxValues));
    }
  }, []);
  // Зберігати значення checked для чекбоксів при зміні стану
  useEffect(() => {
    localStorage.setItem('checkboxValues', JSON.stringify(checkboxValues));
  }, [checkboxValues]);

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
  console.log(minPrice);

  const buildQueryString = (filters) => {
    let newQueryString = '';

    if (filters.authors.length > 0) {
      const authorsString = filters.authors.join(',');
      newQueryString += `&author=${authorsString}`;
    }

    if (filters.categories.length > 0) {
      const categoriesString = filters.categories.join(',');
      newQueryString += `&categories=${categoriesString}`;
    }

    if (sortBy) {
      newQueryString += `&sort=${sortBy}`;
    }

    if (filters.minPrice !== '') {
      newQueryString += `&minPrice=${filters.minPrice}`;
    }
  
    if (filters.maxPrice !== '') {
      newQueryString += `&maxPrice=${filters.maxPrice}`;
    }

    // setQueryString(newQueryString); // Оновлення стану queryStrin
    dispatch(setQueryStringAction(newQueryString));
    localStorage.setItem('queryString', JSON.stringify(newQueryString));
    return newQueryString;
  };

  useEffect(() => {
    buildQueryString(selectedFilters);
  }, [selectedFilters, sortBy]);
  console.log(selectedFilters);
  console.log(queryString);

  // Очистити всі фільтри
  const clearAllFilters = () => {
    setSelectedFilters({
      authors: [],
      categories: [],
      minPrice: '',
      maxPrice: '',
    });
    setSortBy('');
    setMinPrice('');
    setMaxPrice('');
    setIsApplyButtonDisabled(false);
    setCheckboxValues({});

    // Скинути обрані значення checkbox
    // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // checkboxes.forEach((e) => {
    //   e.checked = false;
    // });

    // Скинути обрані значення select
    // const select = document.getElementById('sortBy');
    // select.selectedIndex = 0;
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
    const { value } = e.target;
    setMinPrice(value);
    setIsApplyButtonDisabled(!isValidPriceInput(value, maxPrice));
  };
  
  const handleMaxPriceChange = (e) => {
    const { value } = e.target;
    setMaxPrice(value);
    setIsApplyButtonDisabled(!isValidPriceInput(minPrice, value));
  };
  

  return (
    <div className={styles.filter}>
      <div className={styles.filter__container}>
        <div className={styles.filter__wrapper}>
          <div className={styles.filter__nav}>
            <button className={styles.filter__openBtn} type="button" onClick={toggleModal}>Filters</button>
            <select name="sortBy" id="sortBy" className={styles.filter__sortBtn} value={sortBy || 'Sort By'} onChange={(e) => setSortBy(e.target.value)}>
              <option disabled selected hidden value="Sort By">Sort By</option>
              <option value="+currentPrice" className={styles.filter__sortValue}>Lowest price</option>
              <option value="-currentPrice" className={styles.filter__sortValue}>Highest price</option>
            </select>
          </div>
          <div className={styles.filter__content}>
            <div className={`${styles.filter__sidebarBckg} ${isOpen ? styles.open : ''}`} onClick={toggleModal}>
              <div className={`${styles.filter__sidebarWrapper} ${isOpen ? styles.open : ''}`} onClick={(event) => event.stopPropagation()}>
                <div className={styles.filter__sidebarHeader}>
                  <button className={styles.filter__sidebarCloseBtn} type="button" onClick={toggleModal}>
                    <LeftChevron />
                    Filters
                  </button>
                </div>
                <div className={styles.filter__sidebarBody}>
                  <button className={styles.filter__clearBtnHead} type="button" onClick={clearAllFilters}>Clear All</button>
                  <h4 className={styles.filter__sidebarCategoryTitle}>Price</h4>
                  <div className={styles.filter__sidebarItemValue}>
                    <div>
                      <input className={`${isApplyButtonDisabled ? styles.warning : ''}`} type="text" id="minPrice" name="minPrice" placeholder="Min" onChange={handleMinPriceChange} value={minPrice} maxLength={4} />
                      <input className={`${isApplyButtonDisabled ? styles.warning : ''}`} type="text" id="maxPrice" name="maxPrice" placeholder="Max" onChange={handleMaxPriceChange} value={maxPrice} maxLength={4} />
                    </div>
                    <button className={`${styles.filter__sidebarApplyBtn} ${isApplyButtonDisabled ? styles.disabled : ''}`} type="button" onClick={applyPriceFilter} disabled={isApplyButtonDisabled}>Apply</button>
                  </div>
                  <h4 className={styles.filter__sidebarCategoryTitle}>Author</h4>
                  {authorFilters.map((author) => (
                    <div key={author._id} className={styles.filter__sidebarItem}>
                      <label htmlFor={author.name}>
                        <input type="checkbox" id={author.name} name={author.name} data-filter-type="authors" onChange={valueChange} checked={checkboxValues[author.name] || false} />
                        {author.name}
                      </label>
                    </div>
                  ))}
                  <h4 className={styles.filter__sidebarCategoryTitle}>Collection</h4>
                  {categoryFilters.map((category) => (
                    <div key={category._id} className={styles.filter__sidebarItem}>
                      <label htmlFor={category.name}>
                        <input type="checkbox" id={category.name} name={category.name} data-filter-type="categories" onChange={valueChange} checked={checkboxValues[category.name] || false} />
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className={styles.filter__sidebarFooter}>
                  <button className={styles.filter__clearBtn} type="button" onClick={clearAllFilters}>Clear All</button>
                </div>
              </div>
            </div>
            <section className={styles.filter__contentList}>
              {products.productsQuantity === 0 ? (
                <p className={styles.filter__contentNoItems}>No items with such parameters</p>
              ) : (
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ea ipsam ab mollitia quo sunt voluptatibus quam dignissimos eaque, optio molestias atque amet harum impedit quasi commodi error cupiditate aliquid?</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
