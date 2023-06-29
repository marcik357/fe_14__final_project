import { combineReducers } from 'redux';
import { artNumReducer as artNum } from './artNumReducer';
import { productsReducer as products } from './productsReducer';
import { loadingReducer as loading } from './loadingReducer';
import { errorReducer as error } from './errorReducer';;
import { modalReducer as modal } from './modalReducer';
import { tokenReducer as token } from './tokenReducer';

export const rootReducer = combineReducers({
  artNum,
  products,
  loading,
  error,
  modal,
  token
});