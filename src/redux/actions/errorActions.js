import { errorTypes } from '../types/errorTypes';

export function setErrorAction(error) {
  return {
    type: errorTypes.IS_ERROR,
    payload: error
  };
}