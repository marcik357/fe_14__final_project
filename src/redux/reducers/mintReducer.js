import { mintTypes } from '../types/mintTypes';

const initialState = {
  mintCardFirst: '',
  mintCardSecond: '',
}

export function mintReducer(state = initialState, action) {
  switch (action.type) {
    case mintTypes.IS_MINT_FIRST:
      return { ...state, mintCardFirst: action.payload };
    case mintTypes.IS_MINT_SECOND:
      return { ...state, mintCardSecond: action.payload };

    default:
      return state;
  }
}