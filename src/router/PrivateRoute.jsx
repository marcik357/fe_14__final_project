import { useSelector } from 'react-redux';
import { baseUrl } from '../utils/vars';
import { reqGet } from '../utils/requestBody';
import { fetchData } from '../utils';
import { useCallback, useEffect, useState } from 'react';
import { Account, AdminProducts, Authorization } from '../pages';

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

  if (adminPanel && isAdmin) return <AdminProducts />
  
  if (token) return <Account />

  return <Authorization />
}