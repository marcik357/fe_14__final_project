import { setArtNumAction } from "../redux/actions/artNumActions";
import { setModalType } from "../redux/actions/modalActions";

const handleError = (response, code) => {
  if (response.status === code) {
    throw new Error(response.status)
  }
}

export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      handleError(response, 401);
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      handleError(response, 401);
      const error  = await response.json()
      throw new Error(error?.loginOrEmail || error?.password || error?.message || error?.email || error);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
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
      handleError(response, 401);
      const error = await response.json()
      throw new Error(error);
    }
    return await response.json();
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

// export async function login(url, data, dispatch) {
//   try {
//     const responseData = await postData(url, data);
//     const token = responseData.token;

//     localStorage.setItem('token', token);
//     dispatch(setTokenAction(token))
//     return responseData;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }


// export async function login(url, data, dispatch) {
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       const errorMessage = errorData?.loginOrEmail || errorData?.password;
//       throw new Error(errorMessage);
//     }

//     const responseData = await response.json();
//     const token = responseData.token;

//     localStorage.setItem('token', token);
//     dispatch(setTokenAction(token));

//     return responseData;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }
export async function putData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      handleError(response, 401);
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
