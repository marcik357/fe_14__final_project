import { combineReducers } from 'redux';
import { artNumReducer as artNum } from './artNumReducer';
import { productsReducer as products } from './productsReducer';
import { loadingReducer as loading } from './loadingReducer';
import { errorReducer as error } from './errorReducer';;
import { modalReducer as modal } from './modalReducer';
<<<<<<<<< Temporary merge branch 1
import { tokenReducer as token } from './tokenReducer';
=========
import { cartReducer as cart } from './cartReducer';
>>>>>>>>> Temporary merge branch 2

export const rootReducer = combineReducers({
  artNum,
  products,
  loading,
  error,
  modal,
<<<<<<<<< Temporary merge branch 1
  token
=========
  cart
>>>>>>>>> Temporary merge branch 2
});