import { setArtNumAction } from "../redux/actions/artNumActions";
import { setModalType } from "../redux/actions/modalActions";
import { setTokenAction } from "../redux/actions/tokenActions";

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

export async function postData(url, data) {
  try {
    console.log(data)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    } else {
      return response.json();
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function postDataAuthorized(url, data, token) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    } else {
      return response.json();
    }
  } catch (err) {
    throw new Error(err.message);
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

export async function login(url, data, dispatch) {
  try {
    const responseData = await postData(url, data);
    const token = responseData.token;

    localStorage.setItem('token', token);
    dispatch(setTokenAction(token))
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}