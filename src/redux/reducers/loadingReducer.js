import { loadingTypes } from '../types/loadingTypes';

const initialState = {
  loading: null,
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case loadingTypes.IS_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};