import { modalTypes } from '../types/modalTypes';

const initialState = {
  isModalOpened: false,
  modalData: {},
};

export function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case modalTypes.OPEN_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalData: action.payload.modalData,
      };
    case modalTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpened: false,
        modalData: {},
      };
    default:
      return state;
  }
}