import { cartTypes } from "../types/cartTypes";
import { setErrorAction } from "./errorActions";
import { setLoadingAction } from "./loadingActions";
import { baseUrl } from '../../utils/vars'
import { fetchData, getDataFromLS } from "../../utils";

export function setCart(cart) {
  return {
    type: cartTypes.SET_CART,
    payload: cart || []
  }
}

export function createCartFromLS(token, cartFromLS) {
  return async function (dispatch) {
    try {
      const cart = await fetchData(`${baseUrl}cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cartFromLS })
      });
      dispatch(setCart(cart));
    } catch (error) {
      dispatch(setErrorAction(error));
    }
  }
}

async function addToCartServer(id, token, dispatch) {
  const newCart = await fetchData(`${baseUrl}cart/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
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
        ? addToCartServer(id, token, dispatch)
        : addToCartLocal(id, dispatch)
    }
    catch (error) {
      dispatch(setErrorAction(error));
    }
  }
}

async function changeQuantityServer(cart, token, newCart, dispatch) {
  await fetchData(`${baseUrl}cart`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ products: newCart })
  });
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
        ? changeQuantityServer(cart, token, newCart, dispatch)
        : changeQuantityLocal(newCart, dispatch)
    }
    catch (error) {
      dispatch(setErrorAction(error));
    }
  }
}

async function deleteFromCartServer(cart, id, token, newCart, dispatch) {
  await fetchData(`${baseUrl}cart/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
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


export function buyProduct(token) {
  return async function (dispatch) {
    try {
      dispatch(setLoadingAction(true));
      const sendFetch = await fetchData(`${baseUrl}cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      dispatch(setCart([]));
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(null));
    }
    catch (error) {
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(error));
    }
  }
}
async function cleanCartServer(token, dispatch) {
  await fetchData(`${baseUrl}cart`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },

  });
  dispatch(setCart([]))
}

function cleanCartLocal(dispatch) {
  dispatch(setCart({ products: [] }))
}

export function cleanCart (token) {
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