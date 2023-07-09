import { productsTypes } from '../types/productsTypes';

const initialState = {
  products: [],
  // promo: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productsTypes.ADD_PRODUCTS:
      return { ...state, products: action.payload };
    // case productsTypes.ADD_PROMO:
    //   return { ...state, promo: action.payload };

    default:
      return state;
  }
};