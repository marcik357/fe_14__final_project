import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';
import {
  composeEnhancers,
} from './middleware';

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);