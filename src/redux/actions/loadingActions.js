import { loadingTypes } from '../types/loadingTypes';

export function setLoadingAction(loading) {
  return {
    type: loadingTypes.IS_LOADING,
    payload: loading
  };
}