import { combineReducers } from 'redux';
import { productsReducer as products } from './productsReducer';
import { loadingReducer as loading } from './loadingReducer';
import { errorReducer as error } from './errorReducer';;
import { modalReducer as modal } from './modalReducer';
import { tokenReducer as token } from './tokenReducer';
import { cartReducer as cart } from './cartReducer';
import { filterReducer as filter } from './filterReducer';
import { mintReducer as mint } from './mintReducer';
import { orderReducer as order } from './orderReducer';

export const rootReducer = combineReducers({
  products,
  loading,
  error,
  modal,
  cart,
  token,
  filter,
  mint,
  order
});