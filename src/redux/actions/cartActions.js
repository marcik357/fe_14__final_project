import axios from "axios";
import { cartTypes } from "../types/cartTypes";

export function addToCartQuantity(id){
    return {
        type:cartTypes.ADD_TO_CART,
        payload:{
            product:id,
            cartQuantity:1
    }
            
        }
}

export function increaseCartQuantity(deleteProductArray){

        return {
        type:cartTypes.INCREASE_CART,
        payload:deleteProductArray
           
        }
}

export function addToCartProduct(data){
    return {
        type:cartTypes.ADD_TO_CART_PRODUCT,
        payload:{
            cartProductsAdd:data
        }
 }
}

export function addNewProductToCart(id,token){
    return async function(dispatch){
axios.defaults.headers.put['Authorization'] = `Bearer ${token}`;
axios
  .put(`http://localhost:4000/api/cart/${id}`)
  dispatch(addToCartQuantity(id))
    }
}

export function newCart(id){
    const newCart = {
        products:[{
            product:id,
            cartQuantity:1
        }]
    }
    console.log(newCart);
    return async function(dispatch){
        fetch("https://plankton-app-6vr5h.ondigitalocean.app/api/cart",{
        method:"POST",
        headers:{'Content_type':'application/json'},
        body:newCart
        } )
        dispatch(addToCartQuantity(id))
 }
}

export function increaseQuantityInCart(id,quantity,array,token){
    const updateCart={
        products:[{
            product:id,
            cartQuantity:quantity + 1
        }]
    }
    const deleteProduct= array.filter(item=>item.product !== id)
    const updateCartQuantity = updateCart.products[0]

    const deleteProductArray =deleteProduct.length > 0 ? [updateCartQuantity,...deleteProduct]:[updateCartQuantity]
    const increaseQuantityForServer = {
        products:deleteProductArray
    }
    console.log(increaseQuantityForServer);
    return async function (dispatch){
        axios.defaults.headers.put['Authorization'] = `Bearer ${token}`;
        axios
  .put("http://localhost:4000/api/cart", increaseQuantityForServer)
  dispatch(increaseCartQuantity(deleteProductArray))
    }
}

export function loadCart(initialState){
    return {
        type:cartTypes.LOAD_CART,
        payload:initialState
}
}

export function getCart(){
  return function(dispatch){
    fetch("https://plankton-app-6vr5h.ondigitalocean.app/api/cart")
    .then(cart => {
        console.log
        const initialState ={
            cartProductsAdd:cart.data.products.map(product => product.product),
            products:cart.data.products.map(item=> {
                return { cartQuantity:item.cartQuantity,
                         product:item.product._id}
             })
        }

        // dispatch(loadCart(initialState))
    }
    )
  }
}