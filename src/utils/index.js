import { addToCart } from "../redux/actions/cartActions";
import { setErrorAction } from "../redux/actions/errorActions";
import { setLoadingAction } from "../redux/actions/loadingActions";
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
  const coord = section.offsetTop === 0 ? window.scrollY - Math.abs(section.getBoundingClientRect().top) - 80 : section.offsetTop - 80
  window.scrollTo({ top: coord, behavor: 'smooth' });
};
// export const scrollTo = (start) => {
//   const section = document.querySelector(start);
//   section.scrollIntoView({behavior: 'smooth' });
// };

// скрол (тільки на Home Page) на початок сторінки
export const scrollUpPage = () => {
  if (location.pathname === '/') {
    window.scrollTo({ top: 0, behavor: 'smooth' });
  }
};

export const loadData = async (dispatch, callback) => {
  try {
    dispatch(setLoadingAction(true));
    await callback()
    dispatch(setLoadingAction(false))
  } catch (error) {
    dispatch(setLoadingAction(false))
    dispatch(setErrorAction(error.message));
  }
}

export function createMintOrder(id, wallet) {
  return {
    canceled: false,
    paymentInfo: "Mint",
    letterSubject: "Mint",
    name: "Mint",
    email: "tester.crypter@gmail.com",
    mobile: "+380674444444",
    card: "4242 4242 4242 4242",
    letterHtml: "<p>Mint</p>",
    customerId: id,
    wallet: wallet
  }
}