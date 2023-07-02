import { cartTypes } from "../types/cartTypes";
import { setErrorAction } from "./errorActions";
import { setLoadingAction } from "./loadingActions";
import { baseUrl } from '../../utils/vars'

///workin without server
export function loadCart(initialState){
    return {
        type:cartTypes.LOAD_CART,
        payload:initialState
}
}
export function changeQuantityInCartLocal(id,quantity,array,operation){
    const increaseCart={
        products:[{
            product:id,
            cartQuantity:quantity + 1 ,
        }]
    }
    const decreaseCart={
        products:[{
            product:id,
            cartQuantity:quantity - 1,
        }]
    }
    const changeProduct= array.filter(item=>item.product !== id);
    let updateCartQuantity;
    if(operation){
        updateCartQuantity = increaseCart.products[0];
    }
    else{
       updateCartQuantity = decreaseCart.products[0];
    }
    const changeProductArray =changeProduct.length > 0 ? [updateCartQuantity,...changeProduct]:[updateCartQuantity];
    
    return {
        type:cartTypes.CHANGE_CART__PRODUCT,
        payload:changeProductArray
  }
}

////for server and local storage
export function addToCartQuantity(id){
    return {
        type:cartTypes.ADD_TO_CART_QUANTITY,
        payload:{
            product:id,
            cartQuantity:1,
     }
   }
}

export function changeCartQuantity(changeProductArray){
        return {
        type:cartTypes.CHANGE_CART__PRODUCT,
        payload:changeProductArray
  }
}

export function addToCartProduct(data){
    return {
        type:cartTypes.ADD_TO_CART_PRODUCT,
        payload:{
            cartProductsArray:data,
    }
  }
}

export function deleteFromCartProduct(id,cartProduct,product){
    const newCartProduct = cartProduct.filter(product=> product._id !== id)
    const newProduct = product.filter(product=> product.product !== id)
    const deleteProductArray = {
        cartProductsArray:newCartProduct,
        products:newProduct
    }
    return {
        type:cartTypes.DELETE_CART,
        payload:deleteProductArray,
  }
}

////working with server and token
export function reloadPageGetCart(token){
    return async function(dispatch){
            try{
                dispatch(setLoadingAction(true));
                const getFetch = await fetch(`${baseUrl}cart`,{
                    headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}
                  })
                  const response = await getFetch.json();
                    const initialState = !response ? {
                        cartProductsArray:[],
                        products:[]
                        } :
                            {
                              cartProductsArray:response.products.map(product => product.product),
                              products:response.products.map(item=> {
                                  return { cartQuantity:item.cartQuantity,
                                           product:item.product._id}
                               })
                          }
                          dispatch(loadCart(initialState))
                          dispatch(setLoadingAction(false));
                          dispatch(setErrorAction(null));
            }
            catch(error){
                dispatch(setLoadingAction(false));
                dispatch(setErrorAction(error));
            }
      }
}

export function addNewProductToCart(id,token){
    return async function(dispatch){
        try {
            const sendFetch = await fetch(`${baseUrl}cart/${id}`,{
            method:"PUT",
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          })
          dispatch(addToCartQuantity(id))
        }
        catch(error){
            dispatch(setErrorAction(error));
        }
    }
}

export function createCartOnTheServerFirst(id,token){
    const newCart = {
        products:[{
            product:id,
            cartQuantity:1
        }]
    }
    return async function(dispatch){
        try{
            dispatch(setLoadingAction(true));
            const getFetch = await fetch(`${baseUrl}cart`,{
                method:"POST",
                headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify(newCart),
              })
            dispatch(addToCartQuantity(id))
            dispatch(setLoadingAction(false));
            dispatch(setErrorAction(null));
        }
        catch(error){
            dispatch(setLoadingAction(false));
            dispatch(setErrorAction(error));
        }
}
}

export function changeQuantityInCartWithServer(id,quantity,array,token,operation){
    const increaseCart={
        products:[{
            product:id,
            cartQuantity:quantity + 1
        }]
    }
    const decreaseCart={
        products:[{
            product:id,
            cartQuantity:quantity - 1
        }]
    }
    const changeProduct= array.filter(item=>item.product !== id)
    let updateCartQuantity;
    if(operation){
        updateCartQuantity = increaseCart.products[0]
    }
    else{
        updateCartQuantity = decreaseCart.products[0]
    }
    const changeProductArray =changeProduct.length > 0 ? [updateCartQuantity,...changeProduct]:[updateCartQuantity]
    const changeQuantityForServer = {
        products:changeProductArray
    }
    return async function (dispatch){
        try{
            const sendFetch = await fetch(`${baseUrl}cart`,{
                method:"PUT",
                headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify(changeQuantityForServer)
              })
            dispatch(changeCartQuantity(changeProductArray));
          dispatch(setErrorAction(null));
        }
        catch(error){
            dispatch(setErrorAction(error));
        }
        
    }
}

export function deleteFromCartProductWithServer(id,cartProduct,product,token){
  return async function(dispatch){
    try{
        dispatch(setLoadingAction(true));
        const sendFetch = await fetch(`${baseUrl}cart/${id}`,{
            method:"DELETE",
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          })
          dispatch(deleteFromCartProduct(id,cartProduct,product));
          dispatch(setLoadingAction(false));
          dispatch(setErrorAction(null));
       
    }
    catch(error){
        dispatch(setLoadingAction(false));
        dispatch(setErrorAction(error));
    }
  }
}

export function deleteAllCart(){
    const deleteProductArray = {
        cartProductsArray:[],
        products:[]
    }
    return {
        type:cartTypes.DELETE_CART,
        payload:deleteProductArray,
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