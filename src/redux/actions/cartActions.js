import { cartTypes } from "../types/cartTypes";
import { setErrorAction } from "./errorActions";
import { baseUrl } from '../../utils/vars'
import { fetchData, getDataFromLS } from "../../utils";
import { reqDelete, reqPost, reqPut } from "../../utils/requestBody";

export function setCart(cart) {
  return {
    type: cartTypes.SET_CART,
    payload: cart || { products: [] }
  }
}

export function createCartFromLS(cartFromLS) {
  return async function (dispatch) {
    try {
      const cart = await fetchData(`${baseUrl}cart`, reqPost(JSON.stringify({ products: cartFromLS })));
      dispatch(setCart(cart));
    } catch (error) {
      dispatch(setErrorAction(error));
    }
  }
}

async function addToCartServer(id, dispatch) {
  const newCart = await fetchData(`${baseUrl}cart/${id}`, reqPut());
  dispatch(setCart(newCart));
}

function addToCartLocal(id, dispatch) {
  localStorage.setItem('cart', JSON.stringify(
    [...getDataFromLS('cart'),
    {
      product: id,
      cartQuantity: 1,
    }]
  ));
  dispatch(setCart({ products: getDataFromLS('cart') }));
}

export function addToCart(id, token) {
  return async function (dispatch) {
    try {
      token
        ? addToCartServer(id, dispatch)
        : addToCartLocal(id, dispatch)
    }
    catch (error) {
      dispatch(setErrorAction(error));
    }
  }
}

async function changeQuantityServer(cart, newCart, dispatch) {
  await fetchData(`${baseUrl}cart`, reqPut(JSON.stringify({ products: newCart })));
  dispatch(setCart({ ...cart, products: newCart }))
}

function changeQuantityLocal(newCart, dispatch) {
  localStorage.setItem('cart', JSON.stringify(newCart));
  dispatch(setCart({ products: newCart }));
}

export function changeQuantity(cart, id, token, plus) {
  return async function (dispatch) {
    try {
      const newCart = cart?.products.map(({ product, cartQuantity }) => {
        if ((product._id || product) === id) return {
          product: product,
          cartQuantity: plus ? cartQuantity + 1 : cartQuantity - 1
        }
        return { product: product, cartQuantity: cartQuantity }
      });
      token
        ? changeQuantityServer(cart, newCart, dispatch)
        : changeQuantityLocal(newCart, dispatch)
    }
    catch (error) {
      dispatch(setErrorAction(error));
    }
  }
}

async function deleteFromCartServer(cart, id, token, newCart, dispatch) {
  await fetchData(`${baseUrl}cart/${id}`, reqDelete(token));
  dispatch(setCart({ ...cart, products: newCart }))
}

export function deleteFromCartLocal(newCart, dispatch) {
  localStorage.setItem('cart', JSON.stringify(newCart))
  dispatch(setCart({ products: newCart }))
}

export function deleteFromCart(cart, id, token) {
  return async function (dispatch) {
    try {
      const newCart = cart?.products.filter(({ product }) => (product._id || product) !== id);
      token
        ? deleteFromCartServer(cart, id, token, newCart, dispatch)
        : deleteFromCartLocal(newCart, dispatch)
    }
    catch (error) {
      dispatch(setErrorAction(error));
    }
  }
}

async function cleanCartServer(token, dispatch) {
  await fetchData(`${baseUrl}cart`, reqDelete(token));
  dispatch(setCart([]))
}

function cleanCartLocal(dispatch) {
  dispatch(setCart({ products: [] }))
}

export function cleanCart(token) {
  return async function (dispatch) {
    try {
      localStorage.setItem('cart', JSON.stringify([]))
      token
        ? cleanCartServer(token, dispatch)
        : cleanCartLocal(dispatch)
    }
    catch (error) {
      dispatch(setErrorAction(error));
    }
  }
}