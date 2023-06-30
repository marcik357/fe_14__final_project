import { setArtNumAction } from "../redux/actions/artNumActions";
import { setModalType } from "../redux/actions/modalActions";

export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('HTTP request error');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function buyNowHandler(dispatch, artNum) {
  dispatch(setModalType('buy'))
  dispatch(setArtNumAction(artNum))
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