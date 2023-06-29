import axios from "axios";
import { cartTypes } from "../types/cartTypes";
// const newCustomer = {
//     firstName: "Artem",
//     lastName: "Sytnikov",
//     login: "Artem",
//     email: "sitnikov.artem91@gmail.com",
//     password: "66666666",
//     telephone: "+380630000000",
//     gender: "male",
//     avatarUrl: "img/customers/023648.png",
//     isAdmin: true
//   }

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
        type:cartTypes.ADD_TO_CART,
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
            cartProductsAdd:data,
    }
  }
}

export function deleteFromCartProduct(id,cartProduct,product){
    const newCartProduct = cartProduct.filter(product=> product._id !== id)
    const newProduct = product.filter(product=> product.product !== id)
    const deleteProductArray = {
        cartProductsAdd:newCartProduct,
        products:newProduct
    }
    return {
        type:cartTypes.DELETE_CART,
        payload:deleteProductArray,
  }
}

////working with server and token
export function getCart(token){
    return function(dispatch){
         ////need to make fetch
        axios.defaults.headers.get['Authorization'] = `Bearer ${token} `;
        axios
        .get("https://plankton-app-6vr5h.ondigitalocean.app/api/cart")

    //   fetch("https://plankton-app-6vr5h.ondigitalocean.app/api/cart",{
    //     headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}
    //   })
      .then(cart => {
        let initialState;
        !cart.data ? initialState ={
            cartProductsAdd:[],
            products:[]
        } :
            initialState ={
              cartProductsAdd:cart.data.products.map(product => product.product),
              products:cart.data.products.map(item=> {
                  return { cartQuantity:item.cartQuantity,
                           product:item.product._id}
               })
          }
  
          dispatch(loadCart(initialState))
      }
      )
    }
  }
  
export function addNewProductToCart(id,token){
    return async function(dispatch){
 ////need to make fetch
axios.defaults.headers.put['Authorization'] = `Bearer ${token}`;
axios
  .put(`https://plankton-app-6vr5h.ondigitalocean.app/api/cart/${id}`)
  dispatch(addToCartQuantity(id))
    }
}

export function newCart(id,token){
    const newCart = {
        products:[{
            product:id,
            cartQuantity:1
        }]
    }
    
    return function(dispatch){
          ////need to make fetch
        axios.defaults.headers.post['Authorization'] = `Bearer ${token} `;
        axios
        .post("https://plankton-app-6vr5h.ondigitalocean.app/api/cart",newCart);
        dispatch(addToCartQuantity(id))
      
        // fetch("https://plankton-app-6vr5h.ondigitalocean.app/api/cart",{
        // method:"POST",
        // headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/text'},
        // body:newCart
        // } )
        
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
        axios.defaults.headers.put['Authorization'] = `Bearer ${token}`;
        axios
  .put("https://plankton-app-6vr5h.ondigitalocean.app/api/cart", changeQuantityForServer)
  dispatch(changeCartQuantity(changeProductArray))
    }
}

export function deleteFromCartProductWithServer(id,cartProduct,product,token){
  return async function(dispatch){
    axios.defaults.headers.delete['Authorization'] = `Bearer ${token}`;
    axios
    .delete(`https://plankton-app-6vr5h.ondigitalocean.app/api/cart/${id}`)

    dispatch(deleteFromCartProduct(id,cartProduct,product))
  }
}