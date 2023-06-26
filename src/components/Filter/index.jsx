/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable linebreak-style */
import { useState, useEffect } from 'react';
import styles from './filter.module.scss';
import { LeftChevron } from '../Icons/left-chevron';


function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [authorFilters, setAuthorFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    authors: [],
    categories: [],
  });
  const [products, setProducts] = useState();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // const valueChange = (event) => {
  //   if (event.target.checked) {
  //     console.log(event.target.name);
  //   } else {
  //     console.log('null');
  //   }
  // };

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

  // Код фільтру по чекбоксам
  const valueChange = (event) => {
    const { name, checked } = event.target;
    const filterType = event.target.getAttribute('data-filter-type');
    console.log(filterType);
    console.log(event.target.checked);

    setSelectedFilters((prevSelectedFilters) => {
      const updatedFilters = { ...prevSelectedFilters };

      if (checked === true) {
        updatedFilters[filterType].push(name);
      } else {
        const filterIndex = updatedFilters[filterType].indexOf(name);
        if (filterIndex !== -1) {
          updatedFilters[filterType].splice(filterIndex, 1);
        }
      }
      console.log(updatedFilters);
      return updatedFilters;
    });
  };

  const buildQueryString = (filters) => {
    let queryString = '';

    if (filters.authors.length > 0) {
      const authorsString = filters.authors.join(',');
      queryString += `&author=${authorsString}`;
    }

    if (filters.categories.length > 0) {
      const categoriesString = filters.categories.join(',');
      queryString += `&categories=${categoriesString}`;
    }

    // Додам сюди інші параметри фільтрації

    return queryString;
  };

  // useEffect(() => {
  // Функція для відображення обраних фільтрів
  const applyFilters = () => {
    const queryString = buildQueryString(selectedFilters);
    console.log(queryString);
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
        console.log(data);
        setProducts(data);
        console.log(products);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    applyFilters(); // Викликати applyFilters при кожній зміні selectedFilters ????
  }, [selectedFilters]);
  //   applyFilters();
  // }, [selectedFilters]);


  return (
    <div className={styles.filter}>
      <div className={styles.filter__container}>
        <div className={styles.filter__wrapper}>
          <div className={styles.filter__nav}>
            <button className={styles.filter__openBtn} type="button" onClick={toggleModal}>Filters</button>
            <select name="sortBy" id="sortBy" className={styles.filter__sortBtn}>
              <option disabled selected hidden value="Sort By">Sort By</option>
              <option value="Lowest price" className={styles.filter__sortValue}>Lowest price</option>
              <option value="Highest price" className={styles.filter__sortValue}>Highest price</option>
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
                  <h4 className={styles.filter__sidebarCategoryTitle}>All</h4>
                  <div className={styles.filter__sidebarItem}>
                    <label htmlFor="all">
                      <input type="checkbox" id="all" name="all" />
                      All
                    </label>
                  </div>
                  <h4 className={styles.filter__sidebarCategoryTitle}>Price</h4>
                  <div className={styles.filter__sidebarItemValue}>
                    <input type="text" id="minPrice" name="minPrice" placeholder="Min" />
                    <input type="text" id="maxPrice" name="maxPrice" placeholder="Max" />
                  </div>
                  <h4 className={styles.filter__sidebarCategoryTitle}>Author</h4>
                  {authorFilters.map((author) => (
                    <div key={author._id} className={styles.filter__sidebarItem}>
                      <label htmlFor={author.name}>
                        <input type="checkbox" id={author.name} name={author.name} data-filter-type="authors" onChange={valueChange} />
                        {author.name}
                      </label>
                    </div>
                  ))}
                  <h4 className={styles.filter__sidebarCategoryTitle}>Collection</h4>
                  {categoryFilters.map((category) => (
                    <div key={category._id} className={styles.filter__sidebarItem}>
                      <label htmlFor={category.name}>
                        <input type="checkbox" id={category.name} name={category.name} data-filter-type="categories" onChange={valueChange} />
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className={styles.filter__sidebarFooter}>
                  <button className={styles.filter__applyBtn} type="button" onClick={applyFilters}>Apply</button>
                </div>
              </div>
            </div>
            <section className={styles.filter__contentList}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ea ipsam ab mollitia quo sunt voluptatibus quam dignissimos eaque, optio molestias atque amet harum impedit quasi commodi error cupiditate aliquid?</p>
              {/* {products.map((product) => (
                <div key={product.id}>
                  <h3>{product.name}</h3>
                  <p>{product.author}</p>
                  <p>{product.categories}</p>
                </div>
              ))} */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
