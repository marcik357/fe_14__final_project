import { dataTypes } from '../types/dataTypes';

const initialState = {
  products: [],
};
export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case dataTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
