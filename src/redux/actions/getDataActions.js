import { fetchData } from '../../utils';
import { setErrorAction } from './errorActions';
import { setLoadingAction } from './loadingActions';
import { addProductsAction } from './productsActions';

export function getData(url) {
  return async (dispatch) => {
    try {
      dispatch(setLoadingAction(true));
      const data = await fetchData(url);
      dispatch(addProductsAction(data));
      dispatch(setLoadingAction(false));
    } catch (error) {
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(error));
    }
  };
}