import { adminTypes } from '../types/adminTypes';

export function setAdminAction(admin) {
  return {
    type: adminTypes.IS_ADMIN,
    payload: admin
  };
}