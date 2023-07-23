import { adminTypes } from '../types/adminTypes';

const initialState = {
  admin: false,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.IS_ADMIN:
      return { ...state, admin: action.payload };

    default:
      return state;
  }
};