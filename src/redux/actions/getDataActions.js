import { fetchData } from '../../utils';
import { setErrorAction } from './errorActions';
import { setLoadingAction } from './loadingActions';

const token = localStorage.getItem('token');

export function getDataAction(url, callback, reqObj, state) {
  return async (dispatch) => {
    try {
      dispatch(setLoadingAction(true));
      const data = await fetchData(url, reqObj);
      !state ? dispatch(callback(data)) : callback(data);
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(null));
    } catch (error) {
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(error.message));
    }
  };
}