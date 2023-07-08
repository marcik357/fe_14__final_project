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

 export function deleteCart(id,token){
    return async function(dispatch){
      try{

        if(token){
          dispatch(setLoadingAction(true))
            const cart = await fetchData(`${baseUrl}cart/${id}`,{
                method:"DELETE",
                headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
              })
              dispatch(setCart(cart == null ? []: cart))
              dispatch(setLoadingAction(false))
        }
        else{
            const cart =parseLocalStorageItem('cart').filter(item => item.product !== id);
            localStorage.setItem("cart",JSON.stringify(cart));
            dispatch(setCart(cart == null ?[]: cart ))
          
        }
      }
      catch(error){
        dispatch(setErrorAction(error))
      }
        
    }
 }
