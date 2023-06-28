import { cartTypes } from "../types/cartTypes";
import { parseLocalStorageItem } from "../../components/Cart/LocalStorage";

const initialState = {
    cartProductsAdd:parseLocalStorageItem('cartProductsAdd') || [],
    products:parseLocalStorageItem('products') || []
}

// cartProductsAdd:[...state.cartProductsAdd,action.payload.cartProductsAdd]
export function cartReducer(state=initialState, action) {
    switch (action.type) {
        case cartTypes.ADD_TO_CART:
           return {...state,products:[...state.products,action.payload]}
        case cartTypes.ADD_TO_CART_PRODUCT:
            return {...state,cartProductsAdd:[...state.cartProductsAdd,action.payload.cartProductsAdd]}
            case cartTypes.INCREASE_CART:
                return {...state,products:action.payload}
                case cartTypes.LOAD_CART:
                    return action.payload;
            default:
           return state;
    }
}