import { productsTypes } from '../types/productsTypes';

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productsTypes.ADD_PRODUCTS:
      return { ...state, products: action.payload };

    default:
      return state;
  }
};