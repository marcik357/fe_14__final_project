import { tokenTypes } from "../types/tokenTypes";

const initialState = {
    token: null,
}
export const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
      case tokenTypes.SET_TOKEN:
        return { ...state, token: action.payload.token };
  
      default:
        return state;
    }
  };