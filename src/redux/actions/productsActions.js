import { productsTypes } from '../types/productsTypes';

export function addProductsAction(products) {
  return {
    type: productsTypes.ADD_PRODUCTS,
    payload: products
  };
}