import { cartTypes } from "../types/cartTypes";
import { setErrorAction } from "./errorActions";
import { setLoadingAction } from "./loadingActions";
import { baseUrl } from '../../utils/vars'
import { parseLocalStorageItem } from "../../components/Cart/LocalStorage";


export const handleError = (response, code) => {
    if (response.status === code) {
      throw new Error(response.status)
    }
  }
export async function fetchData(url, reqBody) {
    try {
      const response = await fetch(url, reqBody);
      if (!response.ok) {
        handleError(response, 401);
        const error = await response.json();
        throw new Error(error.message);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // export async function serverCart(token,baseUrl) {
  //   const cart = await fetchData(`${baseUrl}cart`,
  //   {headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}});
  //   return cart
  // }

export function setCart(cart){
    return {
        type:cartTypes.CHANGE__CART,
        payload:cart || [],
    }
}
export function getDataLS(token,cart){
  return async function(dispatch){
    try{
      const newCart =  await fetchData(`${baseUrl}cart`,{
        method:"POST",
        headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
        body:JSON.stringify({products:cart})
      })
    dispatch(setCart(newCart))
    localStorage.setItem('cart','[]')
    }
    catch(error){
      dispatch(setErrorAction(error))
    }
  }
}
export function reloadPageSV(token){
    return async function(dispatch){
      try{
        const cart = await fetchData(`${baseUrl}cart`,
        {headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}});
        dispatch(setCart(cart == null ?[]:cart))
    }
    catch(error){
      dispatch(setErrorAction(error))
    }
  }
 }
export function addToCart(id,token){
   return async function(dispatch){
    try{
      if(token){
        const cart = await fetchData(`${baseUrl}cart/${id}`,{
            method:"PUT",
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          })
          dispatch(setCart(cart))
    }
    else{
        const cart = [...parseLocalStorageItem('cart'),{ product:id,cartQuantity:1}]
        localStorage.setItem("cart",JSON.stringify(cart));
        dispatch(setCart(cart))
    }
    }
    catch(error){
      dispatch(setErrorAction(error))
    }
   }
 }

export function changeQuantityProduct(id,token,cart,flag) {
  return async function(dispatch){
    try{
    if(token){
     const newQuantity = cart?.products.map(({product,cartQuantity}) => {
      if(product._id === id){
        flag ? cartQuantity+=1 : cartQuantity-=1
        return {product:product._id, cartQuantity:cartQuantity }
      }
      return {product:product._id, cartQuantity:cartQuantity }
     });
     const newCart =  await fetchData(`${baseUrl}cart`,{
                        method:"PUT",
                        headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
                        body:JSON.stringify({products:newQuantity})
                      })
                    dispatch(setCart(newCart))
    }
    else{
      const newCart =parseLocalStorageItem('cart').map(({product,cartQuantity})=>{
        if(product === id) {
          flag ? cartQuantity +=1 : cartQuantity-=1
          return {product:product, cartQuantity:cartQuantity}
        }
        return {product:product, cartQuantity:cartQuantity}
      })
        localStorage.setItem("cart",JSON.stringify(newCart));
        dispatch(setCart(newCart))
      }
    }
      catch(error){
        dispatch(setErrorAction(error))
      }
  }
}

export function buyProduct(token){
   return async function(dispatch){
    try{
        dispatch(setLoadingAction(true));
        const sendFetch = await fetch(`${baseUrl}cart`,{
            method:"DELETE",
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          })
          dispatch(deleteAllCart());
          dispatch(setLoadingAction(false));
          dispatch(setErrorAction(null));
    }
    catch(error){
        dispatch(setLoadingAction(false));
        dispatch(setErrorAction(error));
    }
    }
}

export async function addProductNftToCart(dispatch,cartProductsArray,products,idProduct,token,itemNo){
    try{
        dispatch(setLoadingAction(true));
        const getFetch = await fetch(`${baseUrl}products/${itemNo}`)
        const response = await getFetch.json();
        token ?
        ( cartProductsArray.length > 0 && products.length > 0 ?(
          dispatch(addNewProductToCart(idProduct,token))
        ):dispatch(createCartOnTheServerFirst(idProduct,token)))
        :dispatch(addToCartQuantity(idProduct));
        dispatch(addToCartProduct(response));
        dispatch(setLoadingAction(false));
        dispatch(setErrorAction(null));
    }
    catch(error){
        dispatch(setLoadingAction(false));
        dispatch(setErrorAction(error));
    }
    }