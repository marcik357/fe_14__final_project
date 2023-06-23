import { modalTypes } from '../types/modalTypes';

export function setModalType(modal) {
  return {
    type: modalTypes.SHOW_MODAL,
    payload: { modal }
  };
}