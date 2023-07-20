import { filterTypes } from '../types/filterTypes';
import { getDataFromSS } from '../../utils/index'

const initialState = {
  queryString: getDataFromSS('queryString'),
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case filterTypes.SET_QUERY_STRING:
      return {...state, queryString: action.payload};

    default:
      return state;
  }
};