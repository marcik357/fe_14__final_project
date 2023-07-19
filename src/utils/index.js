import { addToCart } from "../redux/actions/cartActions";
import { setModalType } from "../redux/actions/modalActions";

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
      throw new Error(error?.loginOrEmail || error?.password || error?.message || error?.email || error);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error?.message);
  }
}

export function buyNowHandler(dispatch, id, token) {
  try {
    dispatch(addToCart(id, token))
    dispatch(setModalType('buy'))
  } catch (error) {
    dispatch(setErrorAction(error.message));
  }
}

export const getDataFromLS = (key) => {
  const lsData = localStorage.getItem(key);
  if (!lsData) return [];
  try {
    const value = JSON.parse(lsData);
    return value;
  } catch (e) {
    return [];
  }
};

export const getDataFromSS = (key) => {
  const lsData = sessionStorage.getItem(key);
  if (!lsData) return [];
  try {
    const value = JSON.parse(lsData);
    return value;
  } catch (e) {
    return [];
  }
};

export const isInCart = (cart, id) => cart?.products?.find((product) => product.product._id === id || product.product === id)

export const scrollTo = (start) => {
  const section = document.querySelector(start);
  section.scrollIntoView({behavior: 'smooth' });
};

// скрол (тільки на Home Page) на початок сторінки
export const scrollUpPage = () => {
  if (location.pathname === '/') {
    window.scrollTo({ top: 0, behavor: 'smooth' });
  }
};