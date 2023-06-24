/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable linebreak-style */
import { useState } from 'react';
import styles from './filter.module.scss';
import left from './img/left-chevron-svgrepo-com.svg';

function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.filter}>
      <div className={styles.filter__container}>
        <div className={styles.filter__wrapper}>
          <button className={styles.filter__openBtn} type="button" onClick={openModal}>Filters</button>
          <div className={`${styles.filter__sideWrapperBckg} ${isOpen ? styles.open : ''}`} onClick={closeModal}>
            <div className={`${styles.filter__sideWrapper} ${isOpen ? styles.open : ''}`} onClick={(event) => event.stopPropagation()}>
              <div className={styles.filter__sideHeader}>
                <button className={styles.filter__sideCloseBtn} type="button" onClick={closeModal}>
                  <img src={left} alt="left-img" />
                  Filters
                </button>
              </div>
              <div className={styles.filter__sideBody}>
                <h4 className={styles.filter__sideCategoryTitle}>All</h4>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="all">
                    <input type="checkbox" id="all" name="all" />
                    All
                  </label>
                </div>
                <h4 className={styles.filter__sideCategoryTitle}>Price</h4>
                <div className={styles.filter__sideItemValue}>
                  <input type="text" id="minPrice" name="minPrice" placeholder="Min" />
                  <input type="text" id="maxPrice" name="maxPrice" placeholder="Max" />
                </div>
                <h4 className={styles.filter__sideCategoryTitle}>Author</h4>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="andy">
                    <input type="checkbox" id="andy" name="andy" />
                    Andy
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="elnafrederick">
                    <input type="checkbox" id="elnafrederick" name="elnafrederick" />
                    Elnafrederick
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="randomdash">
                    <input type="checkbox" id="randomdash" name="randomdash" />
                    Randomdash
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="travis">
                    <input type="checkbox" id="travis" name="travis" />
                    Travis
                  </label>
                </div>
                <h4 className={styles.filter__sideCategoryTitle}>Collection</h4>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="animals">
                    <input type="checkbox" id="animals" name="animals" />
                    Animals
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="future">
                    <input type="checkbox" id="future" name="future" />
                    Future
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="nature">
                    <input type="checkbox" id="nature" name="nature" />
                    Nature
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="space">
                    <input type="checkbox" id="space" name="space" />
                    Space
                  </label>
                </div>
              </div>
              <div className={styles.filter__sideFooter}>
                <button className={styles.filter__applyBtn} type="button">Apply</button>
              </div>
            </div>
          </div>
          <div className={styles.filter__content}>
            <section className={styles.filter__contentList}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ea ipsam ab mollitia quo sunt voluptatibus quam dignissimos eaque, optio molestias atque amet harum impedit quasi commodi error cupiditate aliquid?</p>
            </section>
            <aside className={styles.filter__contentSidebar}>
              <div className={styles.filter__sideBody}>
                <h4 className={styles.filter__sideCategoryTitle}>All</h4>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="all">
                    <input type="checkbox" id="all" name="all" />
                    All
                  </label>
                </div>
                <h4 className={styles.filter__sideCategoryTitle}>Price</h4>
                <div className={styles.filter__sideItemValue}>
                  <input type="text" id="minPrice" name="minPrice" placeholder="Min" />
                  <input type="text" id="maxPrice" name="maxPrice" placeholder="Max" />
                </div>
                <h4 className={styles.filter__sideCategoryTitle}>Author</h4>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="andy">
                    <input type="checkbox" id="andy" name="andy" />
                    Andy
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="elnafrederick">
                    <input type="checkbox" id="elnafrederick" name="elnafrederick" />
                    Elnafrederick
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="randomdash">
                    <input type="checkbox" id="randomdash" name="randomdash" />
                    Randomdash
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="travis">
                    <input type="checkbox" id="travis" name="travis" />
                    Travis
                  </label>
                </div>
                <h4 className={styles.filter__sideCategoryTitle}>Collection</h4>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="animals">
                    <input type="checkbox" id="animals" name="animals" />
                    Animals
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="future">
                    <input type="checkbox" id="future" name="future" />
                    Future
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="nature">
                    <input type="checkbox" id="nature" name="nature" />
                    Nature
                  </label>
                </div>
                <div className={styles.filter__sideItem}>
                  <label htmlFor="space">
                    <input type="checkbox" id="space" name="space" />
                    Space
                  </label>
                </div>
              </div>
              <div className={styles.filter__sideFooter}>
                <button className={styles.filter__applyBtn} type="button">Apply</button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
