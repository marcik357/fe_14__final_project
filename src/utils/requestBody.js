export const headers = (token) => ({
  Authorization: `Bearer ${token || localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
})

export const reqGet = (token) => ({
  method: "GET",
  headers: headers(token),
})

export const reqDelete = (token) => ({
  method: "DELETE",
  headers: headers(token),
})

export const reqPost = (body, token) => ({
  method: "POST",
  headers: headers(token),
  body: body || '',
})

export const reqPut = (body, token) => ({
  method: "PUT",
  headers: headers(token),
  body: body || '',
})