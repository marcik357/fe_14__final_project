import { modalTypes } from '../types/modalTypes';

export function openModal(modalData) {
  return {
    type: modalTypes.OPEN_MODAL,
    payload: {
      modalData
    },
  }
}

export function closeModal() {
  return {
    type: modalTypes.CLOSE_MODAL,
  }
}