import { combineReducers } from 'redux';
import { artNumReducer as artNum } from './artNumReducer';
import { productsReducer as products } from './productsReducer';
import { loadingReducer as loading } from './loadingReducer';
import { errorReducer as error } from './errorReducer';

export const rootReducer = combineReducers({
  artNum,
  products,
  loading,
  error
});