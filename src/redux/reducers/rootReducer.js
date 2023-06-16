import { artNumReducer as artNum } from './artNumReducer'
import { modalsReducer as modals} from "./modals";

export const rootReducer = combineReducers({
  artNum,
  modals
})