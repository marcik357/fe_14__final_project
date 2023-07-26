import { orderTypes } from '../types/orderTypes';

const initialState = {
    order: '',
}

export function orderReducer(state = initialState, action) {
    switch (action.type) {
      case orderTypes.IS_ORDER:
        return { ...state, order: action.payload };
  
      default:
        return state;
    }
  }