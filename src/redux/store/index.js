import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from '../reducers/rootReducer';
import {
  composeEnhancers,
  middleware,
} from './middleware';

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);