import { filterTypes } from '../types/filterTypes';

export function setQueryStringAction(queryString) {
  return {
    type: filterTypes.SET_QUERY_STRING,
    payload: queryString
  };
}