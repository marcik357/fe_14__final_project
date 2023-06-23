import { fetchData } from '../../utils';
import { setErrorAction } from './errorActions';
import { setLoadingAction } from './loadingActions';

export function getData(url, callback) {
  return async (dispatch) => {
    try {
      dispatch(setLoadingAction(true));
      const data = await fetchData(url);
      dispatch(callback(data));
      dispatch(setLoadingAction(false));
    } catch (error) {
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(error));
    }
  };
}