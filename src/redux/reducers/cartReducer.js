import { cartTypes } from "../types/cartTypes";
import { parseLocalStorageItem } from "../../components/Cart/LocalStorage";

const initialState = {
    cartProductsArray:parseLocalStorageItem('cartProductsArray') || [],
    products:parseLocalStorageItem('products') || []
}

export function cartReducer(state=initialState, action) {
    switch (action.type) {
        case cartTypes.ADD_TO_CART_QUANTITY:
           return {...state,products:[...state.products,action.payload]}
        case cartTypes.ADD_TO_CART_PRODUCT:
            return {...state,cartProductsArray:[...state.cartProductsArray,action.payload.cartProductsArray]}
            case cartTypes.CHANGE_CART__PRODUCT:
                return {...state,products:action.payload}
                case cartTypes.LOAD_CART:
                    return action.payload;
                     case cartTypes.DELETE_CART:
                        return action.payload;
            default:
           return state;
    }
}