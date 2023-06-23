import { modalTypes } from '../types/modalTypes';

const initialState = {
  modal: null,
};

export function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case modalTypes.SHOW_MODAL:
      return {
        ...state,
        modal: action.payload.modal
      };
    default:
      return state;
  }
}