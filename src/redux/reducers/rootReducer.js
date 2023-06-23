import { combineReducers } from 'redux';
import { artNumReducer as artNum } from './artNumReducer';
import { productsReducer as products } from './productsReducer';
import { loadingReducer as loading } from './loadingReducer';
import { errorReducer as error } from './errorReducer';;
import { dataReducer as data } from './getDataReducer';
import { modalReducer as modal } from './modalReducer';

export const rootReducer = combineReducers({
  artNum,
  products,
  loading,
  error,
  data,
  modal
});