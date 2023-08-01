import { orderTypes } from '../types/orderTypes';

export function addToOrder(product) {
    return {
        type: orderTypes.IS_ORDER,
        payload: product || []
      }
}