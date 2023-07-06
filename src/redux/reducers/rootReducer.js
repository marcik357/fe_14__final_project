import { combineReducers } from 'redux';
import { artNumReducer as artNum } from './artNumReducer';
import { filterReducer as filter } from './filterReducer';

export const rootReducer = combineReducers({
  artNum,
  filter,
});