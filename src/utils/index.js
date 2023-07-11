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
  dispatch(addToCart(id, token))
  dispatch(setModalType('buy'))
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