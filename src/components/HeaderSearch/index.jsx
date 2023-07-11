import { Search, Close } from '../Icons';
import { useFormik } from 'formik';
import { fetchData } from '../../utils';
import { baseUrl } from '../../utils/vars';
import { useState, useEffect, useRef } from 'react';
import { HeaderSearchResults } from '../HeaderSearchResults';
import style from './headerSearch.module.scss';

export function HeaderSearch(props) {
  const { classForm, isSearchVisible, classActive, scrolled, classScrolled, classLabel,
    classInput, classClear, classClearActive, toggleSearchView, setSearchVisible } = props;

  const [matchingData, setMatchingData] = useState({
   products: [],
   collections: [],
   authors: []
 });

  const [inputLength, setInputLength] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const formik = useFormik({
    initialValues: {
      search: "",
    }
   })

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

  // закриття input при кліку поза ним
  const formaRef = useRef(null);
  const headerSearchRef = useRef(null);

  useEffect(() => {
    const clickOutsideForms = (e) => {
     // Перевірка, чи подія є mousedown або touchstart
     const isMouseEvent = e.type === 'mousedown';
     const isTouchEvent = e.type === 'touchstart';

     if (isMouseEvent || isTouchEvent) {
       if (formaRef.current && headerSearchRef.current && !formaRef.current.contains(e.target) && !headerSearchRef.current.contains(e.target)) {
         setSearchVisible(false);
         formik.setFieldValue("search", "");
      }
     }
   };

   document.addEventListener('mousedown', clickOutsideForms);
   document.addEventListener('touchstart', clickOutsideForms);

   return () => {
     document.removeEventListener('mousedown', clickOutsideForms);
     document.removeEventListener('touchstart', clickOutsideForms);
   };
 });

  return (
   <>
    <form action="" ref={formaRef} className={`${classForm} ${isSearchVisible && classActive} ${scrolled && classScrolled}`}>
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
     {inputLength > 2 && dataLoaded && Object.values(matchingData).some(data => data.length > 0) &&(
        <div ref={headerSearchRef} className={`${style.headerSearch} ${scrolled && style.scrolled}`}>
          {matchingData.products.length > 0 && (
            <HeaderSearchResults
              data={matchingData.products}
              type='NFTs'
              handleClearSearch={handleClearSearch}
              toggleSearchView={toggleSearchView}
            />
          )}

          {matchingData.collections.length > 0 && (
            <HeaderSearchResults
              data={matchingData.collections}
              type='Collections'
              handleClearSearch={handleClearSearch}
              toggleSearchView={toggleSearchView}
            />
          )}

          {matchingData.authors.length > 0 && (
            <HeaderSearchResults
              data={matchingData.authors}
              type='Authors'
              handleClearSearch={handleClearSearch}
              toggleSearchView={toggleSearchView}
            />
          )}
        </div>
      )}
	  </>
  )
}