import { dataTypes } from '../types/dataTypes';

export const setData = (data) => ({
  type: dataTypes.SET_PRODUCTS,
  payload: data,
});

export function getDataAsync() {
  return function (dispatch) {
    fetch('./data/productList.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then((data) => {
        const results = data.products;
        dispatch(setData(results));
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  };
}
