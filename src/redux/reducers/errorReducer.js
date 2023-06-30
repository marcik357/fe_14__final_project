import { errorTypes } from '../types/errorTypes';

const initialState = {
  error: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case errorTypes.IS_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};