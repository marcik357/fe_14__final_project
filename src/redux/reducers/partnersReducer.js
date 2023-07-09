import { partnersTypes } from '../types/partnersTypes';

const initialState = {
  partners: []
};

export const partnersReducer = (state = initialState, action) => {
  switch (action.type) {
    case partnersTypes.ADD_PARTNERS:
      return { ...state, partners: action.payload };

    default:
      return state;
  }
};