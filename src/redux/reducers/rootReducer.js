import { combineReducers } from 'redux';
import { artNumReducer as artNum } from './artNumReducer';
import { modalsReducer as modal} from './modals';

export const rootReducer = combineReducers({
  artNum,
  modal
});