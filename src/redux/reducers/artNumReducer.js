import { artNumTypes } from '../types/artNumTypes';

const initialState = {
  artNum: null,
};

export const artNumReducer = (state = initialState, action) => {
  switch (action.type) {
    case artNumTypes.SET_ART_NUM:
      return { ...state, artNum: action.payload.artNum };

    default:
      return state;
  }
};