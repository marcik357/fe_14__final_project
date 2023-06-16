// Core
import { combineReducers } from 'redux';

// Reducers

import { artNumReducer as artNum } from './artNumReducer';
import { dataReducer as data } from './getDataReducer';

export const rootReducer = combineReducers({ data, artNum });