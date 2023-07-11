import { cartTypes } from "../types/cartTypes";
import { getDataFromLS } from "../../utils";

const initialState = {
  cart: { products: getDataFromLS('cart') },
}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartTypes.SET_CART:
      return { ...state, cart: action.payload };

    default:
      return state;
  }
}