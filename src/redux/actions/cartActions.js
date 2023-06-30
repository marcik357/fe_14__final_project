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
    const getFetch = await fetch("https://plankton-app-6vr5h.ondigitalocean.app/api/cart",{
        headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}
      })
    const response = await getFetch.json();;
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
      }
}

export function addNewProductToCart(id,token){
    return async function(dispatch){
    const sendFetch = await fetch(`https://plankton-app-6vr5h.ondigitalocean.app/api/cart/${id}`,{
        method:"PUT",
        headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
      })
      dispatch(addToCartQuantity(id))
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
        const getFetch = await fetch("https://plankton-app-6vr5h.ondigitalocean.app/api/cart",{
            method:"POST",
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
            body:JSON.stringify(newCart),
          })
        dispatch(addToCartQuantity(id))
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
        const sendFetch = await fetch("https://plankton-app-6vr5h.ondigitalocean.app/api/cart",{
            method:"PUT",
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
            body:JSON.stringify(changeQuantityForServer)
          })
        dispatch(changeCartQuantity(changeProductArray))
    }
}

export function deleteFromCartProductWithServer(id,cartProduct,product,token){
  return async function(dispatch){
    const sendFetch = await fetch(`https://plankton-app-6vr5h.ondigitalocean.app/api/cart/${id}`,{
        method:"DELETE",
        headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
      })
    dispatch(deleteFromCartProduct(id,cartProduct,product))
  }
}