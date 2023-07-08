import { cartTypes } from "../types/cartTypes";
import { getDataFromLS } from "../../utils";

const initialState = parseLocalStorageItem('cart') || [];

export function cartReducer(state=initialState, action) {
    switch (action.type) {
        case cartTypes.CHANGE__CART:
           return action.payload
        default:
           return state;
    }
}