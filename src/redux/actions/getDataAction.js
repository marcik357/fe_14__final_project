/* eslint-disable no-console */
/* eslint-disable func-names */
import axios from 'axios';
import { dataTypes } from '../types/dataTypes';

export const setData = (data) => ({
  type: dataTypes.SET_PRODUCTS,
  payload: data,
});

export function getDataAsync() {
  return function (dispatch) {
    dispatch({ type: dataTypes.SET_PRODUCTS });
    axios
      .get('./data/productList.json')
      .then((response) => {
        const results = response.data.products;
        dispatch(setData(results));
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  };
}