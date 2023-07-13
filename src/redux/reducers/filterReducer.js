import { filterTypes } from '../types/filterTypes';

const getItemFromLS = (key) => {
  const lsItem = localStorage.getItem(key);
  if (!lsItem) return '';
  try {
    const value = JSON.parse(lsItem);
    return value;
  } catch (e) {
    return '';
  }
};

const lsQueryString = getItemFromLS('queryString');

const initialState = {
  queryString: lsQueryString,
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case filterTypes.SET_QUERY_STRING:
      return {...state, queryString: action.payload};

    default:
      return state;
  }
};