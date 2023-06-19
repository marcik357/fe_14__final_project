/* eslint-disable linebreak-style */
import { useState } from 'react';
import styles from './filter.module.scss';

function Filter() {
  const [onClick, setOnClick] = useState(true);
  return (
    <div className={styles.filter}>
      <h2 className={styles.filter__title}>NFTs</h2>
      <div className={styles.filter__wrapper}>
        <button className={styles.filter__openBtn} type="button" onClick={() => setOnClick(!onClick)}>Filter</button>
        {!onClick && (
          <div className={styles.filter__sideWrapperBckg}>
            <div className={styles.filter__sideWrapper}>
              <div className={styles.filter__sideHeader}>
                <h3 className={styles.filter__sideTitle}>Filter</h3>
                <button className={styles.filter__sideCloseBtn} type="button" onClick={() => setOnClick(!onClick)}>Close</button>
              </div>
              <div className={styles.filter__sideBody}>
                <h4 className={styles.filter__sideCategoryTitle}>All</h4>
                <div>
                  <label htmlFor="all">
                    <input type="checkbox" id="all" name="all" />
                    All
                  </label>
                </div>
                <h4 className={styles.filter__sideCategoryTitle}>Collection</h4>
                <div>
                  <label htmlFor="animals">
                    <input type="checkbox" id="animals" name="animals" />
                    Animals
                  </label>
                </div>
                <div>
                  <label htmlFor="future">
                    <input type="checkbox" id="future" name="future" />
                    Future
                  </label>
                </div>
                <div>
                  <label htmlFor="nature">
                    <input type="checkbox" id="nature" name="nature" />
                    Nature
                  </label>
                </div>
                <div>
                  <label htmlFor="space">
                    <input type="checkbox" id="space" name="space" />
                    Space
                  </label>
                </div>
                <h4 className={styles.filter__sideCategoryTitle}>Author</h4>
                <div>
                  <label htmlFor="andy">
                    <input type="checkbox" id="andy" name="andy" />
                    Andy
                  </label>
                </div>
                <div>
                  <label htmlFor="elnafrederick">
                    <input type="checkbox" id="elnafrederick" name="elnafrederick" />
                    Elnafrederick
                  </label>
                </div>
                <div>
                  <label htmlFor="randomdash">
                    <input type="checkbox" id="randomdash" name="randomdash" />
                    Randomdash
                  </label>
                </div>
                <div>
                  <label htmlFor="travis">
                    <input type="checkbox" id="travis" name="travis" />
                    Travis
                  </label>
                </div>
                <h4 className={styles.filter__sideCategoryTitle}>Price</h4>
                <div>
                  <label htmlFor="min">
                    <input type="checkbox" id="min" name="min" />
                    Min
                  </label>
                </div>
                <div>
                  <label htmlFor="max">
                    <input type="checkbox" id="max" name="max" />
                    Max
                  </label>
                </div>
              </div>
              <div className={styles.filter__sideFooter}>
                <button className={styles.filter__sideSubmitBtn} type="button">Apply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
