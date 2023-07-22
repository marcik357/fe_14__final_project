import { Search, Close } from '../Icons';
import { fetchData } from '../../utils';
import { baseUrl } from '../../utils/vars';
import { useState, useEffect, useRef } from 'react';
import { HeaderSearchResults } from '../HeaderSearchResults';
import { motion, AnimatePresence } from 'framer-motion';
import style from './headerSearch.module.scss';
import { wrapperAnimation, bodyAnimation, containerAnimation } from '../../animation';

export function HeaderSearch(props) {
  const { classForm, isSearchVisible, classActive, scrolled, classScrolled, classLabel,
    classInput, classClear, classClearActive, toggleSearchView, isDesktop, formik } = props;

  const [matchingData, setMatchingData] = useState({
   products: [],
   collections: [],
   authors: []
 });

  const [inputLength, setInputLength] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    let timeoutId;
    const fetchDataAndFilter = async () => {
      try {
        const products = await fetchData(`${baseUrl}products`);
        const collections = await fetchData(`${baseUrl}catalog`);
        const authors = await fetchData(`${baseUrl}partners`);

        const searchData = [
          { data: products, origin: 'products' },
          { data: collections, origin: 'collections' },
          { data: authors, origin: 'authors' },
        ];
  
        const matchingItems = searchData.reduce((result, { data, origin }) => {
          const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(formik.values.search.toLowerCase())
          );
            result[origin] = filteredData;
            return result;
          }, {});
  
          setMatchingData(matchingItems);
            } catch (error) {
              console.error(error);
            } finally {
          setDataLoaded(true);
          }
       };
  
      clearTimeout(timeoutId);

      if (formik.values.search.length > 2) {
        timeoutId = setTimeout(fetchDataAndFilter, 500);
      } else {
        setMatchingData({ products: [], collections: [], authors: [] });
        setInputLength(0);
      }

    }, [formik.values.search]);

  useEffect(() => {
    setInputLength(formik.values.search.length);
  }, [formik.values.search]);

  // Встановлюємо значення пустий рядок
  const handleClearSearch = () => {
    formik.setFieldValue("search", "");
 };

  // вирівнювання результатів пошуку під рядком пошуку
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const [containerLeft, setContainerLeft] = useState(0);

  useEffect(() => {
   const updateContainerLeft = () => {
     const formRect = formRef.current.getBoundingClientRect();
     setContainerLeft(formRect.left);
   };

   window.addEventListener('resize', updateContainerLeft);
   updateContainerLeft();

   return () => {
     window.removeEventListener('resize', updateContainerLeft);
   };
 }, []);

  // стан для об"єкт matchingData пустий він чи ні
  const [isSearchArray, setIsSearchArray] = useState(false);

  useEffect(() => {
	 setIsSearchArray(Object.values(matchingData).some(data => data.length > 0));
  }, [matchingData]);
  

  // анімація framer-motion
 const items = [
	{ key: 'products', data: matchingData.products },
	{ key: 'collections', data: matchingData.collections },
	{ key: 'authors', data: matchingData.authors },
 ];
 
  return (
   <>
    <form action="" ref={formRef} className={`${classForm} ${isSearchVisible && classActive} ${scrolled && classScrolled}`}>
      <label htmlFor="searchInput" className={classLabel}>
        <input
         type="text"
         name="search"
         id="search"
         placeholder="Search"
         className={classInput}
         value={formik.values.search}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
        />
      <Search />
      <button type="button" className={`${classClear} ${inputLength > 0 && classClearActive}`} onClick={handleClearSearch}>
        <span>CLEAR</span>
        <Close color='#A6AEAD'/>
      </button>
      </label>
     </form>
     <AnimatePresence>
     {inputLength > 2 && dataLoaded && isSearchArray && (
        <motion.div
          className={`${style.headerSearch} ${scrolled && style.scrolled}`}
          role="button" tabIndex={0}
          onClick={toggleSearchView}
          onKeyDown={toggleSearchView}
          {...wrapperAnimation}
        >
          <motion.div
            className={style.headerSearch__container}
            style={isDesktop ? { left: containerLeft } : null}
            ref={containerRef}
            {...containerAnimation}
          >
            {items.map(({ key, data }, index) => (
                <motion.div
                 key={key}
                 className={style.headerSearch__body}
                 {...bodyAnimation(index)}
                >
                  {data.length > 0 && (
                    <HeaderSearchResults
                      data={data}
                      type={key === 'products' ? 'NFTs' : key === 'collections' ? 'Collections' : 'Authors'}
                      handleClearSearch={handleClearSearch}
                      toggleSearchView={toggleSearchView}
                    />
                  )}
                </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
     </AnimatePresence>
	  </>
  )
}