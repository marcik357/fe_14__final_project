import { partnersTypes } from '../types/partnersTypes';

export function addPartnersAction(partners) {
  return {
    type: partnersTypes.ADD_PARTNERS,
    payload: partners
  };
}