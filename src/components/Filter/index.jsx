/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable linebreak-style */
import { useState } from 'react';
import styles from './filter.module.scss';
import left from './img/left-chevron-svgrepo-com.svg';

function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__container}>
        <div className={styles.filter__wrapper}>
          <div className={styles.filter__nav}>
            <button className={styles.filter__openBtn} type="button" onClick={toggleModal}>Filters</button>
            <select name="sortBy" id="sortBy" className={styles.filter__sortBtn}>
              <option disabled selected hidden value="Sort By">Sort By</option>
              <option value="Lowest price">Lowest price</option>
              <option value="Highest price">Highest price</option>
            </select>
          </div>
          <div className={styles.filter__content}>
            <div className={`${styles.filter__sidebarBckg} ${isOpen ? styles.open : ''}`} onClick={toggleModal}>
              <div className={`${styles.filter__sidebarWrapper} ${isOpen ? styles.open : ''}`} onClick={(event) => event.stopPropagation()}>
                <div className={styles.filter__sidebarHeader}>
                  <button className={styles.filter__sidebarCloseBtn} type="button" onClick={toggleModal}>
                    <img src={left} alt="left-img" />
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
                  <div className={styles.filter__sidebarItem}>
                    <label htmlFor="andy">
                      <input type="checkbox" id="andy" name="andy" />
                      Andy
                    </label>
                  </div>
                  <div className={styles.filter__sidebarItem}>
                    <label htmlFor="elnafrederick">
                      <input type="checkbox" id="elnafrederick" name="elnafrederick" />
                      Elnafrederick
                    </label>
                  </div>
                  <div className={styles.filter__sidebarItem}>
                    <label htmlFor="randomdash">
                      <input type="checkbox" id="randomdash" name="randomdash" />
                      Randomdash
                    </label>
                  </div>
                  <div className={styles.filter__sidebarItem}>
                    <label htmlFor="travis">
                      <input type="checkbox" id="travis" name="travis" />
                      Travis
                    </label>
                  </div>
                  <h4 className={styles.filter__sidebarCategoryTitle}>Collection</h4>
                  <div className={styles.filter__sidebarItem}>
                    <label htmlFor="animals">
                      <input type="checkbox" id="animals" name="animals" />
                      Animals
                    </label>
                  </div>
                  <div className={styles.filter__sidebarItem}>
                    <label htmlFor="future">
                      <input type="checkbox" id="future" name="future" />
                      Future
                    </label>
                  </div>
                  <div className={styles.filter__sidebarItem}>
                    <label htmlFor="nature">
                      <input type="checkbox" id="nature" name="nature" />
                      Nature
                    </label>
                  </div>
                  <div className={styles.filter__sidebarItem}>
                    <label htmlFor="space">
                      <input type="checkbox" id="space" name="space" />
                      Space
                    </label>
                  </div>
                </div>
                <div className={styles.filter__sidebarFooter}>
                  <button className={styles.filter__applyBtn} type="button">Apply</button>
                </div>
              </div>
            </div>
            <section className={styles.filter__contentList}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ea ipsam ab mollitia quo sunt voluptatibus quam dignissimos eaque, optio molestias atque amet harum impedit quasi commodi error cupiditate aliquid?</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
