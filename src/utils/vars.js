export const baseUrl = 'https://plankton-app-6vr5h.ondigitalocean.app/api/';

const token = localStorage.getItem('token') || '';

export const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
}

export const reqGet = {
  method: "GET",
  headers,
}

export const reqDelete = {
  method: "DELETE",
  headers,
}

export const reqPost = (body) => ({
  method: "POST",
  headers,
  body: body || '',
})

export const reqPut = (body) => ({
  method: "PUT",
  headers,
  body: body || '',
})