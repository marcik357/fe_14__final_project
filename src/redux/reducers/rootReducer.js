import { combineReducers } from 'redux';
import { productsReducer as products } from './productsReducer';
import { loadingReducer as loading } from './loadingReducer';
import { errorReducer as error } from './errorReducer';;
import { modalReducer as modal } from './modalReducer';
import { tokenReducer as token } from './tokenReducer';
import { partnersReducer as partners } from './partnersReducer';
import { cartReducer as cart } from './cartReducer';
import { filterReducer as filter } from './filterReducer';

export const rootReducer = combineReducers({
  products,
  loading,
  error,
  modal,
  cart,
  token,
  partners,
  filter,
});