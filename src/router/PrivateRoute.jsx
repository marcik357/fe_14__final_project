import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { baseUrl } from '../utils/vars';
import { reqGet } from '../utils/requestBody';
import { fetchData } from '../utils';
import { useCallback, useEffect, useState } from 'react';

export default function PrivateRoute({ adminPanel }) {
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');
  const [isAdmin, setIsAdmin] = useState(false);

  const checkPermition = useCallback(async () => {
    if (token) {
      const user = await fetchData(`${baseUrl}customers/customer`, reqGet())
      setIsAdmin(user?.isAdmin)
    }
  }, [token])

  useEffect(() => {
    checkPermition()
  }, [checkPermition])

  if (!token) return <Navigate to="/authorization" />

  if (adminPanel && !isAdmin) return <Navigate to="/account" />

  return <Outlet />
}